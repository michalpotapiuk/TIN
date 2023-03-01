function validateForm(){
    const userInput = document.getElementById("klient");
    const bookInput = document.getElementById("ksiazka");
    const dataOrderInput = document.getElementById("dataZamowienia");
    const dataShippingInput = document.getElementById("dataWysylki");

    const errorUser = document.getElementById("errorKlient");
    const errorBook = document.getElementById("errorKsiazka");
    const errorDataOrder = document.getElementById("errorDataZamowienia");
    const errorDataShipping = document.getElementById("errorDataWysylki");
    const errorSummary = document.getElementById("errorsSummary");

    resetErrors([userInput, bookInput, dataOrderInput, dataShippingInput], 
                [errorUser, errorBook, errorDataOrder, errorDataShipping], errorSummary)


    let valid = true; 

    if(!checkRequired(userInput.value)){
        valid = false; 
        userInput.classList.add("error-input");
        errorUser.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(bookInput.value)){
        valid = false; 
        userInput.classList.add("error-input");
        errorUser.innerText = "Pole jest wymagane";
    }

    let nowDate = new Date();
        month = ''+ (nowDate.getMonth() + 1),
        day = '' + nowDate.getDay,
        year = nowDate.getFullYear;

    if(month.length < 2){
        month = '0'+ month;
    }
    if(day.length < 2){
        day = '0' + day;
    }

    const newString = [year, month, day].join('-');

    if (!checkRequired(dataOrderInput.value)) {
        valid = false;
        dataOrderInput.classList.add("error-input");
        errorDataOrder.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dataOrderInput.classList.add("error-input");
        errorDataOrder.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dataOrderInput.classList.add("error-input");
        errorDataOrder.innerText = "Data nie może być z przyszłości";
    }

    
    if (!checkRequired(dataShippingInput.value)) {
        valid = false;
        dataShippingInput.classList.add("error-input");
        errorDataShipping.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataOrderInput.value)) {
        valid = false;
        dataOrderInput.classList.add("error-input");
        errorDataShipping.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dataOrderInput.value, nowString)) {
        valid = false;
        dataOrderInput.classList.add("error-input");
        errorDataShipping.innerText = "Data nie może być z przyszłości";
    }

    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy"
    }

    return valid;
}