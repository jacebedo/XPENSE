$("#submit").click(function(){

    var user = {
        username: $("#username").val(),
        password: $("#password").val(),
        fname: $("#fname").val(),
        lname: $("#lname").val(),
        bday: $("#bday").val(),
        email: $("#email").val(),
    }
    var errorArray = [0,0,0,0,0,0];
    if (validateInformation(user,errorArray) === 0){

        $.ajax({
            url: "/users/register",
            method: "POST",
            data: user,
            success: decideNext
        })
    } else {

        // Make the boxes with wrong information glow
        var idArray = ["#username","#password","#fname","#lname","#bday","#email"];
        for (i in errorArray){
            if (!errorArray[i]) {
                $(`${idArray[i]}`).addClass("badInformation");
            }
            else if(errorArray[i] && $(`${idArray[i]}`).hasClass("badInformation")) {
                $(`${idArray[i]}`).removeClass("badInformation");
            }
        }

        var body = "";
        body = generateErrorBody(errorArray);
        $("#errorfixes").empty();
        $("#errorfixes").html(body);
        $("#modal-content").text("You have entered invalid information. Please try again.");
        $("#modal").modal({
            fadeDuration: 500,
            fadeDelay: 0.25
        });
    }


});


function validateInformation(user,errorArray){

    if (isValidUsername(user.username)) errorArray[0] = true;
    if (isValidPassword(user.password)) errorArray[1] = true;
    if (isValidName(user.fname)) errorArray[2] = true;
    if (isValidName(user.lname)) errorArray[3] = true;
    if (isValidBday(user.bday)) errorArray[4] = true;
    if (isValidEmail(user.email)) errorArray[5] = true;

    return checkForErrors(errorArray);
}

function generateErrorBody(errorArray){
    var body = "";
    if (!errorArray[0]) {
        body += `<li> Username: 3-15 characters, belonging in the alphanumeric set, or the underscore character. </li>`;
    }
    if (!errorArray[1]) {
        body += `<li> Password: At least 7 characters, belonging in the alphanumeric set, with at least 1 letter and 1 number. </li>`;
    }

    if(!errorArray[2] || !errorArray[3]) {
        body += `<li> First/Last Name: 2-15 characters, alphabetic characters only. </li>`;
    }

    if(!errorArray[4]) {
        body += `<li> Any valid date in the YYYY-MM-DD format, that is after 1950-01-01 and before the current date. </li>`;
    }

    if(!errorArray[5]) {
        body += `Any valid e-mail. Please check any e-mail service providers for more details.`;
    }

    return body;
}

function checkForErrors(errorArray){

    for (boolean of errorArray){
        if (boolean == false) return -1;
    }
    return 0;
}

function decideNext(data,status){
    if (status == 404) {
        $("#modal-content").text("The server has returned an error. Please try again later.");
        $("#modal").modal({
            fadeDuration: 500,
            fadeDelay: 0.25
        });
    } else {
        if (data == null) {
            $("#modal-content").html("Registration Successful! Going back to the login page in <b>3<b>...");
            $("#modal").modal({
                fadeDuration: 500,
                fadeDelay: 0.25
            });
            var timeleft = 4;
            setInterval(function(){
                //update timeleft, update modal, check if it is time to redirect
                timeleft--;
                $("#modal-content").html(`Registration Successful! Going back to the login page in <b>${timeleft}<b>...`);
                if (timeleft == 0){
                    window.location.replace(document.location.origin);
                }
            },1000);
        } else {
            $("#modal-content").text("This user has already registered. Please register with a different username");
            $("#modal").modal({
                fadeDuration: 500,
                fadeDelay: 0.25
            });
        }
    }
}
