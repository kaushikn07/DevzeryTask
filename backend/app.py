from flask import Flask, request, jsonify
from flask_cors import CORS

import sqlite3

# db connection
conn = sqlite3.connect('devzery.db')
cursor = conn.cursor()

query = "CREATE TABLE IF NOT EXISTS REGISTRATION (username TEXT, email TEXT primary key, password TEXT);"
cursor.execute(query)

app = Flask(__name__)
CORS(app)
# register page
@app.route('/', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    # Check if the email is already registered
    select_query = 'SELECT * FROM REGISTRATION WHERE email = ?;'
    cursor.execute(select_query, (email,))
    existing_user = cursor.fetchone()

    if existing_user is None:
        # User is not registered, so insert into the database
        insert_query = 'INSERT INTO REGISTRATION (username, email, password) VALUES (?, ?, ?);'
        cursor.execute(insert_query, (username, email, password))
        conn.commit()  # Commit changes to the database
        return {"status": 'success'}
    else:
        # User is already registered
        return {"status": 'already registered'}

if __name__ == "__main__":
    app.run(debug=True)