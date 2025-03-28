from flask import Flask, jsonify, request
import uuid
import random

#
#
# Iterim API Server
# **********************
# The final API will be written in Java Spring. This is a temporary
# AI just to return sample data while the frontend is being developed
#
#

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/orders')
def test_data():
    # type props = {
    #     orderTitle: string;
    #     orderItems: Map<string, number>;
    #     client: string;
    #     id: string;
    #     // no need for total price/total items, this can be computed from hashmap
    # };
    orders = [
        {"orderTitle": "Sample Order 1", "orderItems": [{"Carrot": 1.09, "Apple": 5.12}], "client": "Joe", "id": "21b0b6f3-f4d6-47e1-ab2b-28717fba84c9"},
        {"orderTitle": "Sample Order 2", "orderItems": [{"Coca Cola": 3.99, "Sprite": 2.99, "Chips": 15.99, "Forks & Knives": 19.97}], "client": "Griffin", "id": "fa2a200b-485a-44ae-8817-3e9838055c7b"},
        {"orderTitle":"Sample Order 3","orderItems":[{"Pepsi": 2.49,"Water Bottle": 1.99,"Cookies": 5.49,"Napkins": 3.99}], "client": "Roberto", "id":"d4c9a7f3-9a4a-4a3e-8b61-e9c024b7ae23"},
        {"orderTitle":"Sample Order 4","orderItems":[{"Iced Tea": 2.79,"Granola Bar": 1.49,"Sandwich": 7.99,"Paper Plates": 4.5}], "client": "Alexandra", "id":"b32c78d6-eec1-4134-b302-7b78c6a841df"},
        {"orderTitle":"Sample Order 5","orderItems":[{"Orange Juice": 3.49,"Muffin": 2.25,"Salad": 9.75,"Plastic Cups": 2.89}], "client": "Robin", "id":"8f74329e-531f-49e2-bd93-8d9c1cbbe9f2"}
    ]
    return jsonify(orders=orders)

# fake API login route
@app.route("/login", methods=["POST"])
def login():
    api = request.get_json()
    if "username" in api and "password" in api:
        if "admin@trentwil.es" == api["username"] and "password" == api["password"]:
            return jsonify(login=True, token=uuid.uuid4(), error_msg="")
        else:
            return jsonify(login=False, error_msg="invalid username/password"), 403
    else:
        return jsonify(login=False, error_msg="Missing username/password"), 400

# fake sales data for a given order fufiller
@app.route("/sales")
def sales():
    sales = []
    sales.append({"month": "January", "value": random.randint(100,1000)})
    sales.append({"month": "February", "value": random.randint(100,1000)})
    sales.append({"month": "March", "value": random.randint(100,1000)})
    sales.append({"month": "April", "value": random.randint(100,1000)})
    sales.append({"month": "May", "value": random.randint(100,1000)})
    sales.append({"month": "June", "value": random.randint(100,1000)})
    sales.append({"month": "July", "value": random.randint(100,1000)})
    sales.append({"month": "August", "value": random.randint(100,1000)})
    sales.append({"month": "September", "value": random.randint(100,1000)})
    sales.append({"month": "October", "value": random.randint(100,1000)})
    sales.append({"month": "November", "value": random.randint(100,1000)})
    sales.append({"month": "December", "value": random.randint(100,1000)})
    return jsonify(sales)

if __name__ == '__main__':
    app.run(debug=True)
