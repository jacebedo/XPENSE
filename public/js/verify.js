function isValidUsername(username){
    /*
     *  Input:username (String) - the username of the user
     *  Output:Boolean (true if username is valid)
     *
     */

     if (username == undefined) return false;

    var exp = new RegExp(/^[A-Za-z0-9]+[A-Za-z0-9_]*[A-Za-z0-9]+$/g);
    var username = username.trim();
    return (exp.test(username) && username.length >= 3 && username.length <= 15);
}

function isValidPassword(password){
    /*
     *  Input:password (String) - the password of the user
     *  Output:Boolean (true if password is valid)
     *
     */

     if (password == undefined) return false;

    var exp = new RegExp(/^\d*[A-Za-z]+\d+[A-Za-z0-9]*$|^\d+[A-Za-z]+[A-Za-z0-9]*$/g);
    return (exp.test(password) && password.length >= 7);
}

function isValidName(name){
    /*
     *  Input:name (String) - the first or last name of the user
     *  Output:Boolean (true if name is valid)
     *
     */
    if (name == undefined) return false;

    var exp = new RegExp(/^[A-Za-z ]*([A-Za-z ]+)+$/g)
    return exp.test(name) && name.length <= 15 && name.length >= 2;
}

function isValidBday(date){
    /*
     *  Input:date (Date() Object) - the birth date of the user
     *  Output:Boolean (true if birthdate is valid)
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
     *  Input:email (String) - the email of the user
     *  Output:Boolean (true if email is valid)
     *
     */

    // From emailregex.com - derived from IETF's RFC5322
    var exp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return exp.test(email);

}

function isValidWalletName(name){
    /*
     *  Input: Name (String) - The name to verify
     *  Output: Boolean - True if the name is valid and false otherwise
     *
     */
     if (name == undefined) return false;

     var exp= new RegExp(/[A-Za-z0-9]+[A-Za-z0-9. ]*/g);
     return exp.test(name) && name.length >= 3 && name.length <= 15;
}

function isValidWalletType(type){
    retval = false;
    if (type == undefined) return false;

    var validTypes = ["one-time","daily","weekly","monthly"];
    validTypes.forEach(function(t){
        if (type === t) retval = true;
    });
    return retval;
}

function isValidWalletBalance(balance){

    /*
     *  Input: Balance (Float) - The balance to verify
     *  Output: Boolean - True if the balance is valid or false otherwise.
     *
     */

    if (isNaN(parseFloat(balance))) return false;

    var num = parseFloat(balance);
    if (num >= 0) return true;
    else return false;

}

function isValidWalletIncrement(increment,type){

    /*
     *  Input: Balance (Float) - The increment to verify
     *         type (string) - the wallet type to verify.
     *  Output: Boolean - True if the balance is valid or false otherwise.
     *
     */

    if (isNaN(parseFloat(increment))) return false;

    var num = parseFloat(increment);
    if (num == 0 && type == "one-time") return true;
    else if (num == 0 && (type == "daily" || type == "weekly" || type == "monthly")) return false;

    if (num > 0 && type == "one-time") return false;
    else if (num > 0 && (type == "daily" || type == "weekly" || type == "monthly")) return true;

    else return false;

}

function isValidExpenseName(name){
    /*
     *  Input: Name (String) - The name to verify
     *  Output: Boolean - True if the name is valid and false otherwise
     *
     */
     if (name == undefined) return false;

     var exp= new RegExp(/[A-Za-z0-9]+[A-Za-z0-9. ]*/g);
     return exp.test(name) && name.length >= 3 && name.length <= 40;
}

function isValidExpenseType(type){
    /*
     *  Input: type (String) - The type to verify
     *  Output: Boolean - True if the type is valid, and false otherwise.
     *
     *
     */
    var exp = new RegExp(/[A-Za-z]+[A-Za-z ]*/g);
    if (type == undefined) return false;

    return exp.test(type) && type.length >= 3 && type.length <= 15;
}

function isValidExpensePrice(price){

    /*
     *  Input: Balance (Float) - The price to verify
     *  Output: Boolean - True if the price is valid or false otherwise.
     *
     */

    if (isNaN(parseFloat(price))) return false;

    var num = parseFloat(price);
    if (num > 0) return true;
    else return false;

}
