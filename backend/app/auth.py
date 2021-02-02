import secrets
import pymysql
import redis
import hashlib
import os
N_BYTES = 32
DEV_MODE =  os.environ.get("DEV_MODE", True)


if DEV_MODE == True:
    from .config import *

else:
    from config import *





if DEV_MODE == True:
    USER_DB_CONFIG = USER_DB_DEV_CONFIG 
else:
     USER_DB_CONFIG = USER_DB_PROD_CONFIG 

def check_for_no_sql_injection(string: str) -> False:
    prohibited_symbols = [")", "(", ";", "DROP"]
    for symbol in prohibited_symbols:
        if symbol in string:
            return False
    return True

def generate_access_token():
    return secrets.token_hex(N_BYTES)

def check_user(user_name: str, access_token: str, db) -> bool:
    # request from db (redis) a token
    access_token_true = request_token(user_name, db)
    #print(type(access_token_true))
    # compare  two tokens securely
    if secrets.compare_digest(access_token, access_token_true) == True:
        # if tokens match, returhs true
        return True
    # if tokens do not match, returns false
    return False


def check_user_access_token_exists(user_name:str,db) -> bool:
    try:
        access_token = db.get(user_name)
        if access_token == None:
            return False
        else:
            return True
    except:
        return False


def create_token(user_name, db) -> str:
    new_token = generate_access_token()
    db.set(user_name, new_token)
    return new_token


def request_token(user_name: str, db) -> str:
    token = db.get(user_name)
    if token == None:
        return "NULL"
    return token

def deauthorise_user(user_name:str,access_token:str, db) -> str:
    if check_user_access_token_exists(user_name, db) == True and check_user(user_name, access_token, db) == True: 
        try: 

            db.delete(user_name)
            return "SUCCESS"
        except:
            return "ERR"
    else:
        return "NOT_EXISTS"

def calculate_hash(string):
    return hashlib.sha256(string.encode()).hexdigest()



def create_new_user(user_name:str, password:str, email: str) -> str:
    connection = pymysql.connect(**USER_DB_CONFIG)
    hashed_password = calculate_hash(password)
    out = "ERROR"
    if user_in_database(user_name) == True:
        return "EXISTS"
    try:
        with connection.cursor() as cursor:
            
            query = f"INSERT INTO MAIN (userName, userPassword, email) VALUES('{user_name}', '{hashed_password}', '{email}')"
            cursor.execute(query)
        connection.commit()
        
        out = "SUCCESS"


    except:

        print("An error in call to 'user_in_database' occupied")

    finally:
        connection.close()
    return out
        

   
def authorise_user(user_name:str, user_pass:str) -> str:
    if user_with_password_in_database(user_name, user_pass) == True:
        return "SUCCESS"
    else:
        return "ERROR"
    

def verify_password(user_name: str, password: str) -> bool:
    connection = pymysql.connect(**USER_DB_CONFIG)
    hashed_password = calculate_hash(password)
    try:
        with connection.cursor() as cursor:
        # Create a new record
            query = f"SELECT 1 FROM MAIN WHERE userName = {user_name} AND userPassword={hashed_password}"
            print(query)
            cursor.execute(query)
            result = cursor.fetchone()
        connection.close()
        print("QUERY RESULT IN verify_password, ",result)
        print("QUERY RESULT LENGTH IN verify_password, ", len(result))

        return len(result) > 0

    except:
        print("An error in call to 'user_in_database' occupied")
        connection.close()
        return False


def user_in_database(user_name:str) -> bool:
    out = False
    connection = pymysql.connect(**USER_DB_CONFIG)
    try:
        with connection.cursor() as cursor:
        # Create a new record
            query = f"SELECT 1 FROM MAIN WHERE userName = '{user_name}'"
            cursor.execute(query)
            result = cursor.fetchone()
        if result != None:
        
            out = True

    except:
        print("An error in call to 'user_in_database' occupied")
        return False
    finally:
        connection.close()

    return out

def userId_by_userName(userName:str) -> int:
    connection = pymysql.connect(**USER_DB_CONFIG)
    out = -1
    try:
        with connection.cursor() as cursor:
        # Create a new record
            query = f"SELECT * FROM MAIN WHERE userName = '{userName}'"
            cursor.execute(query)
            result = cursor.fetchone()
            out = result[0]
            print(result)
        

    except:
        print("An error in call to 'userId_by_userName' occupied")
    finally:
        connection.close()

    return out
    

def user_with_password_in_database(user_name:str, password: str) -> bool:
    out = False
    connection = pymysql.connect(**USER_DB_CONFIG)
    hashedPassword = calculate_hash(password)
    try:
        with connection.cursor() as cursor:
        # Create a new record
            query = f"SELECT * FROM MAIN WHERE userName = '{user_name}' AND userPassword='{hashedPassword}'"
            cursor.execute(query)
            result = cursor.fetchone()
        if result != None:
        
            out = True

    except:
        print("An error in call to 'user_with_password_in_database' occupied")

        return False
    finally:
        connection.close()

    return out
    
def check_if_user_admin(userName:str) -> bool:
    if not user_in_database(userName):
        return False
    connection = pymysql.connect(**USER_DB_CONFIG)
    result = "FUCK"
    try:
        with connection.cursor() as cursor:
            print("CURSOR CREATED")
        # Create a new record
            query = f"SELECT verified FROM MAIN WHERE userName='{userName}'"
            print(query)
            cursor.execute(query)
            result = cursor.fetchone()
            print("RESULT", result)
        connection.close()
        verified = result[-1]
        
        print("QUERY RESULT IN check_if_user_admin, ",result[-1])
        print("QUERY RESULT LENGTH IN verify_password, ", len(result))

        return verified == 1

    except:
        print("An error in call to 'check_if_user_admin' occupied")
        print("RESULT", result)
        connection.close()
        return False

if __name__ == "__main__":
    #database = redis.Redis(**REDIS_CONFIG)
    #new_user_1 = "alex"
    #new_user_2 = "max"
    #token_1 = create_token(new_user_1, database)
    #token_2 = create_token(new_user_2, database)
    #print(os.environ.get("USER_DB_PASS"))
    #database.delete(new_user_2)
    #print(check_user_access_token_exists(new_user_2, database) )
    print(userId_by_userName("alex"))




