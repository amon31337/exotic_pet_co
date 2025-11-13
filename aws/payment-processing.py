import random
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

    paymentInfo = json.loads(event['body'])

    if paymentInfo is None:
        return {
            'statusCode': 400,
            "headers": {"Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"},
            'body': json.dumps({
                'error': 'paymentInfo is missing'
            })
        }

    with conn.cursor() as cursor:
        token = random.randint(100000, 999999)

        cursor.execute(f"insert into PAYMENT_INFO (CONFIRMATION_TOKEN, HOLDER_NAME, CARD_NUM, EXP_DATE, CVV) VALUES ('{token}', '{paymentInfo['cardHolderName']}', '{paymentInfo['cardNumber']}', '{paymentInfo['expirationDate']}', '{paymentInfo['cvvCode']}')")
        logging.info("Payment info inserted")

        conn.commit()
        
    
    return {
        'statusCode': 200,
        "headers": {"Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*"},
        'body': json.dumps({
            'confirmationToken': token
        })
    }
