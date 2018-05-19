$(document).ready(function(){
    $.ajax({
        url: "./users/get/me",
        method: "get",
        data: {},
        success: updateProfile
    });
});


function updateProfile(data,status){
    if (status === 200){
        // Update expense table
        $("#expensesTable >  tbody").empty();
        $("#expenseWallet").empty();
        for (expense of data.expenses) {
            $("#expensesTable > tbody").append(generateExpenseChild(expense));
            // Update expense form with wallet names
            $("#expenseWallet").append(`<option> ${expense.name} </option> `);
        }
        // Update wallets table
        $("#walletsTable > tbody").empty();
        for (wallet of data.wallets) {
            $("#walletsTable > tbody").append(generateWalletChild(wallet));
        }
    }
    else {
        window.location.replace(document.location.origin);  // Go back to '/'
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

     return `
     <tr>
        <td> ${wallet.name} </td>
        <td> ${parseFloat(wallet.balance).toFixed(2)} </td>
        <td> ${wallet.type} </td>
        <td> ${wallet.lastUpdated} </td>
     </tr>
     `
}
