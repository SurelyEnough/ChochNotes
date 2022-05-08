function hideLayer(id) {
    var e = document.getElementById(id)
    var buttone = document.getElementById(id + "-button")
    e.style.display = 'none'
    buttone.classList.remove("selected")
    buttone.classList.add("unselected")
}

function showLayer(id) {
    var e = document.getElementById(id)
    var buttone = document.getElementById(id + "-button")
    if (e.style.display == 'none')
        e.style.display = 'block'
    buttone.classList.remove("unselected")
    buttone.classList.add("selected")
}