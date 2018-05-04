function isValidUsername(username){
    /*
     *  input - username (String) - the username of the user
     *  output - Boolean (true if username is valid)
     *
     */
    var exp = new RegExp(/^[A-Za-z0-9]+[A-Za-z0-9_]*[A-Za-z0-9]+$/g);
    var username = username.trim();
    return (exp.test(username) && username.length >= 3 && username.length <= 15);
}

function isValidPassword(password){
    /*
     *  input - password (String) - the password of the user
     *  output - Boolean (true if password is valid)
     *
     */
    var exp = new RegExp(/(\d*[A-Za-z]+\d+[A-Za-z0-9]*|\d+[A-Za-z]+[A-Za-z0-9]*)/g);
    return (exp.test(password) && password.length >= 7);
}

function isValidName(name){
    /*
     *  input - name (String) - the first or last name of the user
     *  output - Boolean (true if name is valid)
     *
     */
    var exp = new RegExp(/^[A-Za-z ]*([A-Za-z ]+)+$/g)
    return exp.test(name) && name.length <= 15 && name.length >= 2;
}

function isValidBday(date){
    /*
     *  input - date (Date() Object) - the birth date of the user
     *  output - Boolean (true if birthdate is valid)
     *
     */

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
    /*
     *  input - email (String) - the email of the user
     *  output - Boolean (true if email is valid)
     *
     */

    // From emailregex.com - derived from IETF's RFC5322
    var exp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return exp.test(email);

}

function isEmptyObject(user){
    /*
     * input - user (Object)
     * output - Boolean (true if the user object is empty)
     *
     */

     if (Object.keys(user).length <= 0) {
         return true;
     }
     return false;
}

module.exports = function(user){
    /*
     *  validateUser(user) - Checks if the user follows valid syntax (same syntax as client side)
     *
     */

    if (user == null) { return false; }

    if (isEmptyObject(user)) {
        return false; }

    if ( isValidUsername(user.username) && isValidPassword(user.password) &&
     isValidName(user.fname) && isValidName(user.lname) && isValidBday(user.bday) && isValidEmail(user.email)){
         return true;
    } else {
        return false;
    }
}
