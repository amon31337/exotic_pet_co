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

    body = json.loads(event['body'])
    detail = body['detail']

    with conn.cursor() as cursor:
        cursor.execute(f"UPDATE CUSTOMER_ORDER SET SHIPPING_INFO_TOKEN = '{detail['confirmationToken']}' WHERE ID = '{detail['orderID']}'")
        logging.info("Shipping token inserted")

        conn.commit()
        
    
    return {
        'statusCode': 200,
        "headers": {"Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*"}
    }
