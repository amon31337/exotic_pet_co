import random
import urllib.request
import sys
import logging
import pymysql
import json
import os
import datetime
import boto3

user_name = os.environ['USER_NAME']
password = os.environ['PASSWORD']
rds_host = os.environ['RDS_HOST']
db_name = os.environ['DB_NAME']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_host, port=3306, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Could not connect to database.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection established")

def lambda_handler(event, context):
    api = 'https://kn3p63vwv2.execute-api.us-east-2.amazonaws.com/dev/inventory-management/items'

    body = json.loads(event['body'])
    #body = event

    #shippingWeights will hold info to later be send to the shipping processing service
    shippingWeights = []
    productList = body['productList']

    #check that business has required inventory of all products
    for i in range(len(productList)):
        try:
            product = productList[i]
            #persist the shipping data
            shippingWeights.append({
                'id': product['id'],
                'weight': product['quantity'],
                'quantity': product['quantity']
            })

            req = urllib.request.Request(api+ "/" + str(product['id']), method='GET')
            with urllib.request.urlopen(req) as response:
                raw = response.read().decode('utf-8')
                
            data = json.loads(raw)
            if isinstance(data, dict) and 'body' in data and isinstance(data['body'], str):
                data = json.loads(data['body'])
                
            if not isinstance(data, dict) or 'stock' not in data:
                msg = data.get('error', f"Inventory item not found or invalid for id '{product['id']}'") if isinstance(data, dict) else "Invalid inventory response"
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': msg, 'itemId': product['id']})
                }

            if int(data['stock']) < int(product.get('quantity', 0)):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': f"Not enough stock for {product.get('name', product['id'])}",
                        'available': int(data['stock'])
                    })
                }
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e), 'itemId': product.get('id')})
            }

    paymentInfo = body['paymentInfo']
    shippingInfo = body['shippingInfo']
    with conn.cursor() as cursor:
        #send payment info for processing
        payment_url = "https://kn3p63vwv2.execute-api.us-east-2.amazonaws.com/dev/payment"
        try:
            logging.info("attempting payment processing")
            response = urllib.request.urlopen(urllib.request.Request(payment_url, method='POST', data=json.dumps(paymentInfo).encode('utf-8')))
            token = json.loads(response.read().decode('utf-8'))['confirmationToken']
            logging.info("token: " + str(token))
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)})
            }
        logging.info("payment processed")

        #send shipping info for processing
        eventbridge = boto3.client('events')
        detail = {
            'shippingInfo': shippingInfo, 
            'businessID': 1234567890, 
            'shippingWeights': shippingWeights
        }
        eventbridge.put_events(
            Entries=[
                {
                    'Source': 'orderProcessing',
                    'DetailType': 'shipping-info',
                    'Detail': json.dumps(detail)
                }
            ]
        )

        #insert order details and line items into the database
        order_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        #(SELECT ID FROM SHIPPING_INFO WHERE ADDRESS1 = '{shippingInfo['addressLine1']}' AND ADDRESS2 = '{shippingInfo['addressLine2']}' AND CITY = '{shippingInfo['city']}' AND STATE = '{shippingInfo['state']}' AND POSTAL_CODE = '{shippingInfo['zip']}' LIMIT 1)
        cursor.execute(f"insert into CUSTOMER_ORDER (CUSTOMER_NAME, PAYMENT_INFO_TOKEN, ORDER_TIME) VALUES ('{paymentInfo['cardHolderName']}', '{token}', '{order_time}')")
        logging.info("Customer order inserted")

        for product in productList:
            cursor.execute(f"insert into CUSTOMER_ORDER_LINE_ITEM (ITEM_ID, ITEM_NAME, QUANTITY, CUSTOMER_ORDER_ID_FK) VALUES ('{product['id']}', '{product['name']}', '{product['quantity']}', (SELECT ID FROM CUSTOMER_ORDER WHERE CUSTOMER_NAME = '{paymentInfo['cardHolderName']}' AND ORDER_TIME = '{order_time}' AND PAYMENT_INFO_TOKEN = '{token}'))")
        logging.info("Customer order line item inserted")

        conn.commit()
        


    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'confirmationCode': random.randint(100000, 999999)
        })
    }
