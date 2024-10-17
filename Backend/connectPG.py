import psycopg2  # type: ignore
from dotenv import load_dotenv
import os

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    port=os.getenv("DB_PORT"),
)

curr = conn.cursor()

curr.execute(
    """
CREATE TABLE IF NOT EXISTS person (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    gender CHAR
);
"""
)

# curr.execute(
#     """
# INSERT INTO person (id, name, age, gender) VALUES
# (5, 'Luv Singh', 23, 'm'),
# (6, 'Samarth Singh', 21, 'm'),
# (7, 'Aditya Mishra', 24, 'm'),
# (8, 'Shayna Jonathan', 22, 'f');
# """
# )

curr.execute("""SELECT * FROM person WHERE age >= 32;""")

sql = curr.mogrify(
    """
SELECT * FROM person WHERE starts_with(name, %s) AND age > %s;
""",
    ("S", 20),
)

print(sql)
curr.execute(sql)
print(curr.fetchall())

curr.execute("""SELECT * FROM person where id = 8""")
print(curr.fetchall())

conn.commit()

curr.close()
conn.close()
