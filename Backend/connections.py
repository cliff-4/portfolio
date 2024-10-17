from fastapi import FastAPI, HTTPException, Path
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

sample_data = {
    1: {"name": "Alice", "age": 25, "roll_number": 101},
    2: {"name": "Bob", "age": 22, "roll_number": 102},
    3: {"name": "Charlie", "age": 23, "roll_number": 103},
    4: {"name": "David", "age": 24, "roll_number": 104},
    5: {"name": "Eve", "age": 21, "roll_number": 105},
}


class Student(BaseModel):
    name: str
    age: int
    roll_number: int


@app.get("/")
def index():
    return {"about": "blank"}


@app.get("/student/{id}")
def get_student(
    id: int = Path(
        description="The ID of the student you need",
        ge=min(*sample_data.keys()),
        le=max(*sample_data.keys()),
    )
):
    return sample_data[id]


@app.get("/get-by-name/{id}")
def get_student(id: Optional[int] = 0, name: Optional[str] = None):
    if id in sample_data:
        return sample_data[id]
    for id in sample_data:
        if sample_data[id]["name"] == name:
            return sample_data[id]
    raise HTTPException(404, "Student not found")


@app.post("/create-student/{id}")
def create_student(id: int, student: Student):
    if id in sample_data:
        raise HTTPException(409, "Student already exists")
    sample_data[id] = student.model_dump()
    return sample_data[id]
