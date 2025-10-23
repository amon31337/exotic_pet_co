This folder contains all source code for the AWS services used in this project.

Order Processing makes a connection to inventory-management so make sure to update the 
url when deploying in everyone's individual environment.

Structure of json payload body expected in post to order-processing:
{
    "productList": [
        {
            "id": "axolotl", 
            "name": "Axolotl", 
            "price": "119.99", 
            "quantity": "1"
        }, 
        {
            "id": "fennec", 
            "name": "Fennec Fox", 
            "price": "329", 
            "quantity": "1"
        }
    ], 
    "paymentInfo": {
        "cardNumber": "1234123412341234",
        "expirationDate": "04/31",
        "cvvCode": "145",
        "cardHolderName": "Jackson Boes", 
        "zipCode": "43210"
    }, 
    "shippingInfo": {
        "firstName": "Jackson",
        "lastName": "Boes",
        "addressLine1": "231 Woodcreek Drive",
        "addressLine2": "", 
        "city": "Columbus",
        "state": "Ohio",
        "zip": "43210"
    }
}