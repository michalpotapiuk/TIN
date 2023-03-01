function validateForm(){
    const titleInput = document.getElementById("tytul");
    const priceInput  = document.getElementById("cena");
    const publishInput = document.getElementById("wydawnictwo");
    const authorInput = document.getElementById("autor"); //klucz obcy

    const errorTitle = document.getElementById("errorTytul");
    const errorPrice = document.getElementById("errorCena");
    const errorPublish = document.getElementById("errorWydawnictwo");
    const errorAuthor = document.getElementById("errorAutor");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([titleInput, priceInput, publishInput, authorInput],
     [errorTitle, errorPrice, errorPublish, errorAuthor], errorsSummary)

    let valid = true; 

    if(!checkRequired(titleInput.value)){
        valid = false
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole jest wymagane";
    }else if(!checkTextLengthRange(titleInput.value, 2 , 50)) {
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if(!checkRequired(priceInput.value)){
        valid = false
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    }else if(!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno zawierać liczby";
    }

    if(!checkRequired(publishInput.value)){
        valid = false
        publishInput.classList.add("error-input");
        errorp.innerText = "Pole jest wymagane";
    }else if(!checkTextLengthRange(publishInput.value, 2 , 50)) {
        valid = false;
        publishInput.classList.add("error-input");
        errorPublish.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}