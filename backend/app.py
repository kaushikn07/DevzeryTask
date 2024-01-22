from flask import Flask, request, jsonify
import sqlite3

# db connection
conn = sqlite3.connect('devzery.db')

cursor = conn.cursor()

query =  "CREATE TABLE IF NOT EXISTS REGISTRATION (username TEXT, email TEXT primary key, password TEXT);"
cursor.execute(query)

app = Flask(__name__)

#login page
@app.route('/register', method = ['POST'])
def login():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    query = 'SELECT * FROM REGISTRATION WHERE email = {email};'
    cursor.execute(query)
    if (query == None):
        query = 'INSERT INTO REGISTRATION (username, email, password) VALUES ({username}, {email}, {password});'
        return{"status ": ['success']}
    else:
        return{"status" : ["already registered"]}


if __name__ =="__main__" :
    app.run(debug=True)

