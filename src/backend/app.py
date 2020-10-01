from flask import Flask, jsonify, abort, make_response, request, url_for
from sqlalchemy.ext.declarative import declarative_base ##
from datetime import datetime
from collections import defaultdict


app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import exc
from database_setup import Base, engine

from models import User, Account, Role, Access_List, Privilege, Resource



#FIXME: is this redundant to database_setup?
# Connect to Database and create database session
#Base = declarative_base() ###
#engine = create_engine('sqlite:///GROLE_data.db')
#Base.metadata.bind = engine
#Base.metadata.create_all(engine) ###

DBSession = sessionmaker(bind=engine)
session = DBSession()


# landing page 

@app.route('/')
def landing():
    return(jsonify({"index": "GROLE System"}))

##  USERS
@app.route('/grole/api/v0.1/users', methods=['GET'])
def get_users():
    all_users = session.query(User).all()
    return(jsonify({"all_users": [{"id": u.id,"username": u.username, "email":u.email, "href": url_for('get_user_by_id', user_id = u.id)} for u in all_users ]}))

# HATEOAS version
@app.route('/grole/api/v0.1/hateoas/users', methods=['GET'])
def get_users_h():
    all_users = session.query(User).all()
    return(jsonify({"all_users_URL": [url_for('get_user_by_id', user_id = u.id) for u in all_users]}))

@app.route('/grole/api/v0.1/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404) #https://stackoverflow.com/questions/11746894/what-is-the-proper-rest-response-code-for-a-valid-request-but-an-empty-data
    return(jsonify({"user":{"id": user.id, "username": user.username, "email": user.email }}))


#@app.route('/grole/api/v0.1/users/<string:nt_acct>', methods=['GET'])
#def get_user_by_nt_accountname(nt_acct):
    #user = session.query(User).filter(User.va_nt_account == nt_acct).first()
    #if user is None:
        #abort(404)
    #return(jsonify({"user":{"id": user.id, "username": user.username,"nt_account": user.va_nt_account, "email": user.email }}))




@app.route('/grole/api/v0.1/users', methods=['POST'])
def create_user():
    if not request.json \
       or not 'username' in request.json:
       #or not 'creation_date' in request.json:
        abort(400)
    
    new_u = User()
    # all create should have default values for missing params
    new_u.username = request.json['username']
    new_u.email = request.json['email']
    #new_u.creation_date = request.json['creation_date']
    new_u.creation_date = datetime(2020, 8, 8, 0, 0, 0)
    new_u.type = "regular"
    try:
        session.add(new_u)
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"user_created": {"id": new_u.id, "name": new_u.username, "href": url_for('get_user_by_id', user_id=new_u.id)}}))


@app.route('/grole/api/v0.1/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    if not request.json:
        abort(400)
    # what fields are allowed to change? not id/username/vaacct?
    if 'email' in request.json:
        user.email = request.json.get('email', user.email)
    if 'affiliation' in request.json:
        user.affiliation = request.json.get('affiliation', user.affiliation)
    if 'type' in request.json:
        user.type = request.json.get('type', user.type)
    try:
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"user_updated": {"id": user.id, "name": user.username, "email":user.email, "affil": user.affiliation, "type": user.type }}))


@app.route('/grole/api/v0.1/users/<int:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    session.delete(user)
    session.commit()
    return(jsonify({"user_deleted": user_id }))


# add an account to a user (use general update? or JSON data?)
@app.route('/grole/api/v0.1/users/<int:user_id>/<int:account_id>', methods=['PUT'])
def add_account_to_user(user_id, account_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    account = session.query(Account).filter(Account.id == account_id).one()
    if account is None:
        abort(404)
    # if account associated with another user already
    if account.user_id is not None and account.user_id != user_id:
        abort(404) #fixme - data error?
    account.user_id = user_id
    session.commit()
    return(jsonify({"user": user_id, "account_added": account_id}))


#get all accounts for a user:
@app.route('/grole/api/v0.1/users/accounts/<int:user_id>', methods=['GET'])
def get_accounts_for_user(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    accounts = []
    for a in user.accounts:
        accounts.append({"id": a.id, "va_nt_account": a.va_nt_account, "uid": a.uid, "type": a.type})
    if len(accounts) == 0:
        accounts = "NONE"
    return(jsonify({"accounts" : accounts}))


#get all roles for a user:
@app.route('/grole/api/v0.1/users/roles/<int:user_id>',methods=['GET'])
def get_roles_for_user(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    roles = []
    #for a in session.query(Account).all():
        #if a.user_id == user_id:
    for a in user.accounts:
        for r in a.roles:
            #roles.append({"id": r.id, "name": r.name, "description":r.description})
            roles.append(r)
    if len(roles) == 0:
        return(jsonify({"roles" : "None"}))
    # dupes are possible if a user's multiple accounts have same role:
    roles = list(set(roles))
    ret_roles = [{"id": r.id, "name": r.name, "description":r.description} for r in roles]
    return(jsonify({"roles" : ret_roles}))

#get all roles for a user, organized by account
@app.route('/grole/api/v0.1/users/roles/by_account/<int:user_id>',methods=['GET'])
def get_roles_for_user_by_account(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    roles = defaultdict()
    for a in user.accounts:
        roles[a.id] = []
        for r in a.roles:
            roles[a.id].append({"id": r.id, "name": r.name, "description":r.description})
    if len(roles) == 0:
        roles = "NONE"
    return(jsonify({"roles_by_account" : roles}))

#get all privs for a user
@app.route('/grole/api/v0.1/users/privileges/<int:user_id>', methods=['GET'])
def get_privs_for_user(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    privs = []
    for a in user.accounts:
        for r in a.roles:
            for p in r.access_list.privilege:
                privs.append(p)
    if len(privs) == 0:
        return(jsonify({"privs": "NONE"}))
    #eliminate possible dupes
    privs = list(set(privs))
    ret_privs = [{"id": p.id, "name": p.name, "description": p.description} for p in privs]
    return(jsonify({"privs" : ret_privs}))

#get all privs for a user, organized by account and role
@app.route('/grole/api/v0.1/users/privileges/by_account_and_role/<int:user_id>', methods=['GET'])
def get_privs_for_user_by_account_and_role(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    priv_count = 0
    privs = defaultdict()
    for a in user.accounts:
        privs[a.id] = []
        for r in a.roles:
            roledict = defaultdict()
            roledict[r.name] = []
            for p in r.access_list.privilege:
                priv_count += 1
                roledict[r.name].append({"id": p.id, "name": p.name, "description": p.description})
            privs[a.id].append(roledict)
    #if len(privs) == 0 or priv_count == 0:
        #privs = "NONE"
    return(jsonify({"privileges_by_account_role" : privs}))

#get all resources associated with a user
@app.route('/grole/api/v0.1/users/resources/<int:user_id>', methods=['GET'])
def get_all_resources_for_user(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    resources = []
    for a in user.accounts:
        for r in a.roles:
            for p in r.access_list.privilege:
                #for re in p.resource:
                    #resources.append(re)
                 if p.resource is not None:
                     resources.append(p.resource)
    if len(resources) == 0:
        return(jsonify({"resources": "NONE"}))
    #eliminate dupes
    resources = list(set(resources))
    print("list of resources after dedupe", resources)
    ret_resources = [{"id": r.id, "kind": r.kind, "name": r.name, "site": r.site} for r in resources]
    return(jsonify({"resources" : ret_resources}))






#get all resources associated with a user, organized by account, role, & privilege
@app.route('/grole/api/v0.1/users/resources/by_account_role_privilege/<int:user_id>', methods=['GET'])
def get_all_resources_for_user_by_account_role_privilege(user_id):
    user = session.query(User).filter(User.id == user_id).first()
    if user is None:
        abort(404)
    #resource_count = 0
    resources = defaultdict()
    for a in user.accounts:
        resources[a.id] = []
        for r in a.roles:
            roledict = defaultdict()
            roledict[r.name] = []
            for p in r.access_list.privilege:
                if p.resource is not None:
                    a_resource = p.resource
                    privdict = defaultdict()
                    privdict[p.name] = {"id": a_resource.id, "kind": a_resource.kind, "site": a_resource.site}
                    roledict[r.name].append(privdict)
            resources[a.id].append(roledict)
    return(jsonify({"resources_by_account_role_priv": resources}))





## ACCOUNTS

@app.route('/grole/api/v0.1/accounts', methods=['GET'])
def get_accounts():
    all_accounts = session.query(Account).all()
    #return(jsonify({"all accounts": [{"id": a.id, "uid": a.uid, "linked user": a.user_id} for a in all_accounts]}))
    aclist = []
    for a in all_accounts:
        linked_user = "None"
        if session.query(User).filter(User.id == a.user_id).first() is not None:
            linked_user = session.query(User).filter(User.id == a.user_id).first().username
        aclist.append({"id": a.id, "va_nt_account": a.va_nt_account, "uid" : a.uid,"account_type": a.type, "linked_user": linked_user, "updated" : a.updated_date})
    return(jsonify({"all_accounts": aclist}))


@app.route('/grole/api/v0.1/accounts/<int:account_id>', methods=['GET'])
def get_account_by_id(account_id):
    account = session.query(Account).filter(Account.id == account_id).first()
    if account is None:
        abort(404)
    linked_user = "None"
    if session.query(User).filter(User.id == account.user_id).first() is not None:
        linked_user = session.query(User).filter(User.id == account.user_id).first().username

    return(jsonify({"account": {"id": account.id, "va_nt_account": account.va_nt_account, "uid": account.uid,  "account_type": account.type, "linked_user": linked_user, "updated": account.updated_date}}))



@app.route('/grole/api/v0.1/accounts', methods=['POST'])
def create_account():
    if not request.json \
       or not 'nt_account' in request.json \
       or not 'uid' in request.json \
       or not 'type' in request.json:
        abort(400)

    new_a = Account()
    new_a.type = request.json['type']
    new_a.uid = request.json['uid']
    new_a.va_nt_account = request.json['nt_account']
    #new_a.creation_date = request.json['creation_date']
    new_a.creation_date = datetime(2020, 8, 10, 0, 0, 0)
    #new_a.updated_date = request.json['updated_date']
    new_a.updated_date = datetime(2020, 9, 9, 1, 0, 0)
    if 'linked_user' in request.json:
        new_a.user_id = request.json['linked_user']
    try:
        session.add(new_a)
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"account_created": {"nt_account": new_a.va_nt_account,"uid" : new_a.uid, "type": new_a.type}}))



@app.route('/grole/api/v0.1/accounts/<int:account_id>', methods=['PUT'])
def update_account(account_id):
    account = session.query(Account).filter(Account.id == account_id).first()
    if account is None:
        abort(404)
    if not request.json:
        abort(400)
    if 'type' in request.json:
        account.type = request.json.get('type', account.type)
    if 'nt_account' in request.json:
        account.va_nt_account = request.json.get('nt_account', account.va_nt_account)
    if 'uid' in request.json:
        account.uid = request.json.get('uid', account.uid)
    if 'updated_date' in request.json:
        #account.updated_date = request.json.get('updated_date', account.updated_date)
        account.updated_date = datetime.strptime(request.json.get('updated_date'), "%m-%d-%Y %H:%M:%S")
    try:
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"account_updated":{"id": account.id, "uid": account.uid, "type":account.type, "date updated":account.updated_date}}))


@app.route('/grole/api/v0.1/accounts/<int:account_id>', methods=['DELETE'])
def delete_account_by_id(account_id):
    account = session.query(Account).filter(Account.id == account_id).first()
    if account is None:
        abort(404)
    session.delete(account)
    session.commit()
    return(jsonify({"account_deleted": account_id}))




## ROLES
@app.route('/grole/api/v0.1/roles', methods=['GET'])
def get_roles():
    all_roles = session.query(Role).all()
    return(jsonify({"all_roles": [{"id" : r.id, "name": r.name, "description": r.description[:15],"access_list" : r.access_list_id} for r in all_roles]}))



@app.route('/grole/api/v0.1/roles/<int:role_id>', methods=['GET'])
def get_role_by_id(role_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    return(jsonify(
        {"Role":
           {"id": role.id,
            "name": role.name,
            "description": role.description
           }
        }
    ))

# Get all accounts for a role:
@app.route('/grole/api/v0.1/roles/accounts/<int:role_id>', methods=['GET'])
def get_accounts_for_role(role_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    accounts = role.accounts
    # check none
    return(jsonify({"accounts_for_role" : [{"id": a.id,"nt_account": a.va_nt_account, "uid": a.uid, "href": url_for('get_account_by_id', account_id = a.id)} for a in accounts ]}))

# Get all users for a role:
@app.route('/grole/api/v0.1/roles/users/<int:role_id>', methods=['GET'])
def get_user_for_role(role_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    users = []
    accounts = role.accounts
    if accounts is None:
        abort(404)
    for a in accounts:
        users.append(a.users)
    users = list(set(users))
    return(jsonify({"users_for_role":[{"id": u.id,"username": u.username, "href": url_for('get_user_by_id', user_id = u.id)} for u in users]}))



@app.route('/grole/api/v0.1/roles', methods=['POST'])
def create_role():
    if not request.json \
       or not 'name' in request.json:
        abort(400)
        
    new_r = Role()
    new_r.name = request.json['name']
    if 'description' in request.json:
        new_r.description = request.json['description']
    #optionally include associated accounts/access_list?
    try:
        session.add(new_r)
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"role_created" : {"id" : new_r.id, "name" : new_r.name}}))

@app.route('/grole/api/v0.1/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    if not request.json:
        abort(400)
    if 'name' in request.json:
        role.name = request.json.get('name', role.name)
    if 'description' in request.json:
        role.description = request.json.get('description', role.description)
    #update connections separately?
    try:
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(
        jsonify({"role_updated":
                    {"id":role.id,
                     "name": role.name,
                     "description": role.description
                 }
                }
            ))


@app.route('/grole/api/v0.1/roles/<int:role_id>', methods=['DELETE'])
def delete_role_by_id(role_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    session.delete(role)
    session.commit()
    return(jsonify({"role_deleted": role_id}))








# Grant an existing privilege to a role
# FIXME: since access_list - Priv is many-to-one, this can overwrite an existing role's association with priv!
@app.route('/grole/api/v0.1/roles/privileges/<int:role_id>/<int:priv_id>', methods=['PUT'])
def add_priv_to_role(role_id, priv_id):
    role = session.query(Role).filter(Role.id == role_id).first()
    if role is None:
        abort(404)
    priv = session.query(Privilege).filter(Privilege.id == priv_id).first()
    if priv is None:
        abort(404)
    if role.access_list is None:
        role.access_list = Access_List()

    priv.access_list = role.access_list
    session.commit()
    return (jsonify({"priv_added_to_role": {"role_updated": role_id, "priv_added": priv.id}}))


## ACCESS_LIST


## PRIVILEGE

# get all privileges
@app.route('/grole/api/v0.1/privileges', methods=['GET'])
def get_privs():
    all_privs = session.query(Privilege).all()
    return(jsonify({"all_privileges": [{"id": p.id, "name": p.name, "description": p.description, "href": url_for('get_priv_by_id', priv_id = p.id)} for p in all_privs]}))


# get a privilege by id
@app.route('/grole/api/v0.1/privileges/<int:priv_id>', methods=['GET'])
def get_priv_by_id(priv_id):
    priv = session.query(Privilege).filter(Privilege.id == priv_id).first()
    if priv is None:
        abort(404)
    return(jsonify({"privilege": {"id": priv.id, "name": priv.name, "description": priv.description}}))


# create a new privilege, optionally in a given role's access list
@app.route('/grole/api/v0.1/privileges', methods=['POST'])
def create_priv():
    if not request.json \
       or not 'name' in request.json:
        abort(400)

    new_p = Privilege()
    new_p.name = request.json['name']
    if 'description' in request.json:
        new_p.description = request.json['description']
    if 'limitations' in request.json:
        new_p.limitations = request.json['limitations']
    if 'expiration_date' in request.json:
        new_p.expiration_date = request.json['expiration_date']
    if 'role_id' in request.json:
        role_id = request.json['role_id']
        the_role = session.query(Role).filter(Role.id == role_id).first()
        if the_role is None:
            abort(404)
        new_p.access_list_id = the_role.access_list_id
    try:
        session.add(new_p)
        session.commit()
    except exc.IntegrityError:
        session.rollback()
        abort(500)
    return(jsonify({"privilege_created" : {"id": new_p.id, "name" : new_p.name}}))


       

# update a privilege's state
@app.route('/grole/api/v0.1/privileges/<int:priv_id>', methods=['PUT'])
def update_priv(priv_id):
    pass

# delete a priv by ID
@app.route('/grole/api/v0.1/privileges/<int:priv_id>', methods=['DELETE'])
def delete_priv_by_id(priv_id):
    pass

# FIXME: can only one ROLE have a privilege??
# get role having a privilege by ID
@app.route('/grole/api/v0.1/privileges/roles/<int:priv_id>', methods=['GET'])
def get_roles_for_priv(priv_id):
    priv = session.query(Privilege).filter(Privilege.id == priv_id).first()
    if priv is None:
        abort(404)
    if priv.access_list is None:
        return(jsonify({"role_having_priv": "NONE"}))
    the_role = priv.access_list.role
    return(jsonify({"role_having_priv": {"id" :the_role.id, "name" : the_role.name}}))





            

# RESOURCES

# get all resources
@app.route('/grole/api/v0.1/resources', methods=['GET'])
def get_resources():
    all_resources = session.query(Resource).all()
    return(jsonify({"all_resources": [{"id": a.id, "kind": a.kind, "name": a.name, "site": a.site, "href": url_for('get_resource_by_id', resource_id = a.id)} for a in all_resources]}))


# get an resource by id
@app.route('/grole/api/v0.1/resources/<int:resource_id>', methods=['GET'])
def get_resource_by_id(resource_id):
    resource = session.query(Resource).filter(Resource.id == resource_id).first()
    if resource is None:
        abort(404)
    return(jsonify({"resource": {"id": resource.id, "kind": resource.kind, "name": resource.name, "site" : resource.site}}))


# Get all users with access to a resource by id
@app.route('/grole/api/v0.1/resources/users/<int:resource_id>', methods=['GET'])
def get_users_for_resource(resource_id):
    resource = session.query(Resource).filter(Resource.id == resource_id).first()
    if resource is None:
        abort(404)
    users = []
    a_lists = []
    roles = []
    accounts = []
    privs = resource.privilege
    for p in privs:
        a_lists.append(p.access_list)
    for a in a_lists:
        roles.append(a.role)
    for r in roles:
        accounts.append(r.accounts)
    for acct_list in accounts:
        for a in acct_list:
            users.append(a.users)
    #remove dupes
    users = list(set(users))
    return(jsonify({"users_for_resource": [{"id": u.id, "username": u.username, "href": url_for("get_user_by_id", user_id = u.id)} for u in users]}))




@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not Found'}), 404)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)

@app.errorhandler(500)
def bad_request(error):
    return make_response(jsonify({'error': 'Internal Error'}), 500)


# for dev
def dummy_return(fname):
    return make_response(jsonify({"NOT IMPLEMENTED" : fname}), 404)
    

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=4996)
