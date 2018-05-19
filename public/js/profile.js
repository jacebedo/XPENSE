$(document).ready(function(){
    $.ajax({
        url: "./users/getdata/me",
        method: "get",
        data: {},
        success: updateProfile
    });
});

$("#addWallet").click(function(){
    var wallet = {
        name: $("#walletName").val(),
        type: $("#walletType").val(),
        balance: $("#walletBalance").val(),
        increment: $("#walletIncrement").val(),
        lastUpdated: new Date()
    };
    var errorMap = [0,0,0,0,0];
    if (verifyWalletObject(wallet,errorMap)){
        $.ajax({
            url: "./users/addwallet/me",
            method: "post",
            data: wallet,
            success: function(doc,status){
                console.log(JSON.stringify(doc));
                $('#walletCreateModal').modal('toggle');
            }
        })
    } else {
        displayWalletModalError(errorMap);
    }
});

$("#addExpense").click(function(){
    var expense = {
        name: $("expenseName").val(),
        type: $("expenseType").val(),
        price: $("expensePrice").val(),
        wallet: $("expenseWallet").val(),
        date: new Date()
    }
    var errorMap = [0,0,0,0,0];
    if (verifyExpenseObject(expense,errorMap)){

    } else {
        displayExpenseModalError(errorMap);
    }
});

function verifyWalletObject(wallet,errorMap){
    /*
     *  Verifies if the inputs in the wallet object are valid
     *  Inputs: Wallet (Object) - The wallet to verify.
     *          errorMap(Boolean Array) - flags which inputs are erroneous.
     *
     *  Outputs: Boolean - If there is at least 1 error, return false.
     *            Updated errorMap - Returns which inputs are false.
     */
    var retval = true;
    if (!isValidWalletName(wallet.name)) {
        retval = false;
        errorMap[0] = 1;
    }

    if (!isValidWalletType(wallet.type)) {
        retval = false;
        errorMap[1] = 1;
    }
    if (!isValidWalletBalance(wallet.balance)) {
        retval = false;
        errorMap[2] = 1;
    }
    if (!isValidWalletIncrement(wallet.increment,wallet.type)){
        retval = false;
        errormap[3] = 1 ;
    }
    if (wallet.lastUpdated == undefined || wallet.lastUpdated == null){
        retval = false;
        errorMap[4] = 1;
    }
    return retval;
}

function verifyExpenseObject(expense,errorMap){
    var retval = true;
    if (!isValidExpenseName(expense.name)){
        errorMap[0] = 1;
        retval = false;
    }
    if (!isValidExpenseType(expense.type)){
        errorMap[1] = 1;
        retval = false;
    }
    if (!isValidExpensePrice(expense.price)){
        errorMap[2] = 1;
        retval = false;
    }
    if (!isValidWalletName(expense.wallet)){
        errorMap[3] = 1;    // More testing on server side.
        retval = false;
    }
    if (expense.date == undefined || expense.date == null){
        errorMap[4] = 1;
        retval = false;
    }
};

function updateProfile(data,status){
    console.log(data);
    // Update expense table
    // $("#expensesTable >  tbody").empty();
    // for (expense of data.expenses) {
    //     $("#expensesTable > tbody").append(generateExpenseChild(expense));

    // }
    // Update wallets table
    $("#expenseWallet").empty();
    $("#walletsTable > tbody").empty();
    for (wallet of data.wallets) {
        $("#walletsTable > tbody").append(generateWalletChild(wallet));
        // Update expense form with wallet names
        $("#expenseWallet").append(`<option> ${wallet.name} </option> `);
    }


}

function generateExpenseChild(expense) {
    /*
     *  Converts the contents of an expense object to a stringified table entry
     *  Input: expense - a JSON object that is an 'expense' object.*
     *  Output: A stringified table entry that contains the fields of the expense object.
     *
     *  *Expense Object:
     *  _id(number),name(string),type(string),price(number),wallet(string),date(date)
     */

     return `
     <tr>
        <td> ${expense.name} </td>
        <td> ${expense.type} </td>
        <td> ${expense.price} </td>
        <td> ${expense.wallet} </td>
        <td> ${expense.date.toLocaleDateString()}</td>
     </tr>
     `
}

function generateWalletChild(wallet){
    /*
     *  Converst the contents of a wallet object to a stringified table entry
     *  Input: wallet - a JSON object that is a "wallet" object.*
     *  Output: A stringified table entry that contains the fields of the wallet object
     *
     *  *Wallet Object:
     *  _id(number),name(string),type(enum{one-time,daily,weekly,monthly}),balance(number),increment(number),lastUpdated(date)
     *
     */
     var date = new Date(wallet.lastUpdated);
     return `
     <tr>
        <td> ${wallet.name} </td>
        <td> ${parseFloat(wallet.balance).toFixed(2)} </td>
        <td> ${wallet.type} </td>
        <td> ${date.toDateString()} </td>
     </tr>
     `
}

function displayWalletModalError(errorMap){
    console.log("bad error!");
}
