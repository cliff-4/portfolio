import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from dotenv import load_dotenv
import logging
import datetime

from typing import Optional  # , List, Tuple

# from enum import Enum
from pydantic import BaseModel

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
    allow_origins=["http://localhost:5173"],  # Adjust frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Project(BaseModel):
    id: int
    title: str
    short: str
    long: str
    last_update: datetime.date
    image_paths: list[str]


class About(BaseModel):
    about: str
    image: str


def ProjectMapper(rawTuple: tuple) -> Project:
    item = Project(
        id=rawTuple[0],
        title=rawTuple[1],
        short=rawTuple[2] if rawTuple[2] is not None else "Default Short Description",
        long=rawTuple[3] if rawTuple[3] is not None else "Default Long Description",
        last_update=rawTuple[4],
        image_paths=rawTuple[5] if rawTuple[5] is not None else [],
    )
    return item


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
def get_all_projects() -> list[Project]:
    try:
        curr.execute("SELECT * FROM projects")
        res = curr.fetchall()
        res = [ProjectMapper(x) for x in res]
        res.sort(key=lambda x: x.id)
        return res
    except Exception as e:
        logger.error(e)
        return []


@app.get("/contact")
def get_contact():
    try:
        curr.execute("SELECT data FROM details WHERE attribute = 'contact'")
        res = curr.fetchone()[0]
        return res
    except Exception as e:
        logger.error(e)
        return {}


@app.get("/about")
async def get_about() -> About:
    try:
        curr.execute("SELECT data FROM details WHERE attribute = 'homepage'")
        res = curr.fetchone()[0]
        res = About(about=res["about"], image=res["image"])
        return res
    except Exception as e:
        logger.warning(
            f"Encountered an Error while fetching about information. Error: {e}"
        )
        return ""
