import json

def lambda_handler(event, context):
    inventory = [
        {"id": "axolotl", "name": "Axolotl", "price": 119.99, "stock": 4, "img": "https://picsum.photos/seed/axo/400/300"},
        {"id": "capybara", "name": "Capybara", "price": 249.00, "stock": 4, "img": "https://picsum.photos/seed/capy/400/300"},
        {"id": "fennec", "name": "Fennec Fox", "price": 329.00, "stock": 4, "img": "https://picsum.photos/seed/fenn/400/300"},
        {"id": "beetle", "name": "Hercules Beetle", "price": 39.99, "stock": 4, "img": "https://picsum.photos/seed/bug/400/300"},
        {"id": "snake", "name": "Ball Python", "price": 179.00, "stock": 4, "img": "https://picsum.photos/seed/snek/400/300"}
    ]

    
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
