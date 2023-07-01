# 漫画発売日まとめアプリ
特定の漫画の発売日がまとめてあるアプリ(開発途中)

## DEMO
![demo](https://github.com/prerin/application/blob/main/book_release_info/image/image1.png)
![demo](https://github.com/prerin/application/blob/main/book_release_info/image/image2.png)

## Features
pythonのdjangoを使用して作成した。ファイルを実行することによって、最新の漫画の情報を取得し、サイトを更新することができる。デプロイする場合は一ヶ月に一回などで定期実行にする予定

## Note
pythonのフレームワークであるdjangoを使用しているため、python manage.py runserverでローカルで起動することができる

## Configuration
* data/scraping.py: 特定のサイトから最新の発売情報を取得し、csvに情報を挿入する。
* data/register_sqlite.py: csvにまとめた情報をsqlite3に登録する
* app/templetes: htmlファイルのあるフォルダ
* static/css: それぞれのhtml用のcssファイルのあるフォルダ
