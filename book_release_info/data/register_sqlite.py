import pandas as pd
import sqlite3

dbname = "data/comics.db"
df = pd.read_csv("data/comic_list.csv", header=0)
df = df.drop(df.columns[[0]], axis=1)

array_dict = {}
array_dict["jamp_array"] = pd.read_pickle("data/info/jamp_array.pkl")
array_dict["magazine_array"] = pd.read_pickle("data/info/magazine_array.pkl")
array_dict["sunday_array"] = pd.read_pickle("data/info/sunday_array.pkl")

conn = sqlite3.connect(dbname)
cur = conn.cursor()

cur.execute("DROP TABLE comics")
cur.execute(
    'CREATE TABLE comics(id INT PRIMARY KEY, title STRING, version INTEGER, date STRING, published STRING, e_published STRING)'
)

id = 0
for i, row in df.iterrows():
    title = row["title"]
    version = row["version"]
    date = row["publish_date"]
    published = row["published"]
    e_published = row["e_published"]
    if title.replace(" ", "") not in array_dict[f"{e_published}_array"]:
        continue
    p = [id, title, version, date, published, e_published]
    id += 1
    cur.execute(f'INSERT INTO comics values(?,?,?,?,?,?)', p)

conn.commit()

cur.execute('select * from comics')
for row in cur:
    print(row)

conn.close()