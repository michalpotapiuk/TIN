function validateForm(){
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput  = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("adres");
    const numberInput = document.getElementById("phone")

    const errorFirstName = document.getElementById("errorFirstName");
    const errorLastName = document.getElementById("errorLastName");
    const errorEmail = document.getElementById("errorEmail");
    const errorAdres = document.getElementById("errorEmail");
    const errorPhone = document.getElementById("errorAdres");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([firstNameInput, lastNameInput, emailInput, addressInput, numberInput],
         [errorFirstName, errorLastName, errorEmail, errorAdres, errorPhone], errorsSummary)

    let valid = true;
    if(!checkRequired(firstNameInput.value)){
        valid = false
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    
    }else if(!checkTextLengthRange(firstNameInput.value, 2 , 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        valid = false
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    
    }else if(!checkTextLengthRange(lastNameInput.value, 2 , 50)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }


    if(!checkRequired(emailInput.value)){
        valid = false
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    }else if(!checkTextLengthRange(emailInput.value, 2 , 50)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }else if (!checkEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if(!checkRequired(addressInput.value)){
        valid = false
        addressInput.classList.add("error-input");
        errorAdres.innerText = "Pole jest wymagane";
    
    }else if(!checkTextLengthRange(adresInput.value, 2 , 50)) {
        valid = false;
        addressInput.classList.add("error-input");
        errorAdres.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if(!checkRequired(numberInput.value)){
        valid = false
        numberInput.classList.add("error-input");
        errorPhone.innerText = "Pole jest wymagane";
    
    }else if(!checkTextLengthRange(numberInput.value, 9,9)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorPhone.innerText = "Pole powinno zawierać 9 znaków";
    }else if(!checkNumber(numberInput.value)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorPhone.innerText = "Pole powinno zawierać liczby";
    }


    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}