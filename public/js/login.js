$("#submit").click(function(){
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
        // TODO - Find which ones is an error, and decide which error to display
    }
});


function verifyUser(user,errorArray){
    /*
     *  A function to verify the syntax of the user.
     *
     *  inputs:
     *   |  1. user: object to verify
     *   |  2. errorArray: a boolean array of size 2, which act as flags whether the syntax is valid (true) or invalid (false)
     *
     *  outputs:
     *   | 1. Updated errorArray
     *   | 2. true if no flags in errorArray or false if there is at least 1 error in the syntax.
     */

     if (isValidUsername(user.username)) {
         errorArray[0] = true;
     };
     if (isValidPassword(user.password)) {
         errorArray[1] = true;
     };

     if (errorArray[0] && errorArray[1]){
         return true;
     } else {
         return false;
     }

}


function decideNext(data,status){
    if (data == null){
        console.log('bad user');
    }
    if (data.redirect != undefined || data.redirectURL != null) {
        window.location.replace(data.redirectURL);
    }
}
