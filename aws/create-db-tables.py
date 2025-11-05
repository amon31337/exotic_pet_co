import sys
import logging
import pymysql
import json
import os

user_name = os.environ['USER_NAME']
password = os.environ['PASSWORD']
rds_proxy_host = os.environ['RDS_PROXY_HOST']
db_name = os.environ['DB_NAME']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_proxy_host, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Could not connect to database.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection established")

def lambda_handler(event, context):
    """
    This function creates new database tables
    """
    inventory = [
        {"id": "axolotl", "name": "Axolotl", "price": 119.99, "stock": 4, "img": "https://picsum.photos/seed/axo/400/300"},
        {"id": "capybara", "name": "Capybara", "price": 249.00, "stock": 4, "img": "https://picsum.photos/seed/capy/400/300"},
        {"id": "fennec", "name": "Fennec Fox", "price": 329.00, "stock": 4, "img": "https://picsum.photos/seed/fenn/400/300"},
        {"id": "beetle", "name": "Hercules Beetle", "price": 39.99, "stock": 4, "img": "https://picsum.photos/seed/bug/400/300"},
        {"id": "snake", "name": "Ball Python", "price": 179.00, "stock": 4, "img": "https://picsum.photos/seed/snek/400/300"}
    ]
    item_sql = "CREATE TABLE IF NOT EXISTS ITEM (ID int auto_increment primary key, ITEM_ID varchar(255), NAME varchar(255), AVAILABLE_QUANTITY int, UNIT_PRICE double, IMAGE_URL varchar(255))"
    order_sql = "create table if not exists CUSTOMER_ORDER (ID int auto_increment primary key, CUSTOMER_NAME varchar(255), SHIPPING_INFO_ID_FK int, PAYMENT_INFO_ID_FK int, STATUS varchar(255) default 'New')"
    line_item_sql = "create table if not exists CUSTOMER_ORDER_LINE_ITEM (ID int auto_increment primary key, ITEM_NUMBER int, ITEM_NAME varchar(255), QUANTITY int, CUSTOMER_ORDER_ID_FK int)"
    payment_sql = "create table if not exists PAYMENT_INFO (ID int auto_increment primary key, HOLDER_NAME varchar(255), CARD_NUM varchar(255), EXP_DATE varchar(255), CVV varchar(3))"
    shipping_sql = "create table if not exists SHIPPING_INFO (ID int auto_increment primary key, ADDRESS1 varchar(255), ADDRESS2 varchar(255), CITY varchar(255), STATE varchar(255), COUNTRY varchar(255), POSTAL_CODE varchar(255), EMAIL varchar(255))"

    with conn.cursor() as cur:
        # cur.execute("drop table if exists ITEM")
        # logging.info("Successfully dropped ITEM")
        # cur.execute("drop table if exists CUSTOMER_ORDER")
        # logging.info("Successfully dropped CUSTOMER_ORDER")
        # cur.execute("drop table if exists CUSTOMER_ORDER_LINE_ITEM")
        # logging.info("Successfully dropped CUSTOMER_ORDER_LINE_ITEM")
        # cur.execute("drop table if exists PAYMENT_INFO")
        # logging.info("Successfully dropped PAYMENT_INFO")
        # cur.execute("drop table if exists SHIPPING_INFO")
        # logging.info("Successfully dropped SHIPPING_INFO")


        cur.execute(item_sql)
        cur.execute(order_sql)
        cur.execute(line_item_sql)
        cur.execute(payment_sql)
        cur.execute(shipping_sql)
        conn.commit()
        cur.execute("show tables")
        for result in cur:
            logger.info(result)
        
        for item in inventory:
            cur.execute(f"insert into ITEM (ITEM_ID, NAME, AVAILABLE_QUANTITY, UNIT_PRICE, IMAGE_URL) values ('{item['id']}', '{item['name']}', '{item['stock']}', '{item['price']}', '{item['img']}')")
        conn.commit()
        cur.execute("select * from ITEM")
        for result in cur:
            logger.info(result)

    conn.commit()

    return "Successfully created tables"
    