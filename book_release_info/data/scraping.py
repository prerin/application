import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import pandas as pd
import re

def get_jamp():
    url = "https://www.shonenjump.com/j/comics/next.html"
    res = requests.get(url)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)

    date_elems = soup.select('body > div.wrapper > article > section.serialSeries > h2')
    table_elems = soup.find_all('table')

    info_dict = {}

    for i in range(1):
        string = str(date_elems[i].contents[0])
        date = string[:-8]
        date_str = datetime.strptime(date, "%Y年%m月%d日")
        key = date_str.strftime("%Y.%m.%d")
        info_dict[key] = []
        a_elems = table_elems[i].find_all('a')
        for a in a_elems:
            info_dict[key].append(a.text)

    print(info_dict.keys())

    return info_dict

def get_koudansha(month_str, journal):
    url = "https://kc.kodansha.co.jp/calendar"
    res = requests.get(url)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)

    sec_elem = soup.find("section", attrs={"id": f"{journal}.{month_str}"})
    block_elems = sec_elem.find_all("a", attrs={"class": "block"})

    info_dict = {}

    for block in block_elems:
        date = block.find("div", attrs={"class": "date"})
        date_str = date.text
        title = block.find("div", attrs={"class": "tit"})
        title_str = title.text
        title_str = title_str.replace('（', '【')
        title_str = title_str.replace('）', '】')
        if date_str in info_dict.keys():
            info_dict[date_str].append(title_str)
        else:
            info_dict[date_str] = [title_str]

    print(info_dict.keys())

    return info_dict

def get_sunday(now_date):
    url = "https://websunday.net/comics/"
    res = requests.get(url)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)
    
    elems = soup.find_all("section", attrs={'class': "nextmonth__box"})

    info_dict = {}

    for i in elems:
        date = i.find("span", attrs={"class": "text-st"})
        date_str = f"2023年{date.text[:-3]}"
        date_str = datetime.strptime(date_str, "%Y年%m月%d日")
        key = date_str.strftime("%Y.%m.%d")
        info_dict[key] = []
        li_elems = i.find_all("li", attrs={"class": None})
        for li in li_elems:
            title = li.find("p", attrs={"class": "nextmonth__title"}).text
            version = li.find("p", attrs={"class": "nextmonth__vol"}).text
            if "(" in version:
                sp = version.split("(")
                version = sp[0] 
            info_dict[key].append(f"{title}【{version}】")

    print(info_dict.keys())
    
    return info_dict


def get_chanpion():
    url = "https://www.akitashoten.co.jp/comics/comingsoon/2"
    url2 = "https://www.akitashoten.co.jp/comics/comingsoon/2?page=2"
    res = requests.get(url)
    res2 = requests.get(url2)
    content_type_encoding = res.encoding if res.encoding != 'ISO-8859-1' else None
    soup1 = BeautifulSoup(res.content, "html.parser", from_encoding=content_type_encoding)
    soup2 = BeautifulSoup(res2.content, "html.parser", from_encoding=content_type_encoding)

    info_dict = {}

    for soup in [soup1, soup2]:
        elems = soup.find("div", attrs={"class": "clear"})
        book_elems = elems.find_all("div", attrs={"class": "book"})


        for book in book_elems:
            title = book.find("h2")
            title_str = title.text
            date = book.find("span", attrs={"class": "date"})
            date_str = date.text[4:]
            boys = book.find("span", attrs={"class": "boys"})
            if not boys:
                break
            if date_str in info_dict.keys():
                info_dict[date_str].append(title_str)
            else:
                info_dict[date_str] = [title_str]

    print(info_dict.keys())

    return info_dict

def add_comic(comic_list, title_dict, published,e_published):
    for date, title_list in title_dict.items():
        for title_version in title_list:
            split_title_version = title_version.split("【")
            title = split_title_version[0]
            version = split_title_version[1][:-1]
            comic_list.append({"title": title, "version": version, "publish_date": date, "published": published, "e_published": e_published})

    return comic_list

if __name__ == "__main__":
    now_date = datetime.now()
    date_str = now_date.strftime("%Y/%m/00")
    next_date = now_date + timedelta(days=30)
    month_str = next_date.strftime("%m")
    if month_str[0] == "0":
        month_str = month_str[1]
    
    jamp_dict = get_jamp()
    magazine_dict = get_koudansha(month_str, "shonenmagazine")
    sunday_dict = get_sunday(date_str)

    comic_list = []

    comic_list = add_comic(comic_list, jamp_dict, "ジャンプ", "jamp")
    comic_list = add_comic(comic_list, magazine_dict, "マガジン", "magazine")
    comic_list = add_comic(comic_list, sunday_dict, "サンデー", "sunday")

    df = pd.DataFrame(comic_list)
    df.to_csv('data/comic_list.csv')
