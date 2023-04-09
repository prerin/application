let plus_btn = document.querySelectorAll("#plus_btn")
let card_form = document.querySelectorAll("#card_form")
let back_btn = document.querySelectorAll("#back_btn")
let component = document.querySelectorAll("#component")
let index
var pre_index = 0
plus_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        back_form(pre_index)
        index = [].slice.call(plus_btn).indexOf(btn)
        plus_form(index)
        pre_index = index
    })
})

back_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        index = [].slice.call(back_btn).indexOf(btn)
        back_form(index)
    })
})

var plus_form = function(index) {
    plus_btn[index].classList.add("nothing")
    card_form[index].classList.remove("nothing")
    component[index].focus()
}

var back_form = function(index) {
    card_form[index].classList.add("nothing")
    plus_btn[index].classList.remove("nothing")
}