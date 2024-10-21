import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from dotenv import load_dotenv
import logging

# from typing import Optional, List, Tuple
# from enum import Enum
# from pydantic import BaseModel
# import datetime

logger = logging.getLogger("uvicorn.error")
load_dotenv()

try:
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        port=os.getenv("DB_PORT"),
    )
    curr = conn.cursor()
except Exception as e:
    logger.error(
        f"Cound not connect to {os.getenv('DB_HOST')}. Received the following error: {str(e).strip()}"
    )
    curr = None

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://172.19.0.1:5173"],  # Adjust frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return "fuck off :)"


@app.get("/project/{id}")
def get_project(id: int):
    curr.execute(
        "SELECT * FROM projects WHERE project_id=%s;",
        (id,),
    )
    res = curr.fetchone()
    return res


@app.get("/projects")
def get_all_projects():
    curr.execute("SELECT * FROM projects")
    return curr.fetchall()


@app.get("/contact")
def get_contact():
    curr.execute("SELECT data FROM details WHERE attribute = 'contact'")
    return curr.fetchone()[0]


@app.get("/about")
async def get_about():
    if curr:
        curr.execute("SELECT data FROM details WHERE attribute = 'homepage'")
        return curr.fetchone()[0]
    else:
        logger.warning(
            f"Cound not connect to {os.getenv('DB_HOST')}. Using default data"
        )
        return {}
