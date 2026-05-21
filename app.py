from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

# ==========================================
# VEZLO MART - SECURE PYTHON API BACKEND
# ==========================================

load_dotenv() # Loads from .env file

app = Flask(__name__)

# YOUR SECRET SUPABASE CREDENTIALS (HIDDEN FROM FRONTEND)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY")

def supabase_request(endpoint, method='GET', data=None, user_token=None):
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    if user_token:
        headers["Authorization"] = f"Bearer {user_token}"
    else:
        headers["Authorization"] = f"Bearer {SUPABASE_KEY}"

    if method == 'GET':
        res = requests.get(url, headers=headers)
    elif method == 'POST':
        res = requests.post(url, headers=headers, json=data)
    
    return res.json()

@app.route('/api/getProducts', methods=['GET'])
def get_products():
    data = supabase_request('products?select=*')
    return jsonify(data)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    auth_url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    }
    payload = {"email": email, "password": password}
    
    res = requests.post(auth_url, headers=headers, json=payload)
    return jsonify(res.json())

if __name__ == '__main__':
    app.run(debug=True, port=8000)
