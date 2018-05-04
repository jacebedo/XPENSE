function isValidUsername(username){
    var exp = new RegExp(/^[A-Za-z0-9]+[A-Za-z0-9_]*[A-Za-z0-9]+$/g);
    var username = username.trim();
    return (exp.test(username) && username.length >= 3 && username.length <= 15);
}

function isValidPassword(password){
    var exp = new RegExp(/(\d*[A-Za-z]+\d+[A-Za-z0-9]*|\d+[A-Za-z]+[A-Za-z0-9]*)/g);
    return (exp.test(password) && password.length >= 7);
}

function isValidName(fname){
    var exp = new RegExp(/^[A-Za-z ]*([A-Za-z ]+)+$/g)
    return exp.test(fname) && fname.length <= 15 && fname.length >= 2;
}

function isValidBday(date){

    if (isNaN(Date.parse(date))){
        return false;
    };

    var lowerbound = new Date(50,0,1);
    if ( (lowerbound - date) >= 0) {
        return false;
    }
    var higherbound = new Date();
    if ( (higherbound - date) <= 0){
        return false;
    }
    return true;
}

function isValidEmail(email){

    // From emailregex.com - derived from IETF's RFC5322
    var exp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return exp.test(email);

}
