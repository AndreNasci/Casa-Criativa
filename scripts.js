// tudo em js são objetos

function onOff() {
    document
        .querySelector("#modal") //seleciona um elemento
        .classList
        .toggle("hide") //javascript consegue modificar o html em tempo real

    //desabilita o scroll do modal
    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}