from fastapi import FastAPI, HTTPException, Path

# from typing import Optional, List, Tuple
# from enum import Enum
# from pydantic import BaseModel

import psycopg2
import os
from dotenv import load_dotenv

# import datetime

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    port=os.getenv("DB_PORT"),
)
curr = conn.cursor()


# class Project(BaseModel):
#     id: int
#     title: str
#     short_desc: str
#     long_desc: str
#     last_edited: datetime.date


app = FastAPI()


@app.get("/")
def index():
    return {"about": "blank"}


@app.get("/project/{id}")
def get_project(id: int):
    curr.execute(
        "SELECT * FROM projects WHERE project_id=%s;",
        (id,),
    )
    res = curr.fetchone()
    return res


@app.get("/projects/")
def get_all_projects():
    curr.execute("SELECT * FROM projects")
    return curr.fetchall()
