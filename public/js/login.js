$("#submit").click(function(){
    $("#username").removeClass("badInformation");
    $("#password").removeClass("badInformation");
    var user = {
        username: $("#username").val(),
        password: $("#password").val()
    }

    var errorArray = [false,false];
    if(verifyUser(user,errorArray)){
        $.ajax({
            url: "/users/login",
            method: "post",
            data: user,
            success: decideNext
        });
    } else {
        var body = `You have entered invalid information. Please try again.`;
        $("#errorcontainer").html(body);
        $("#username").addClass("badInformation");
        $("#password").addClass("badInformation");
    }
});


function verifyUser(user){
    /*
     *  A function to verify the syntax of the user.
     *
     *  inputs:
     *   |  1. user: object to verify
     *
     *  outputs:
     *   |  1. true if the user has valid entries or false if there is at least 1 error in the syntax.
     */
     if ( !isValidUsername(user.username) || !isValidPassword(user.password)) {
         return false;
     } else {
         return true;
     }
}


function decideNext(data,status){
    if (data == null){
        var body = `You have entered invalid information. Please try again, or register <a href="./register.html"> here </a>`;
        $("#errorcontainer").html(body);
    }
    if (data.redirect != undefined || data.redirectURL != null) {
        window.location.replace(data.redirectURL);
    }
}
