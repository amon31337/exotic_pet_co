import json
import random
import urllib.request

def lambda_handler(event, context):
    api = 'https://etw6zgg8c6.execute-api.us-east-2.amazonaws.com/dev/inventory-management/inventory/items'

    body = json.loads(event['body'])
    productList = body['productList']
    paymentInfo = body['paymentInfo']
    shippingInfo = body['shippingInfo']
    
    for product in productList:
        try:
            url = f"{api}/{product['id']}"
            req = urllib.request.Request(url, method='GET')
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

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'confirmationCode': random.randint(100000, 999999)
        })
    }
