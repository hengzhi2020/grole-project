## model file using flask & sqlalchemy (not flask_sqlalchemy)
from enum import IntEnum, unique
from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.types import Date
from sqlalchemy.orm import relationship

from database_setup import Base, engine




class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True) #autoincrement by default
    username = Column(String(40), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=True)
    affiliation = Column(String(45), nullable=True)
    #creation_date = Column(DateTime, unique=False, nullable=False)
    creation_date = Column(DateTime, unique=False, nullable=False, default=datetime.utcnow)
    type = Column(String(45), nullable=True)
    accounts = relationship("Account", back_populates='users')

    def __str__(self):
        return str(self.id) +": " + self.username 
        
    def __repr__(self):
        return str(self.id) + ": " + self.username + "/" + self.type

class Account(Base):
    __tablename__ = 'account'
    id = Column(Integer, primary_key=True) #autoincrement by default
    va_nt_account = Column(String(12), unique=True, nullable=False) #possibly primarykey
    type = Column(String(45), nullable=True)
    uid = Column(String(20), nullable=True)
    #creation_date = Column(DateTime, unique=False, nullable=False)
    creation_date = Column(DateTime, unique=False, nullable=False, default=datetime.utcnow)
    updated_date = Column(DateTime, unique=False, nullable=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    users = relationship("User", back_populates='accounts')
    roles = relationship("Role", secondary='account_role_association', back_populates="accounts")
    
    def __str__(self):
        return str(self.id) + ": " + self.type + ":  " +  self.uid + " (" + self.va_nt_account + ")"
    
    def __repr__(self):
        return "(" + str(self.id) + ": " + self.va_nt_account + "/" + self.type + "/" + self.uid + ")"

class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(400), unique=False, nullable=True)
    accounts = relationship("Account", secondary='account_role_association', back_populates="roles")
    # move to AccessList?
    access_list_id = Column(Integer, ForeignKey('access_list.id'))
    access_list = relationship("Access_List", back_populates='role', uselist = False) #one-to-one

    def __str__(self):
        return str(self.id) + " " + self.name

    def __repr__(self):
        return "(" + str(self.id) + ":" + self.name + ")"

# Association table for many-to-many accounts/roles:
account_role_association = Table('account_role_association', Base.metadata,
                         Column('account_id', Integer, ForeignKey('account.id')),
                         Column('role_id', Integer, ForeignKey('role.id'))
)



class Access_List(Base):
    __tablename__ = 'access_list'
    id = Column(Integer, primary_key=True)
    role = relationship("Role", back_populates='access_list', uselist=False)
    #role_id = Column(Integer, ForeignKey(roles.id'))
    #privileges
    privilege = relationship("Privilege", back_populates='access_list')
    
    def __str__(self):
        return "access_list: " + str(self.id)
    
    def __repr__(self):
        return "(" + str(self.id) + ")"


class Privilege(Base):
    __tablename__ = 'privilege'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(400), unique=False, nullable=True)
    limitations = Column(String(400), unique=False, nullable=True)
    #creation_date = Column(DateTime, unique=False, nullable=False)
    creation_date = Column(DateTime, unique=False, nullable=False, default=datetime.utcnow)
    updated_date = Column(DateTime, unique=False, nullable=True)
    expiration_date = Column(DateTime, unique=False, nullable=True)
    access_list_id = Column(Integer, ForeignKey('access_list.id'))
    access_list = relationship("Access_List", back_populates='privilege')
    resource_id = Column(Integer, ForeignKey('resource.id'))
    resource = relationship("Resource", back_populates='privilege')
    def __str__(self):
        return str(self.id) + " " + self.name

    def __repr__(self):
        return "(" + str(self.id) + "/" + self.name + "/" + self.description + "/" + self.limitations +")"


@unique
class Resource_Kind(IntEnum):
    STORAGE = 1
    COMPUTE = 2
    DATA = 3
    SOFTWARE = 4



class Resource(Base):
    ''' represent a managed asset to which privileges apply '''
    __tablename__ = 'resource'
    id = Column(Integer, primary_key=True)
    kind = Column(Integer, unique=False, nullable=False)
    name = Column(String(50), unique=True, nullable=False)
    site = Column(String(3), unique=False, nullable=True)
    description = Column(String(200), unique=False, nullable=False)
    #creation_date = Column(DateTime, unique=False, nullable=False)
    creation_date = Column(DateTime, unique=False, nullable=False, default=datetime.utcnow)
    acquired_date = Column(DateTime, unique=False, nullable=True)
    updated_date = Column(DateTime, unique=False, nullable=True)
    #privilege_id = Column(Integer, ForeignKey('privilege.id'))
    privilege = relationship("Privilege", back_populates='resource')

    def __str__(self):
        return str(self.id) + " " + self.name + " " + str(self.kind) + " " + self.site

    def __repr__(self):
        return "(" + str(self.id) + "/" + self.name + "/" + str(self.kind) + "/" + self.site + ")"




Base.metadata.create_all(engine)
