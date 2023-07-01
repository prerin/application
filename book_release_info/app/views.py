from django.shortcuts import render
from app.repository.sqlite import all_items, get_items_by_id

def home(request):
    comic_list = all_items()
    ctx = {
        "comic_list": comic_list
    }
    return render(request, 'home/index.html', ctx)

def comic(request, id):
    comic_info = get_items_by_id(id)
    ctx = {
        "comic": comic_info
    }
    return render(request, 'comic/index.html', ctx)