import json
import random
import urllib.request

def lambda_handler(event, context):
    api = 'https://kn3p63vwv2.execute-api.us-east-2.amazonaws.com/dev/inventory-management/items'

    body = json.loads(event['body'])
    productList = body['productList']
    paymentInfo = body['paymentInfo']
    shippingInfo = body['shippingInfo']
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
    return {
        'statusCode': 200,
        'body': json.dumps({
            'confirmationCode': random.randint(100000, 999999)
        })
    }
