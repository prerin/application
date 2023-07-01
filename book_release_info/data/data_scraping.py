import requests
from requests_html import HTMLSession
from bs4 import BeautifulSoup
import pandas as pd
import pickle

def get_jamp():
    url = "https://www.shonenjump.com/j/rensai/"
    res = requests.get(url)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)

    comicsList = soup.find('section', attrs={"class": "serialSeries"})
    li_elems = comicsList.find_all("li")

    article_list = []
    for li in li_elems:
        div_elems = li.find("div")
        text = div_elems.text
        text_split = text.split("』")
        title = text_split[0][1:]
        article_list.append(title).replace(" ", "")
    
    with open("data/info/jamp_array.pkl", "wb") as f:
        pickle.dump(article_list, f)

def get_magazine():
    url = "https://shonenmagazine.com/series/smaga"
    session = HTMLSession()
    r = session.get(url)

    article_list = []
    title_elems = r.html.find("h4.series-title")
    for title in title_elems:
        article_list.append(title.text.replace(" ", ""))
    
    with open("data/info/magazine_array.pkl", "wb") as f:
        pickle.dump(article_list, f)

def get_sunday():
    url = "https://websunday.net/"
    res = requests.get(url)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)

    ul_elem = soup.find("ul", attrs={"class": "pkg"})
    a_elems = ul_elem.find_all("a")

    article_list = []
    for a in a_elems:
        author = a.find("em").text.strip()
        author_len = len(author)
        text = a.text.strip()
        text_split = text.split(" ")
        title = ""
        for sp in text_split:
            if not sp:
                break
            title = f"{title}{sp}"
        article_list.append(title)

    with open("data/info/sunday_array.pkl", "wb") as f:
        pickle.dump(article_list, f)

if __name__ == "__main__":
    # get_jamp()
    # get_magazine()
    get_sunday()
    array = pd.read_pickle("data/info/sunday_array.pkl")
    print(array)