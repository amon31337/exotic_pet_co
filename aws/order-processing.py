import random
import urllib.request
import sys
import logging
import pymysql
import json
import os

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

    #body = json.loads(event['body'])
    body = event

    productList = body['productList']

    for i in range(len(productList)):
        try:
            product = productList[i]
            req = urllib.request.Request(api+ "/" + str(product['id']), method='GET')
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))

            stock = data['stock']
            if stock < int(product['quantity']):
                return {
                    'statusCode': 400,
                    'body': json.dumps('Not enough stock for ' + product['name'])
                }
        except Exception as e:
            return {
                'statusCode': 400,
                'body': json.dumps(str({e}))
            }

    paymentInfo = body['paymentInfo']
    shippingInfo = body['shippingInfo']
    with conn.cursor() as cursor:
        cursor.execute(f"insert into PAYMENT_INFO (HOLDER_NAME, CARD_NUM, EXP_DATE, CVV) VALUES ('{paymentInfo['cardHolderName']}', '{paymentInfo['cardNumber']}', '{paymentInfo['expirationDate']}', '{paymentInfo['cvvCode']}')")
        logging.info("Payment info inserted")

        cursor.execute(f"insert into SHIPPING_INFO (ADDRESS1, ADDRESS2, CITY, STATE, POSTAL_CODE) VALUES ('{shippingInfo['addressLine1']}', '{shippingInfo['addressLine2']}', '{shippingInfo['city']}', '{shippingInfo['state']}', '{shippingInfo['zip']}')")
        logging.info("Shipping info inserted")

        cursor.execute(f"insert into CUSTOMER_ORDER (CUSTOMER_NAME, SHIPPING_INFO_ID_FK, PAYMENT_INFO_ID_FK) VALUES ('{paymentInfo['cardHolderName']}', (SELECT ID FROM SHIPPING_INFO WHERE ADDRESS1 = '{shippingInfo['addressLine1']}' AND ADDRESS2 = '{shippingInfo['addressLine2']}' AND CITY = '{shippingInfo['city']}' AND STATE = '{shippingInfo['state']}' AND POSTAL_CODE = '{shippingInfo['zip']}'), (SELECT ID FROM PAYMENT_INFO WHERE HOLDER_NAME = '{paymentInfo['cardHolderName']}' AND CARD_NUM = '{paymentInfo['cardNumber']}' AND EXP_DATE = '{paymentInfo['expirationDate']}' AND CVV = '{paymentInfo['cvvCode']}'))")
        logging.info("Customer order inserted")

        for product in productList:
            cursor.execute(f"insert into CUSTOMER_ORDER_LINE_ITEM (ITEM_NUMBER, ITEM_NAME, QUANTITY, CUSTOMER_ORDER_ID_FK) VALUES ('{product['id']}', '{product['name']}', '{product['quantity']}', (SELECT ID FROM CUSTOMER_ORDER WHERE CUSTOMER_NAME = '{paymentInfo['cardHolderName']}' AND (SELECT ID FROM SHIPPING_INFO WHERE ADDRESS1 = '{shippingInfo['addressLine1']}' AND ADDRESS2 = '{shippingInfo['addressLine2']}' AND CITY = '{shippingInfo['city']}' AND STATE = '{shippingInfo['state']}' AND POSTAL_CODE = '{shippingInfo['zip']}') AND (SELECT ID FROM PAYMENT_INFO WHERE HOLDER_NAME = '{paymentInfo['cardHolderName']}' AND CARD_NUM = '{paymentInfo['cardNumber']}' AND EXP_DATE = '{paymentInfo['expirationDate']}' AND CVV = '{paymentInfo['cvvCode']}')))")
        logging.info("Customer order line item inserted")

        conn.commit()
        


    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'confirmationCode': random.randint(100000, 999999)
        })
    }
