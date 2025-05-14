from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine


from sqlalchemy.engine import Engine
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, Session  # You need to add this import

# Load environment variables from a .env file into the application
# This allows you to keep sensitive information like database credentials outside your code
load_dotenv()

# Get the database connection URL from environment variables
# If not found, fallback to a local SQLite database
# The format follows: dialect+driver://username:password@host:port/database
sqlite_file_name = "app.db"
DATABASE_URL = f"sqlite:///{sqlite_file_name}"

#Using check_same_thread=False allows FastAPI to use the same SQLite database
#  in different threads. This is necessary as one single request could use more than one thread (for example in dependencies).
connect_args={"check_same_thread": False}  # SQLite specific argument


# Create a SQLAlchemy engine - this is the core interface to the database
# The engine handles the connection pool and is the entry point for SQL execution
engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=True)
# echo=True: Log all SQL statements to the console for debugging

def create_db_and_tables():
    """Create the database and tables if they don't exist yet."""
    # Create all tables in the database using the SQLModel metadata
    # This will create the tables defined in your models if they don't already exist
    SQLModel.metadata.drop_all(engine)  # Drop all tables (for development/testing purposes)
    SQLModel.metadata.create_all(engine)
    print("Creating database tables...")


# Create a session factory - sessions are used to interact with the database
# - autocommit=False: Changes won't be committed unless explicitly called
# - autoflush=False: Changes won't be flushed to the database until commit
# - bind=engine: Associate this session with our database engine
#SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for all models (tables)
# Models that inherit from this Base will be automatically mapped to database tables
# Base = declarative_base()
# Base.metadata.create_all(bind=engine)  # Create all tables in the database


# A typical function to get a database session (to be used in FastAPI dependency):
def get_session():
    # db = SessionLocal()
    # try:
    #     yield db  # This makes it compatible with FastAPI dependency injection
    # finally:
    #     db.close()  # Always close the session when done
    with Session(engine) as session:
        yield session

SessionDep= Annotated[Session, Depends(get_session)]  # Type hint for FastAPI dependency injection