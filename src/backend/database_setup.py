from os import getenv

# for creating the mapper code
from sqlalchemy import Column, ForeignKey, Integer, String

# for configuration and class code
from sqlalchemy.ext.declarative import declarative_base

# for creating foreign key relationship between the tables
from sqlalchemy.orm import relationship

# for configuration
from sqlalchemy import create_engine

# create declarative_base instance
Base = declarative_base()


# creates a create_engine instance at the bottom of the file
db_url = getenv('DB_URL', 'sqlite:///GROLE_data.db')
engine = create_engine(db_url)
Base.metadata.bind = engine 
#Base.metadata.create_all(engine)
