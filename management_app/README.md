# 顧客管理アプリ
現在の顧客を登録と確認することができるアプリ

## DEMO
![demo](https://github.com/prerin/application/blob/main/management_app/img/management_app.gif)

## Feature
新規登録のページから名前を登録することができます。<br>
また、一蘭のページで登録済みの名前を確認することができ、横のゴミ箱のマークから削除することも可能です。

## Usage
フォルダ全体をローカルに持ってきたら、src/main/java/com/example/management_app/ManagementAppApplication.javaからRunを押すことで、起動することができます。<br>
ただ、mysqlserverをローカルで立てる必要があります。

## Configuration
* ManagementAppApplication.java: applicationを起動するためのファイル
* contoroller.java: apiの管理をするファイル
* repository: mysqlを操作するためのファイルを格納するフォルダ
* templates: htmlファイルを格納するフォルダ
* static: css入るを格納するフォルダ
