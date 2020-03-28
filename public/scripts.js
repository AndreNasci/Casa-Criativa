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

function checkFields(event) {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    // Verifica se algum campo está vazio
    const isEmpty = valuesToCheck.find(function(value) {

        const checkIfIsString = typeof event.target[value].value == "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    // Se algum campo do formulário não foi preenchido
    if(isEmpty) {
        event.preventDefault() //impede de enviar o formulário
        
        //envia um alerta para o cliente
        alert("Por favor, preencha todos os campos.")
    }
}