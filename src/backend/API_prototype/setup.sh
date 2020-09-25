flask shell << EOF
from app import *
from models import *

for u in session.query(User_g).all():
    session.delete(u)

session.commit()


nu = User_g()
nu.username = "DJL1"
nu.email = "d1@somewhere.com"
#nu.va_nt_account = "vhabhsdjl1"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "regular"

session.add(nu)

nu = User_g()
nu.username = "DJL2"
nu.email = "d2@somewhere.com"
#nu.va_nt_account = "vhabhsdjl2"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "regular"

session.add(nu)

nu = User_g()
nu.username = "DJL3"
nu.email = "d3@somewhere.com"
#nu.va_nt_account = "vhabhsdjl3"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "regular"

session.add(nu)

nu = User_g()
nu.username = "DJL4"
nu.email = "d4@somewhere.com"
#nu.va_nt_account = "vhabhsdjl4"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "regular"

session.add(nu)

nu = User_g()
nu.username = "DJL5"
nu.email = "d5@somewhere.com"
#nu.va_nt_account = "vhabhsdjl5"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "regular"

session.add(nu)

nu = User_g()
nu.username = "DJL6"
nu.email = "d6@somewhere.com"
#nu.va_nt_account = "vhabhsdjl6"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "test_user"

session.add(nu)

nu = User_g()
nu.username = "DJL7"
nu.email = "d7@somewhere.com"
#nu.va_nt_account = "vhabhsdjl7"
#nu.creation_date = datetime(2020, 8,1,0,0,0)
nu.type = "test_user"

session.add(nu)

session.commit()


for a in session.query(Account_g).all():
    session.delete(a)

session.commit()

na = Account_g()
na.type = "windows"
na.va_nt_account = "vhabhsdjl1"
na.uid = "00000-000-00000001"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 1

session.add(na)

na = Account_g()
na.type = "linux"
na.va_nt_account = "vhabhsdjl2"
na.uid = "00000-000-00000002"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 2

session.add(na)

na = Account_g()
na.type = "genisis"
na.va_nt_account = "vhabhsdjl3"
na.uid = "00000-000-00000003"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 2

session.add(na)


na = Account_g()
na.type = "genisis"
na.va_nt_account = "vhabhsdjl4"
na.uid = "00000-000-00000004"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 4

session.add(na)

na = Account_g()
na.type = "linux"
na.va_nt_account = "vhabhsdjl5"
na.uid = "00000-000-00000005"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 3

session.add(na)

na = Account_g()
na.type = "linux"
na.va_nt_account = "vhabhsdjl6"
na.uid = "00000-000-00000006"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 6
session.add(na)

na = Account_g()
na.type = "netapp"
na.va_nt_account = "vhabhsdjl7"
na.uid = "00000-000-00000007"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 6
session.add(na)

na = Account_g()
na.type = "HPC"
na.va_nt_account = "vhabhsdjl8"
na.uid = "00000-000-00000008"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 6
session.add(na)

na = Account_g()
na.type = "HPC-limited"
na.va_nt_account = "vhabhsdjl9"
na.uid = "00000-000-00000009"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 7
session.add(na)

na = Account_g()
na.type = "HPC-unlimited"
na.va_nt_account = "vhabhsdjl10"
na.uid = "00000-000-00000010"
#na.creation_date = datetime(2020, 8, 10, 0, 0, 0)
na.updated_date = datetime(2020, 9, 9, 1, 0, 0)
na.user_id = 7
session.add(na)

session.commit()


for r in session.query(Role).all():
    session.delete(r)

session.commit()

nr = Role()
nr.name = "linux admin"
nr.description = "project 1"
nr.accounts = [session.query(Account_g)[1], session.query(Account_g)[4], session.query(Account_g)[5]]
session.add(nr)

nr = Role()
nr.name = "windows admin"
nr.description = "project 2"
nr.accounts = [session.query(Account_g)[0]]
session.add(nr)

nr = Role()
nr.name = "windows net admin"
nr.description = "project 3"
nr.accounts = [session.query(Account_g)[0]]
session.add(nr)

nr = Role()
nr.name = "genisis user"
nr.description = "project 4"
nr.accounts = [session.query(Account_g)[2], session.query(Account_g)[3]]
session.add(nr)

nr = Role()
nr.name = "NetApp admin"
nr.description = "project 5"
nr.accounts = [session.query(Account_g)[6]]
session.add(nr)

nr = Role()
nr.name = "HPC admin"
nr.description = "project 6"
nr.accounts = [session.query(Account_g)[7], session.query(Account_g)[8], session.query(Account_g)[9]]
session.add(nr)

session.commit()



for a in session.query(Access_List).all():
    session.delete(a)

session.commit()

al = Access_List()
al.role = session.query(Role)[0]
session.add(al)

al = Access_List()
al.role = session.query(Role)[1]
session.add(al)

al = Access_List()
al.role = session.query(Role)[2]
session.add(al)

al = Access_List()
al.role = session.query(Role)[3]
session.add(al)

al = Access_List()
al.role = session.query(Role)[4]
session.add(al)

al = Access_List()
al.role = session.query(Role)[5]
session.add(al)

session.commit()



for p in session.query(Privilege).all():
    session.delete(p)

session.commit()

p1 = Privilege()
p1.name = "d001-write"
p1.description = "server 001 file write"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[0]
session.add(p1)


p1 = Privilege()
p1.name = "d010-read"
p1.description = "server 010 file read"
p1.limitations = "non root"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[0]
session.add(p1)

p1 = Privilege()
p1.name = "VM001-admin"
p1.description = "VM 001 administration"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[1]
session.add(p1)

p1 = Privilege()
p1.name = "GL001-admin"
p1.description = "gitlab instance 1 admin"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[2]
session.add(p1)

p1 = Privilege()
p1.name = "GL002-write"
p1.description = "gitlab instance 2 admin"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[2]
session.add(p1)

p1 = Privilege()
p1.name = "NetApp-admin"
p1.description = "NetApp 1 admin"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[4]
session.add(p1)

p1 = Privilege()
p1.name = "NetApp2-admin"
p1.description = "NetApp 2 admin"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[4]
session.add(p1)

p1 = Privilege()
p1.name = "HPC-admin"
p1.description = "cluster 2 admin"
p1.limitations = "none"
#p1.creation_date = datetime(2020, 4,4,4,0,0)
p1.access_list = session.query(Access_List)[5]
session.add(p1)

session.commit()


for a in session.query(Resource).all():
    session.delete(a)

session.commit()


a1 = Resource()
a1.kind = Resource_Kind.COMPUTE
a1.name = "Node_001"
a1.site = "BOS"
a1.description ="HPC head node"
#a1.creation_date = datetime(2020, 8, 8, 7, 0, 0)
a1.acquired_date = datetime(2010, 8, 8, 7, 0, 0)
a1.privilege = [session.query(Privilege)[0], session.query(Privilege)[1]]
session.add(a1)

a1 = Resource()
a1.kind = Resource_Kind.STORAGE
a1.name = "Sto_001"
a1.site = "PTH"
a1.description ="Disk array 1"
#a1.creation_date = datetime(2020, 8, 8, 7, 0, 0)
a1.acquired_date = datetime(2010, 8, 8, 7, 0, 0)
a1.privilege = [session.query(Privilege)[2]]
session.add(a1)

a1 = Resource()
a1.kind = Resource_Kind.STORAGE
a1.name = "Sto_002"
a1.site = "PTH"
a1.description ="Disk array 2"
#a1.creation_date = datetime(2020, 8, 8, 7, 0, 0)
a1.acquired_date = datetime(2010, 8, 8, 7, 0, 0)
a1.privilege = [session.query(Privilege)[4],session.query(Privilege)[5]]
session.add(a1)

a1 = Resource()
a1.kind = Resource_Kind.STORAGE
a1.name = "Sto_003"
a1.site = "PTH"
a1.description ="Disk array 3"
#a1.creation_date = datetime(2020, 8, 8, 7, 0, 0)
a1.acquired_date = datetime(2010, 8, 8, 7, 0, 0)
a1.privilege = [session.query(Privilege)[6],session.query(Privilege)[7]]
session.add(a1)


session.commit()


print ("USERS:")
for u in session.query(User_g).all():
    print (u)

print("ACCOUNTS:")
for a in session.query(Account_g).all():
    print (a)

print("ROLES:")
for r in session.query(Role).all():
    print (r)

print("ACCESS LISTS:")
for al in session.query(Access_List).all():
    print (al)

print("PRIVILEGES:")
for p in session.query(Privilege).all():
    print (p)

print("RESOURCES:")
for a in session.query(Resource).all():
    print (a)

EOF
