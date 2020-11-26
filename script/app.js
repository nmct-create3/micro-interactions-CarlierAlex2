let passwordToggle;
let passwordInput;
let email ={}, password ={}, signInButton;
let ratingList = [];

//---------------------------------------------------------------------------------------------
function handlePasswordSwitcher() {
    passwordToggle = document.querySelector(".js-password-toggle");
    passwordInput = document.querySelector(".js-password-input");
    passwordToggle.addEventListener('change', checkPasswordToggle);
};

const checkPasswordToggle = function(){
    console.log("Change password checked")
    if(passwordToggle.checked == true)
    {
        console.log("Set to text");
        passwordInput.type = 'text';
    }
    else
    {
        console.log("Set to password");
        passwordInput.type = 'password';
    }
};


//---------------------------------------------------------------------------------------------
const getDOMElements = function(){
    console.log("getDOMElements");
    email.input  = document.querySelector(".js-email-input");
    email.error  = document.querySelector(".js-email-error");
    email.field  = document.querySelector(".js-email-field");
    email.label  = document.querySelector(".js-email-label");

    password.input  = document.querySelector(".js-password-input");
    password.error  = document.querySelector(".js-password-error");
    password.field  = document.querySelector(".js-password-field");
    password.label  = document.querySelector(".js-password-label");
    
    signInButton =  document.querySelector(".js-sign-in-button");

    ratingList[0] = document.querySelector(".js-rating1");
    ratingList[1] = document.querySelector(".js-rating2");
    ratingList[2] = document.querySelector(".js-rating3");
    ratingList[3] = document.querySelector(".js-rating4");
    ratingList[4] = document.querySelector(".js-rating5");
};



//---------------------------------------------------------------------------------------------
const enableListeners = function(){
    console.log("enableListeners");
    email.input.addEventListener('blur', function()
    {
        console.log("BLUR event");
        let field = email.field;
        let input = email.input;
        let error = email.error;

        if(isEmpty(input.value))
        {
            addErrors(field, error);
            input.removeEventListener('input', doubleCheckEmail); //to avoid multiple events
            input.addEventListener('input', doubleCheckEmail);
        }
        else if (!isValidEmailAddress(input.value))
        {
            addErrors(field, error, "Invalid email address");
            input.removeEventListener('input', doubleCheckEmail); //to avoid multiple events
            input.addEventListener('input', doubleCheckEmail);
        }
        else
        {
            removeErrors(field, error);
        }
    });

    password.input.addEventListener('blur', function()
    {
        console.log("BLUR event");
        let field = password.field;
        let input = password.input;
        let error = password.error;

        if(isEmpty(input.value))
        {
            addErrors(field, error);
            input.removeEventListener('input', doubleCheckPassword); //to avoid multiple events
            input.addEventListener('input', doubleCheckPassword);
        }
        else if(!isValidPassword(input.value))
        {
            addErrors(field, error, "Invalid password");
            input.removeEventListener('input', doubleCheckPassword); //to avoid multiple events
            input.addEventListener('input', doubleCheckPassword);
        }
        else
        {
            removeErrors(field, error);
        }
    });

    if(signInButton)
    {
        signInButton.addEventListener('click', function(event)
        {
            event.preventDefault();
            if(
                !isEmpty(password.input.value) && isValidPassword(password.input.value)
                &&
                !isEmpty(email.input.value) && isValidEmailAddress(email.input.value)
                )
            {
                console.log("Succeeded to submit form!");
                console.log(`Email: ${email.input.value}`);
                console.log(`Password: ${password.input.value}`);
            }
            else
            {
                console.log("Failed to submit form!");
            }
        });
    }
};



//---------------------------------------------------------------------------------------------
const isValidEmailAddress = function(emailAddress)
{
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function(passwordInput)
{
    return (passwordInput.length > 1);
};

const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
 };



//---------------------------------------------------------------------------------------------
const addErrors = function(formField, errorField, errorMessage = "This field is required"){
    console.log("Add error");
    //console.log(formField);
    formField.classList.add("has-error");
    errorField.innerHTML = errorMessage;
    errorField.style.display = 'block'; //kan via class
 };

 const removeErrors = function(formField, errorField){
    console.log("Remove error");
    //console.log(formField);
    formField.classList.remove("has-error");
    errorField.innerHTML = "";
    errorField.style.display = 'none'; //kan via class
};



//---------------------------------------------------------------------------------------------
const doubleCheckEmail = function(){
    console.log("INPUT EMAIL");
    let field = email.field;
    let input = email.input;
    let error = email.error;
    if(!isEmpty(input.value) && isValidEmailAddress(input.value))
    {
        removeErrors(field, error);
        input.removeEventListener('input', doubleCheckEmail);
    }
    else if(isEmpty(input.value))
    {
        addErrors(field, error);
    }
    else
    {
        addErrors(field, error, "Invalid email address");
    }
};

const doubleCheckPassword = function(){
    console.log("INPUT PASSWORD");
    let field = password.field;
    let input = password.input;
    let error = password.error;
    if(!isEmpty(input.value) && isValidPassword(input.value))
    {
        removeErrors(field, error);
        input.removeEventListener('input', doubleCheckPassword);
    }
    else if(isEmpty(input.value))
    {
        addErrors(field, error);
    }
    else
    {
        addErrors(field, error, "Invalid password");
    }
};



//---------------------------------------------------------------------------------------------
function handleFloatingLabel() {
   email.input.addEventListener('focusout', function(){
    console.log("Email focusout");
    if(isEmpty(email.input.value))
    {
        console.log("Email empty");
        email.label.classList.add("c-label--floating");
    }
    else
    {
        console.log("Email filled");
        email.label.classList.remove("c-label--floating");
    }
   });

   password.input.addEventListener('focusout', function(){
    console.log("Password focusout");
    if(isEmpty(password.input.value))
    {
        console.log("Password empty");
        password.label.classList.add("c-label--floating");
    }
    else
    {
        console.log("Password filled");
        password.label.classList.remove("c-label--floating");
    }
    });
};


//---------------------------------------------------------------------------------------------
const handleRating = function(){
    if(ratingList)
    {
        if(ratingList.length >= 5)
        {
            for(const rating of ratingList)
            {
                rating.addEventListener('change', showRating);
            }
        }
    }
};

const showRating  = function(){
    let value = this.value;
    for(const rating of ratingList)
    {
        if(rating.value < value)
        {
            rating.classList.add('c-rating__input--on');
        }
        else
        {
            rating.classList.remove('c-rating__input--on');
        }
    }
};


//---------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    getDOMElements();
    enableListeners();

    handleFloatingLabel();
    handlePasswordSwitcher();
    handleRating();
});