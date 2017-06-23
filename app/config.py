from sqlalchemy import create_engine
import os
import sys
from sqlalchemy.orm import sessionmaker

# Session = sessionmaker()

class DBconn:
    def __init__(self):
        #engine = create_engine("postgresql://$OPENSHIFT_POSTGRESQL_DB_HOST:$OPENSHIFT_POSTGRESQL_DB_PORT", echo=False)
        engine = create_engine("postgresql://postgres:password@localhost:5432/gadget_rental", echo=False)
        # session = sessionmaker(bind=engine)
        self.conn = engine.connect()
        self.trans = self.conn.begin()
        # self.session = Session(bind=self.conn)

    def getcursor(self):
        cursor = self.conn.connection.cursor()
        return cursor

    def dbcommit(self):
        self.trans.commit()
        # self.session.commit()
