# 疑似trello
todo表を管理するので有名なアプリであるtrelloを再現したアプリ

## DEMO
![demo](https://github.com/prerin/application/blob/main/trello/img/trello.gif)

## Features
従来のtrelloと同様にboardingを追加したり、それぞれのboardingにtodoリストや作業中リストにやることを追加することができます。

## Usage
nodemon app.jsでローカルに起動することができます。<br>
ただ、本実装ではローカルのmongodbを使って実装しているため、起動する前にmongodbの準備もする必要があります。

## Note
pathが /homeとなっているため、起動した後のurlはhttp://localhost:3000/home/とする必要があります。

## File Configuration
* app.js:  実行用ファイル
* model:  mongodb用のデータの宣言を格納するフォルダ
* view:  ejsファイルを格納するフォルダ
* public:  ejsを動かすためのjavascriptやcssを格納するファイル