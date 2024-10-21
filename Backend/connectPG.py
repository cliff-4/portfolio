import psycopg2
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

# curr.execute(
#     """
# DROP TABLE projects
# """
# )

# # Creating the Projects table
# curr.execute(
#     """
# CREATE TABLE projects (
#     project_id SERIAL,
#     title VARCHAR(100) NOT NULL,
#     short_desc VARCHAR(200),
#     long_desc VARCHAR(2000),
#     image JSON,
#     last_edited DATE NOT NULL,
#     PRIMARY KEY(project_id)
# )
# """
# )


# curr.execute(
#     """
# INSERT INTO projects (title, last_edited) VALUES
#     ('Bad Apple', DATE '2024-10-21'),
#     ('Cloff', DATE '2024-10-21'),
#     ('Portfolio website', DATE '2024-10-21'),
#     ('Virtual Marketplace', DATE '2024-10-21'),
#     ('Panchayati Raj', DATE '2024-10-21'),
#     ('Tennis game', DATE '2024-10-21'),
#     ('Horn Antenna', DATE '2024-10-21'),
#     ('TriGrapher', DATE '2024-10-21'),
#     ('Resolv', DATE '2024-10-21'),
#     ('TIFR', DATE '2024-10-21'),
#     ('BTP-1', DATE '2024-10-21'),
#     ('CDSR Mini project', DATE '2024-10-21'),
#     ('ChainMyName', DATE '2024-10-21'),
#     ('ClaMedR', DATE '2024-10-21')

# """
# )

# curr.execute("""SELECT * FROM projects WHERE project_id=1;""")

# sql = curr.mogrify(
#     """SELECT * FROM person WHERE starts_with(name, %s) AND age > %s;""",
#     ("S", 20),
# )

# print(sql)
# curr.execute(sql)
# print(curr.fetchall())

# curr.execute("""SELECT * FROM person where id = 8""")

# curr.execute("ALTER TABLE projects DROP COLUMN image")

curr.execute("ALTER TABLE projects ADD image_paths text[]")


# for row in curr.fetchall():
#     print(row)

conn.commit()

curr.close()
conn.close()
