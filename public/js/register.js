document.getElementById("submit").onclick = function(){
    var user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        bday: document.getElementById("bday").value,
        email: document.getElementById("email").value,
    }
    document.getElementById("registrationForm").submit();
}


function validateInformation(user,errorArray){

    if (isValidUsername(user.username)) errorArray[0] = true;
    if (isValidPassword(user.password)) errorArray[1] = true;
    if (isValidName(user.fname)) errorArray[2] = true;
    if (isValidName(user.lname)) errorArray[3] = true;
    if (isValidBday(user.bday)) errorArray[4] = true;
    if (isValidEmail(user.email)) errorArray[5] = true;

    return checkForErrors(errorArray);
}

function checkForErrors(errorArray){

    for (boolean of errorArray){
        if (boolean == true) return -1;
    }
    return 0;
}
