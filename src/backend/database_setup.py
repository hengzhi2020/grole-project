from os import getenv
# for configuration and class code
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
# for configuration
from sqlalchemy import create_engine


# creates a create_engine instance at the bottom of the file
db_uri = getenv('DB_URI', 'sqlite:///GROLE_data.db')
connect_args = {}
if db_uri.startswith('sqlite'):
    connect_args['check_same_thread'] = False
engine = create_engine(db_uri, connect_args=connect_args)
session_factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Session = scoped_session(session_factory)

# create declarative_base instance
Base = declarative_base()
Base.query = Session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import models
    Base.metadata.create_all(bind=engine)

