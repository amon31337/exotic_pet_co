import sys
import pymysql
import logging
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
    inventory = []
    with conn.cursor() as cur:
        cur.execute("select * from ITEM")
        for row in cur:
            inventory.append({
                "id": row[1],
                "name": row[2],
                "price": row[4],
                "stock": row[3],
                "img": row[5]
            })
    


    
    # get path and query parameters
    path_params = event.get("pathParameters") or {}
    query_params = event.get("queryStringParameters") or {}

    # query logic
    if "id" in path_params:
        item = next((item for item in inventory if item["id"] == path_params["id"]), None)
        result = item if item else {"error": "not found"}
        status = 200 if item else 404
    elif "name" in query_params:
        key = query_params["name"].lower()
        result = [item for item in inventory if key in item["name"].lower()]
        status = 200
    else:
        result = inventory
        status = 200

    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "*"},
        "body": json.dumps(result)
    }
