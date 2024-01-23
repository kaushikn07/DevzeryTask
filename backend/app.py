from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
# Function to get a new database connection
def get_db():
    return sqlite3.connect('devzery.db')

def create_table():
    with get_db() as conn:
        cursor = conn.cursor()
        query = "CREATE TABLE IF NOT EXISTS REGISTRATION (username text, email text primary key, password text);"
        cursor.execute(query)
        conn.commit()

# Check if the table exists; if not, create it
with get_db() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='REGISTRATION';")
    table_exists = cursor.fetchone()

if not table_exists:
    create_table()

# Create the table before starting the application
create_table()
# Register page
@app.route('/', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        # Fetch all data from the database
        with get_db() as conn:
            select_all_query = 'SELECT * FROM REGISTRATION;'
            cursor.execute(select_all_query)
            all_data = cursor.fetchall()
        return jsonify(all_data)

    elif request.method == 'POST':
        # Handle your registration logic for POST requests
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        # Check if the email is already registered
        with get_db() as conn:
            cursor = conn.cursor()
            select_query = 'SELECT * FROM REGISTRATION WHERE email = ?;'
            cursor.execute(select_query, (email,))
            existing_user = cursor.fetchone()

        if existing_user is None:
            # User is not registered, so insert into the database
            with get_db() as conn:
                cursor = conn.cursor()
                insert_query = 'INSERT INTO REGISTRATION (username, email, password) VALUES (?, ?, ?);'
                cursor.execute(insert_query, (username, email, password))
                conn.commit()  # Commit changes to the database
            return {"status": 'success'}
        else:
            # User is already registered
            return {"status": 'already registered'}
        
@app.route('/display', methods=['GET'])
def get_profiles():
    with get_db() as conn:
        cursor = conn.cursor()
        select_all_query = 'SELECT username FROM REGISTRATION;'
        cursor.execute(select_all_query)
        profiles = cursor.fetchall()

        # Convert the result to a list of dictionaries
        profiles_list = [{'username': profile[0]} for profile in profiles]

    return jsonify({'profiles': profiles_list})

@app.route('/dashboard', methods=['POST'])
def update_profile():
    data = request.get_json()
    old_email = data.get('old_email')
    new_username = data.get('new_username')
    new_email = data.get('new_email')

    if not new_username and not new_email:
        return jsonify({'status': 'error', 'message': 'No data provided for update'}), 400

    # Assuming the user is logged in and you have their current email in the session or token
    with get_db() as conn:
        cursor = conn.cursor()
    # Update the username if provided
        if new_username:
            update_username_query = 'UPDATE REGISTRATION SET username = ? WHERE email = ?;'
            cursor.execute(update_username_query, (new_username, old_email))

        # Update the email if provided
        if new_email:
            update_email_query = 'UPDATE REGISTRATION SET email = ? WHERE email = ?;'
            cursor.execute(update_email_query, (new_email, old_email))

        conn.commit()
    return jsonify({'status': 'success', 'message': 'Profile updated successfully'})


if __name__ == "__main__":
    app.run(debug=True)
