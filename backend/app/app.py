import os.path
import logging
import flask
import flask_cors
from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import json
import pymysql
import pymysql.cursors
from ast import literal_eval
import copy
import redis
import pickle

FIELD_MAP = {"Source Cell Type": "sourceCellType",
            "Target Cell Type": "targetCellType",
            "Species": "species",
            "DOI": "DOI",
            "Duration, days": "duration",
            "Medium": "medium",
            "Initial Culture": "initialCulture",

            "Article title": "title", 
            "Yield of product": "yield",
            "How was the Yield calculated": "commentOnYield",
            "Comments on protocol": "comment_on_protocol"}
MAX_COUNT = 2
DEV_MODE  = True




if DEV_MODE == True:
    from auth import *
    from config iport import *
    MYSQL_CONFIG = DEV_CONFIG
    with open('index_chemicals_common.pckl', 'rb') as handle:
        index_chemicals_common = pickle.load(handle)

    with open('index_tfs.pckl', 'rb') as handle:
        index_tfs = pickle.load(handle)

    with open('index_species.pckl', 'rb') as handle:
        index_species = pickle.load(handle)

    with open('index_tct.pckl', 'rb') as handle:
        index_tct = pickle.load(handle)


    with open('index_sct.pckl', 'rb') as handle:
        index_sct = pickle.load(handle)

else:
    from .auth import *
    from .config import *
    MYSQL_CONFIG = PROD_CONFIG
    with open('app/index_chemicals_common.pckl', 'rb') as handle:
        index_chemicals_common = pickle.load(handle)

    with open('app/index_tfs.pckl', 'rb') as handle:
        index_tfs = pickle.load(handle)

    with open('app/index_species.pckl', 'rb') as handle:
        index_species = pickle.load(handle)

    with open('app/index_tct.pckl', 'rb') as handle:
        index_tct = pickle.load(handle)


    with open('app/index_sct.pckl', 'rb') as handle:
        index_sct = pickle.load(handle)


SUBMIT_MYSQL_CONFIG = copy.deepcopy(MYSQL_CONFIG)
SUBMIT_MYSQL_CONFIG['database'] = "temporary"

app = Flask(__name__)
CORS(app)

redis_database =  redis.Redis(**REDIS_CONFIG)




indexes = {
    "Chemicals": index_chemicals_common,
    "Transcription factors": index_tfs,
    "Species": index_species,
    "Target Cell Type": index_tct, 
    "Source Cell Type": index_sct

}


def log_post_request(data):
    try:
       print(data)
       return 1
    
    except:
        return 0

        
def post_ok():
    print("PUT OK!")

def post_error():
    print("PUT ERROR!")


def unwrap(dt):
    res = dict()
    for item in dt:
             res.update({FIELD_MAP[item['name']]: item['value']})
    return res


def calculate_average_ratings(protocolId: int) -> tuple:
    if True:
        connection = pymysql.connect(**MYSQL_CONFIG)

        if True:
            with connection.cursor() as cursor:
                query_1 = f"SELECT rateId FROM protocol_and_user_to_ratings WHERE protocolId={protocolId}"
                cursor.execute(query_1)
                rateIds = cursor.fetchall()
                if rateIds != None and len(rateIds) > 0:
                    rateIds = tuple(map(lambda item: item[0], rateIds))
                else:
                    return ("Not rated", "Not rated", "Not rated")
                print(rateIds)
                if len(rateIds) > 0:
                    if len(rateIds) > 1:
                        
                        query_2 = f"SELECT AVG(rate1), AVG(rate2), AVG(rate3) FROM ratings WHERE rateId in {rateIds}"
                    else:
                        query_2 = f"SELECT AVG(rate1), AVG(rate2), AVG(rate3) FROM ratings WHERE rateId = {rateIds[0]}"
                    cursor.execute(query_2)
                    avgs = cursor.fetchone()
                    if avgs != None:
                        return tuple(map(lambda item: str(round(item, 3)), avgs))
                    else:
                        return ("Not rated", "Not rated", "Not rated")


                else:
                    return ("Not rated", "Not rated", "Not rated")



    
@app.route('/api/login/<string:login>', methods=['PUT'])
def authoriseUser(login:str):
    user_params =  literal_eval("".join(map(chr,  request.data)))["request"]
    

    assert isinstance(user_params, dict)

    print(user_params)
    if not (check_for_no_sql_injection(login) and check_for_no_sql_injection(user_params["password"])):
        return jsonify({
            "status": "ERR",
            "response": "Bad username and/or password"
        })
    res = authorise_user(login, user_params['password'])
    if res == "SUCCESS":
        user_access_token = request_token(login, redis_database) 
        if user_access_token == "NULL":
            user_access_token = create_token(login, redis_database) # generated token is also stored in Redis database
        print(f"ACCESS_TOKEN: {user_access_token}")
        return jsonify({
            "status": "OK", 
            "response": [user_access_token]
        })
    else:
        return jsonify({
            "status": "ERR",
            "response": "User not found!"
        })

@app.route('/api/logout/', methods=['PUT'])
def deauthoriseUser():
    user_params  =  literal_eval("".join(map(chr,  request.data)))["request"]
    assert isinstance(user_params, dict)
    print(user_params)
    res = deauthorise_user(user_params['login'], user_params['access_token'], redis_database)
    if res == "SUCCESS":
        return jsonify({
            "status": "OK", 
            "response": ["Access token deleted successfully"]
        })
    elif res == "NOT_EXISTS":
        return jsonify({
            "status": "ERR",
            "response": ["User not found!"]
        })
    else:
        return jsonify({
            "status": "ERR",
            "response":[ "Unknown error ocupied"]
        })

@app.route('/api/addUser/<string:login>', methods=['PUT'])
def addUser(login:str):
    # adds new user to database
    print("ADD USER CALL")
    user_params =  literal_eval("".join(map(chr,  request.data)))["request"]
    assert isinstance(user_params, dict)
    
    print(user_params)
     
    if 'login' in user_params.keys() and 'email' in user_params.keys() and 'password' in user_params.keys():
        if not (check_for_no_sql_injection(user_params["login"]) and check_for_no_sql_injection(user_params["password"]) and check_for_no_sql_injection(user_params["email"])):
            return jsonify({
                "status": "ERR",
                "response": "Bad username and/or password"
            })
        res = create_new_user(user_params['login'], user_params['password'], user_params['email'])
    else:
        return jsonify({
            "status": "ERR",
            "responce": ["Missing fields"]
        })

    if res == "SUCCESS":
        user_access_token = request_token(login, redis_database) 
        if user_access_token == "NULL":
            user_access_token = create_token(login, redis_database) # generated token is also stored in Redis database
        print(f"ACCESS_TOKEN: {user_access_token}")
        return jsonify({
            "status": "OK", 
            "response": [user_access_token]
        })
    elif res == "EXISTS":
        return jsonify({
            "status": "ERR",
            "response": ["User exists!"]
        })

    else:
        return jsonify({
            "status": "ERR",
            "response": ["Undefined server-side error ocupied!"]
        })
    





@app.route('/api/submitQuery', methods=['POST'])
def submitQuery():
    post_request = literal_eval("".join(map(chr,  request.data)))
    #print("POST_REQUEST:", post_request)
    assert isinstance(post_request, dict), f"From submitQuery: assertion of request.data failed, expected dict, got {type(request.data)}"
    user_name = post_request['user_name']
    access_token = post_request['access_token']
    #print("USER_NAME:", user_name)
    #print("ACCESS_TOKEN:", access_token)
    post_request = post_request["request"]

    
    validation_result = check_if_user_admin(user_name)


    if validation_result == False:
        return "ERR", 401
    else:
        print("VALIDATED SUCCESSFULLY!")
    #print(post_request)


    to_main = post_request['single_valued_fields']
    to_main = unwrap(to_main)
    to_authors = post_request['authors']
    to_tfs = post_request['tfs']
    to_gfs = post_request['gfs']
    to_sfs = post_request['sfs']
    to_chemicals = post_request['chemical_compounds']
    #print("CHEMICALS:", to_chemicals)
    connection = pymysql.connect(**SUBMIT_MYSQL_CONFIG)
    try:
        with connection.cursor() as cursor:
            main_query = f"""INSERT INTO MAIN(DOI, species, sourceCellType,
                            targetCellType, duration, medium, 
                            initialCulture, title, yield, 
                            commentOnYield, type_of_protocol, comment_on_protocol) 
                            VALUES('{to_main["DOI"]}', '{to_main["species"]}', '{to_main["sourceCellType"]}', '{to_main["targetCellType"]}', '{to_main["duration"]}', '{to_main["medium"]}', 
                            '{to_main["initialCulture"]}', '{to_main["title"]}', '{to_main["yield"]}', '{to_main["commentOnYield"]}', NULL,  '{to_main["comment_on_protocol"]}')
                            """
            #print(main_query)
            cursor.execute(main_query)
            connection.commit()

            cursor.execute("SELECT LAST_INSERT_ID()")
            protocolId = int(cursor.fetchone()[0])
            
            for to_author in to_authors:
                cursor.execute(f"SELECT * FROM authors WHERE author='{to_author['value']}'")
                author_in_database = cursor.fetchone()
                if author_in_database:
                    n_of_articles_current = int(author_in_database[-1])
                    query = f"""
                    UPDATE authors
                    SET  number_of_articles={n_of_articles_current + 1}
                    WHERE author='{to_author['value']}'
                    """
                    cursor.execute(query)
                    connection.commit()
                    query_insert = f"INSERT INTO protocol_to_authors(protocolId, authorId) VALUES ({protocolId}, {author_in_database[0]});"
                else:

                    authors_query = f"INSERT INTO authors(author, number_of_articles) VALUES ('{to_author['value']}', 1)"
                    print(authors_query)
                    cursor.execute(authors_query)
                    connection.commit()
                    cursor.execute("SELECT LAST_INSERT_ID()")
                    authorId = int(cursor.fetchone()[0])
                    print(authorId)
                    query_insert = f"INSERT INTO protocol_to_authors(protocolId, authorId) VALUES ({protocolId}, {authorId})"
                    print(query_insert)
                    cursor.execute(query_insert)
                    connection.commit()


            for tf in to_tfs:
                cursor.execute(f"INSERT INTO protocol_to_transcriptionFactor(protocolId, transcriptionFactor) VALUES ({protocolId}, '{tf['value']}')")  
                connection.commit()

            for gf in to_gfs:
                cursor.execute(f"INSERT INTO protocol_to_growthFactor(protocolId, growthFactor) VALUES ({protocolId}, '{gf['value']}')")  
                connection.commit()

            for sf in to_sfs:
                cursor.execute(f"INSERT INTO protocol_to_stressFactor(protocolId, stressFactor) VALUES ({protocolId}, '{sf['value']}')")  
                connection.commit()
            for chemical in to_chemicals:
                query = f"INSERT INTO chemicals(chemicalId, chemicalCommon) VALUES('{chemical['chemical_cid']}', '{chemical['chemical_common']}')"
                cursor.execute(query)
                connection.commit()
                cursor.execute("SELECT LAST_INSERT_ID()")
                chemicalInd = int(cursor.fetchone()[0])
                query_moa = f"INSERT INTO moa(protocolId, chemicalInd, moa) VALUES({protocolId}, {chemicalInd}, '{chemical['chemical_moa']}')"
                cursor.execute(query_moa)
                connection.commit()
                query_p_to_c = f"INSERT INTO protocol_to_chemicalInd(protocolId, chemicalInd) VALUES ({protocolId}, {chemicalInd})"
                cursor.execute(query_p_to_c)
                connection.commit()

            if log_post_request(post_request) == 1:
                post_ok()
            else:
                post_error()
            

            return "Done", 200
    except:
        print("ERROR At submitQuery occupied!")
        raise

    finally:
        connection.close()
       
    return "ERR", 500
    
        

@app.route('/api/requestAllData', methods=['GET'])
def getAllData():

    """
    Returns all protocols existing in database
    """
    if True: #"""request.json.keys()"""
        connection = pymysql.connect(**MYSQL_CONFIG)


        try:
            with connection.cursor() as cursor:
                query_basic = "SELECT * FROM MAIN"
                cursor.execute(query_basic)
                connection.commit()
                response = cursor.fetchall()
                #print(response)
                #print(response)
                if len(response) == 0:
                    response_out = []
                
                else:
                    response_out = [] 
                    for res in response:
                        #response_out.append(dict(zip(["sourceCellType", "targetCellType", "species", "DOI", "NumberOfCitations","Title", "Yield" ],[res[0], res[1], res[2], res[4], res[7], res[9], res[12]])))
                        #  "chemicalInd", "chemicalId", "chemicalCommon", "transcriptionFactor", "stressFactor", "growthFactor", "authorId", "author", "number_of_articles" 

                        # dealing with authors
                        query_author_ids = f"SELECT protocol_to_authors.authorId FROM protocol_to_authors WHERE protocolId={int(res[0])}"
                        cursor.execute(query_author_ids)
                        connection.commit()
                        author_ids = cursor.fetchall()
                        author_ids = tuple(map(lambda item: item[0], author_ids))
                        #print("AUTHOR IDS", author_ids)
                        if len(author_ids) != 0:
                            if len(author_ids) == 1:
                                query_authors = f"SELECT * FROM authors WHERE authorId={author_ids[0]}"
                            else:
                                query_authors = f"SELECT * FROM authors WHERE authorId IN {author_ids}"
                            #print("QUERY AUTHORS:", query_authors)
                            cursor.execute(query_authors)
                            connection.commit()
                            authors = cursor.fetchall()
                            authors_dt = dict(list(map(lambda item: (item[1], item[2]), authors)))
                            authors_list = list(map(lambda item: item[1], authors))
                        else:
                            authors_dt = {"": ""}
                            authors_list = []
                        #print("AUTHORS:", authors_dt)


                        #dealing with chemicals and their MOAs
                        query_chemical_inds = f"SELECT protocol_to_chemicalInd.chemicalInd FROM protocol_to_chemicalInd WHERE protocolId={int(res[0])}"
                        cursor.execute(query_chemical_inds)
                        connection.commit()
                        chemical_inds = cursor.fetchall()
                        if type(chemical_inds) == int:
                            chemical_inds = (chemical_inds, )
                        elif type(chemical_inds) == tuple and len(chemical_inds) > 0:
                            chemical_inds = tuple(map(lambda item: item[0], chemical_inds))

                        #print("CHEMICAL INDS", chemical_inds)
                        if len(chemical_inds) != 0:
                            if len(chemical_inds) > 1:
                                query_chemicals = f"SELECT * FROM chemicals WHERE chemicalInd IN {chemical_inds}"
                            else:
                                query_chemicals = f"SELECT * FROM chemicals WHERE chemicalInd={chemical_inds[0]}"
                            #print("QUERY CHEMICALS:", query_chemicals)
                            cursor.execute(query_chemicals)
                            connection.commit()
                            chemicals = cursor.fetchall()
                            chemicals_list = list(map(lambda item: (item[1], item[2]), chemicals))
                            chemicals_common = []
                            chemicals_cid = []
                            for chem in chemicals_list:
                                chemicals_common.append(chem[1])
                                chemicals_cid.append(chem[0])
                            # dealing with MOAs
                            moas = []
                            for chemical_ind in chemical_inds:

                                query_moa = f"SELECT moa FROM moa WHERE protocolId={int(res[0])} AND chemicalInd={chemical_ind}"
                                cursor.execute(query_moa)
                                connection.commit()
                                moa = cursor.fetchone()
                                if moa != None:
                                    moas.append(moa[0])
                                else:
                                    moas.append("")
                        else:
                            chemicals_common = []
                            chemicals_cid = []
                       # print("CHEMICALS COMMON:", chemicals_common)
                        #print("CHEMICALS CID:", chemicals_cid)
                        #print("MOAS:", moas)
                        
                        #dealing with transcription factors
                        query_tfs = f"SELECT protocol_to_transcriptionFactor.transcriptionFactor FROM protocol_to_transcriptionFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_tfs)
                        connection.commit()
                        tfs = cursor.fetchall()
                        if tfs != None:
                            tfs = list(map(lambda item: item[0], tfs))
                        else:
                            tfs = []
                        #print("Transcription factors:", tfs)

                        #dealing with stress factors
                        query_sfs = f"SELECT protocol_to_stressFactor.stressFactor FROM protocol_to_stressFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_sfs)
                        connection.commit()
                        sfs = cursor.fetchall()
                        if sfs != None:
                            sfs = list(map(lambda item: item[0], sfs))
                        else:
                            sfs = []
                        #print("Stress factors:", sfs)

                        #dealing with growth factors
                        query_gfs = f"SELECT protocol_to_growthFactor.growthFactor FROM protocol_to_growthFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_gfs)
                        connection.commit()
                        gfs = cursor.fetchall()
                        if gfs != None:
                            gfs = list(map(lambda item: item[0], gfs))
                        else:
                            gfs = []
                        #print("Growth factors:", gfs)
                        
                        # ["protocolId", "DOI","species","sourceCellType", "targetCellType", "duration", "medium", "initialCulture", "title", "yield", "commentOnYield", "type_of_protocol"(DROPPED), "comment_on_protocol", "authors", "chemicals_common", "chemicals_cid", "moas", "transcription_factors"]
                        
                        chemicals_common = list(filter(lambda item: item != ""  and item != " ", chemicals_common))
                        chemicals_cid = list(filter(lambda item: item != ""  and item != " ", chemicals_cid))
                        moas =  list(filter(lambda item: item != ""  and item != " ", moas))
                        tfs =  list(filter(lambda item: item != ""  and item != " ", tfs))
                        sfs =  list(filter(lambda item: item != ""  and item != " ", sfs))
                        gfs =  list(filter(lambda item: item != ""  and item != " ", gfs))


                        json_out_basic = {
                          "id": res[0],
                          "species": res[2],
                          "sourceCellType": res[3], 
                          "targetCellType": res[4], 
                          "duration": res[5],
                          "medium": res[6], 
                          "initialCulture": res[7],  
                          "yield": res[8],
                          "chemicals_common": chemicals_common,  
                          "chemicals_cid": chemicals_cid,
                          "tfs": tfs
                        } 

                        response_out.append(json_out_basic)

                        """response_out.append([res[0], *res[2:12],*res[13:],  res[1],  
                                                authors_list, 
                                                chemicals_common, 
                                                chemicals_cid,
                                                moas, 
                                                tfs])"""
                        
        finally:
            connection.close()
        


        #print(response_out)
        return jsonify({
            "response": response_out,
            "indexes": indexes
        })
    else:
        return jsonify({
            "response": ["Request failed: 'queries' not found in request body"]
        })
@app.route('/api/query/<int:protocol_id>', methods=['GET'])
def getProtocolById(protocol_id):
    """
    Returns protocol by its ID
    """
    connection = pymysql.connect(**MYSQL_CONFIG)
    try:
        
        with connection.cursor() as cursor: 
                query_basic = f"SELECT * FROM MAIN WHERE protocolId={protocol_id}"
                cursor.execute(query_basic)
                connection.commit()
                response = cursor.fetchall()
                print(response)
                #print(response)
                if len(response) == 0:
                    response_out = []
                
                else:
                    response_out = []
                    for res in response:
                        #response_out.append(dict(zip(["sourceCellType", "targetCellType", "species", "DOI", "NumberOfCitations","Title", "Yield" ],[res[0], res[1], res[2], res[4], res[7], res[9], res[12]])))
                        #  "chemicalInd", "chemicalId", "chemicalCommon", "transcriptionFactor", "stressFactor", "growthFactor", "authorId", "author", "number_of_articles" 

                        # dealing with authors
                        query_author_ids = f"SELECT protocol_to_authors.authorId FROM protocol_to_authors WHERE protocolId={int(res[0])}"
                        cursor.execute(query_author_ids)
                        connection.commit()
                        author_ids = cursor.fetchall()
                        author_ids = tuple(map(lambda item: item[0], author_ids))
                        #print("AUTHOR IDS", author_ids)
                        if len(author_ids) != 0:
                            if len(author_ids) == 1:
                                query_authors = f"SELECT * FROM authors WHERE authorId={author_ids[0]}"
                            else:
                                query_authors = f"SELECT * FROM authors WHERE authorId IN {author_ids}"
                            #print("QUERY AUTHORS:", query_authors)
                            cursor.execute(query_authors)
                            connection.commit()
                            authors = cursor.fetchall()
                            authors_dt = dict(list(map(lambda item: (item[1], item[2]), authors)))
                            authors_list = list(map(lambda item: item[1], authors))
                        else:
                            authors_dt = {"": ""}
                            authors_list = []
                        #print("AUTHORS:", authors_dt)


                        #dealing with chemicals and their MOAs
                        query_chemical_inds = f"SELECT protocol_to_chemicalInd.chemicalInd FROM protocol_to_chemicalInd WHERE protocolId={int(res[0])}"
                        cursor.execute(query_chemical_inds)
                        connection.commit()
                        chemical_inds = cursor.fetchall()
                        if type(chemical_inds) == int:
                            chemical_inds = (chemical_inds, )
                        elif type(chemical_inds) == tuple and len(chemical_inds) > 0:
                            chemical_inds = tuple(map(lambda item: item[0], chemical_inds))

                        #print("CHEMICAL INDS", chemical_inds)
                        if len(chemical_inds) != 0:
                            if len(chemical_inds) > 1:
                                query_chemicals = f"SELECT * FROM chemicals WHERE chemicalInd IN {chemical_inds}"
                            else:
                                query_chemicals = f"SELECT * FROM chemicals WHERE chemicalInd={chemical_inds[0]}"
                            #print("QUERY CHEMICALS:", query_chemicals)
                            cursor.execute(query_chemicals)
                            connection.commit()
                            chemicals = cursor.fetchall()
                            chemicals_list = list(map(lambda item: (item[1], item[2]), chemicals))
                            chemicals_common = []
                            chemicals_cid = []
                            for chem in chemicals_list:
                                chemicals_common.append(chem[1])
                                chemicals_cid.append(chem[0])
                            # dealing with MOAs
                            moas = []
                            for chemical_ind in chemical_inds:

                                query_moa = f"SELECT moa FROM moa WHERE protocolId={int(res[0])} AND chemicalInd={chemical_ind}"
                                cursor.execute(query_moa)
                                connection.commit()
                                moa = cursor.fetchone()
                                if moa != None:
                                    moas.append(moa[0])
                                else:
                                    moas.append("")
                        else:
                            chemicals_common = []
                            chemicals_cid = []
                       # print("CHEMICALS COMMON:", chemicals_common)
                        #print("CHEMICALS CID:", chemicals_cid)
                        #print("MOAS:", moas)
                        
                        #dealing with transcription factors
                        query_tfs = f"SELECT protocol_to_transcriptionFactor.transcriptionFactor FROM protocol_to_transcriptionFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_tfs)
                        connection.commit()
                        tfs = cursor.fetchall()
                        if tfs != None:
                            tfs = list(map(lambda item: item[0], tfs))
                        else:
                            tfs = []
                        #print("Transcription factors:", tfs)

                        #dealing with stress factors
                        query_sfs = f"SELECT protocol_to_stressFactor.stressFactor FROM protocol_to_stressFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_sfs)
                        connection.commit()
                        sfs = cursor.fetchall()
                        if sfs != None:
                            sfs = list(map(lambda item: item[0], sfs))
                        else:
                            sfs = []
                        #print("Stress factors:", sfs)

                        #dealing with growth factors
                        query_gfs = f"SELECT protocol_to_growthFactor.growthFactor FROM protocol_to_growthFactor WHERE protocolId={int(res[0])}"
                        cursor.execute(query_gfs)
                        connection.commit()
                        gfs = cursor.fetchall()
                        if gfs != None:
                            gfs = list(map(lambda item: item[0], gfs))
                        else:
                            gfs = []
                        #print("Growth factors:", gfs)
                        
                        # ["protocolId", "DOI","species","sourceCellType", "targetCellType", "duration", "medium", "initialCulture", "title", "yield", "commentOnYield", "type_of_protocol"(DROPPED), "comment_on_protocol", "authors", "chemicals_common", "chemicals_cid", "moas", "transcription_factors"]
                    
                        chemicals_common = list(filter(lambda item: item != ""  and item != " ", chemicals_common))
                        chemicals_cid = list(filter(lambda item: item != ""  and item != " ", chemicals_cid))
                        moas =  list(filter(lambda item: item != ""  and item != " ", moas))
                        tfs =  list(filter(lambda item: item != ""  and item != " ", tfs))
                        sfs =  list(filter(lambda item: item != ""  and item != " ", sfs))
                        gfs =  list(filter(lambda item: item != ""  and item != " ", gfs))
                        response_out.append([*res[:12], 
                                                authors_list, 
                                                chemicals_common, 
                                                chemicals_cid,
                                                moas, 
                                                tfs, sfs, gfs])
    except:
        print(f"An exception occupied while trying to get protocol by id {protocol_id}")
    finally:
        connection.close()
    
    avgs = calculate_average_ratings(protocol_id)
    return jsonify({
            "response": response_out,
            "avgs": avgs
        })

@app.route('/api/rateProtocol', methods=['PUT'])
def rateProtocol():
    request_params =  literal_eval("".join(map(chr,  request.data)))["request"]
    if check_user(request_params["userName"], request_params["access_token"], redis_database):
        userId = userId_by_userName(request_params["userName"])
        if userId == -1:
            return jsonify({
            "response": ["Authentifiction error occupied"]
            })
        print(request_params['ratings'])
        try:
            connection = pymysql.connect(**MYSQL_CONFIG)
            try:
                with connection.cursor() as cursor:
                    query_basic = f"SELECT rateId FROM protocol_and_user_to_ratings WHERE protocolId = {request_params['protocolId']} AND userId = {userId}"
                    cursor.execute(query_basic)
                    connection.commit()
                    response = cursor.fetchone()
                    if response != None and len(response) != 0:
                        rateId = response[0]
                        query = f"""UPDATE 
                                    ratings
                                SET 
                                    rate1 = {request_params['ratings'][0]["value"]},
                                    rate2 = {request_params['ratings'][1]['value']},
                                    rate3 = {request_params['ratings'][2]['value']}
                                WHERE 
                                    rateId = {rateId}"""
                        print(query)
                        cursor.execute(query)
                        connection.commit()
                    
                    else:
                        query1 = f"INSERT INTO ratings(rate1, rate2, rate3) VALUES({request_params['ratings'][0]['value']}, {request_params['ratings'][1]['value']}, {request_params['ratings'][2]['value']})"
                        cursor.execute(query1)
                        connection.commit()
                        cursor.execute("SELECT LAST_INSERT_ID()")
                        rateId = int(cursor.fetchone()[0])
                        query2 = f"INSERT INTO protocol_and_user_to_ratings(protocolId, userId, rateId) VALUES ({request_params['protocolId']}, {userId}, {rateId})"
                        cursor.execute(query2)
                        connection.commit() 
                    print('All good')
                    return jsonify({
                                    "response": ["All good"]
                        })
        
            except:
                return jsonify({
                                "response": ["An error occupied while trying to set ratings"]
                        })
        except:
            print("ERROR CONNECTING TO DATABASE")
            return jsonify({
                "response": ["Database error"]
            })

        
        finally:
            connection.close()





    else:
        return jsonify({
            "response": ["Authentifiction error occupied"]
        })



@app.route("/api/getRatedProtocols", methods=["put"])
def returnProtocols():
    get_request = literal_eval("".join(map(chr,  request.data)))
    userName = get_request["userName"]
    access_token = get_request["access_token"]

    if check_user(userName, access_token,  redis_database):
        
        userId = userId_by_userName(userName)
        if userId == -1:
            return jsonify({
                    "response": ["User not found in database"]
                })
        try:
            connection = pymysql.connect(**MYSQL_CONFIG)
            with connection.cursor() as cursor:
                query = f"SELECT protocolId, rateId FROM protocol_and_user_to_ratings WHERE userId={userId}"
                #print("USER ID",userId)
                cursor.execute(query)
                protocols_and_rates_for_user = cursor.fetchall()
                if protocols_and_rates_for_user != None and len(protocols_and_rates_for_user) > 0:
                    response_out = []
                    #print(protocols_and_rates_for_user)

                    for i, item in enumerate(protocols_and_rates_for_user):
                        
                        query_rates = f"SELECT rate1, rate2, rate3 FROM ratings WHERE rateId = {item[1]}"
                        #print(query_rates)
                        cursor.execute(query_rates)
                        response_rates = cursor.fetchone()

                        response_basic = {
                            "protocolId": item[0],
                            "rates":[*response_rates]
                        }
                        response_out.append(response_basic)
                    return jsonify({
                        "response": response_out
                    })


                else:
                    return jsonify({
                        "response": []
                    })
        except pymysql.Error:
            return jsonify({
                    "response": ["Database error"]
            })

    else:
        return jsonify({
            "response": ['Authentification failed']
        })



if __name__ == "__main__":
    
    env = os.environ.get("APP_ENV", "dev")
    print(f"Starting application in {env} mode")
    app.config.from_object(f"backend.connfig.{env}_settings")
    cors = CORS(app, resources={r"/queries/*": {"queries": "*"}})

    app.run(debug=True)
