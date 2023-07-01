import sqlite3

dbname = "data/comics.db"

def all_items():
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute('select * from comics')

    comic_list = []
    for row in cur:
        id = row[0]
        title = row[1]
        version = row[2]
        date = row[3]
        published = row[4]
        comic_info = {"id": id, "title":title, "version":version, "date":date, "published": published}
        comic_list.append(comic_info)

    conn.close()

    return comic_list

def get_items_by_id(comic_id):
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute(f'select * from comics where id="{comic_id}"')

    comic_list = []
    for row in cur:
        title = row[1]
        version = row[2]
        date = row[3]
        comic_info = {"title":title, "version":version, "date":date}
        comic_list.append(comic_info)

    conn.close()

    return comic_list[0]