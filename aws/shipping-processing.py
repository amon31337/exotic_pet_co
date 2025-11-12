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

    body = json.loads(event['body'])
    detail = body['detail']
    shippingInfo = detail['shippingInfo']
    shippingWeights = detail['shippingWeights']

    with conn.cursor() as cursor:
        cursor.execute(f"insert into SHIPPING_INFO (ADDRESS1, ADDRESS2, CITY, STATE, POSTAL_CODE) VALUES ('{shippingInfo['addressLine1']}', '{shippingInfo['addressLine2']}', '{shippingInfo['city']}', '{shippingInfo['state']}', '{shippingInfo['zip']}')")
        logging.info("Shipping info inserted")

        for weight in shippingWeights:
            cursor.execute(f"insert into PACKET (ITEM_ID, SHIPPING_INFO_ID, WEIGHT) VALUES ('{weight['id']}', (SELECT ID FROM SHIPPING_INFO WHERE ADDRESS1 = '{shippingInfo['addressLine1']}' AND ADDRESS2 = '{shippingInfo['addressLine2']}' AND CITY = '{shippingInfo['city']}' AND STATE = '{shippingInfo['state']}' AND POSTAL_CODE = '{shippingInfo['zip']}' LIMIT 1), '{weight['weight']}')")

        conn.commit()
        
    
    return {
        'statusCode': 200,
        "headers": {"Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*"}
    }
