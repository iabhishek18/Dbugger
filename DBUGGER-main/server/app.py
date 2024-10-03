import os
from flask import Flask, request
from flask_cors import CORS
import json
from pymongo import MongoClient
import hashlib
from flask import jsonify
from datetime import datetime
import pytz

CONNECTION_STRING = "mongodb+srv://xorus:2510Pksh%3F%401901@cluster0.uhbf7nx.mongodb.net/?retryWrites=true"

app = Flask(__name__)
CORS(app)

@app.route('/signup', methods = ['POST'])
def signup():
    data = request.get_json()
    print(data)

    UTC = pytz.utc
    timeZ_Kl = pytz.timezone('Asia/Kolkata')
    dt_Kl = datetime.now(timeZ_Kl)
    utc_Kl = dt_Kl.astimezone(UTC)
    dt = dt_Kl.strftime('%d-%m-%Y %H:%M:%S')

    upload = {
        "username": data['username'],
        "fullname": data['fname'] + " " + data['lname'],
        'email': data['mail'],
        'password': hashlib.md5(data['password'].encode()).hexdigest(),
        'created': str(dt)
        }

    # try:
    client = MongoClient(CONNECTION_STRING)
    db = client['DBUGGER']
    col = db["users"]

    flag = 0
    for i in col.find():
        if i['username'] == data['username'] or i['email'] == data['mail']:
            flag = 1
            return "1"

    if flag == 0:
        col.insert_one(upload)
        return "0"

    # except:
    #     return "-1"
    

@app.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    print(data)

    try:
        client = MongoClient(CONNECTION_STRING)
        db = client['DBUGGER']
        col = db["users"]

        hashed = hashlib.md5(data['password'].encode()).hexdigest()
        for i in col.find():
            if i['username'] == data['username']:
                print(i['password'], hashed)
                if (i['password'] == hashed):
                    return "0"
                else:
                    return "2"

        return "1"

    except:
        return "-1"
    

@app.route('/courses')
def courses():
    client = MongoClient(CONNECTION_STRING)
    db = client['DBUGGER']
    col = db["ourCourses"]

    data = []
    for i in col.find():
        data.append(i)

    return json.dumps(data, default=str)


@app.route('/getMyCourse', methods = ['POST'])
def getMyCourse():
    data = request.get_json()
    client = MongoClient(CONNECTION_STRING)
    db = client['DBUGGER']
    col = db["enrolled"]

    courses = []
    for i in col.find():
        if (data['username'] in i['users']):
            courses.append(i['_id'])

    myCourses = []
    coll = db['ourCourses']
    for i in coll.find():
        if i['course_id'] in courses:
            myCourses.append(i)


    return json.dumps(myCourses, default=str)


@app.route('/enroll', methods = ['POST'])
def enroll():
    data = request.get_json()
    print(data)

    try:
        client = MongoClient(CONNECTION_STRING)
        db = client['DBUGGER']
        col = db["enrolled"]

        flag = 0;
        for i in col.find():
            if (int(i['_id']) == int(data['course_id'])):
                if (data['username'] in i['users']):
                    return "1"

        col.update_one({"_id": int(data['course_id'])}, {"$push": {"users": data['username']}})

        return "0"
    except:
        return "-1"
    
@app.route('/getUsername', methods = ['POST'])
def getUsername():
    data = request.get_json()

    try:
        client = MongoClient(CONNECTION_STRING)
        db = client['DBUGGER']
        col = db["users"]

        for i in col.find():
            if (i['email'] == data['mail']):
                return {'data': i['username']}
        
        return {"data": "No such user registered."}
    
    except:
        return "-1"



def test():
    data = json.loads(request.body.decode("utf-8"))

    try:
        client = MongoClient(CONNECTION_STRING)
        db = client['DBUGGER']
        col = db["enrolled"]

        users = []
        for i in data['enrolled']:
            users.append(i['1'])

        users.append("demo22")
        
        col.update_one({"_id": 2}, {"$push": {"course2": "piyush"}})

        return "1"
    except:
        return "-1"

@app.route('/reset', methods = ['POST', 'GET'])
def reset():
    data = request.get_json()
    print(data)

    try:
        client = MongoClient(CONNECTION_STRING)
        db = client['DBUGGER']
        col = db["users"]

        flag = 0
        for i in col.find():
            if i['email'] == data['mail']:
                filter = { 'email': data['mail'] }
                # Values to be updated.
                hashed = hashlib.md5(data['newpassword'].encode()).hexdigest()
                newvalues = { "$set": { 'password': hashed } }
                
                # Using update_one() method for single
                # updation.
                col.update_one(filter, newvalues)
                
                return "3"

    except:
        return "-1"
    

if __name__ == '__main__':
   app.run()
