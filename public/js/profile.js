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
            success: function(docs,status){

                $("#walletCreateModal").modal("toggle");
                updateProfile(docs,status);
            }
        })
    } else {
        displayWalletModalError(errorMap);
    }
});

$("#addExpense").click(function(){
    var expense = {
        name: $("#expenseName").val(),
        type: $("#expenseType").val(),
        price: $("#expensePrice").val(),
        wallet: $("#expenseWallet").val(),
        date: new Date()
    }
    var errorMap = [0,0,0,0,0];
    if (verifyExpenseObject(expense,errorMap)){
        $.ajax({
            url: "./users/addexpense/me",
            method: "post",
            data: expense,
            success: function(docs,status){
                $("#expenseCreateModal").modal("toggle");
                updateProfile(docs,status);
            }
        });
    } else {
        console.log(errorMap);
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

    return retval;
};

function updateProfile(data,status){
    // Update expense table
    $("#expensesTable >  tbody").empty();
    for (expense of data.expenses) {
        $("#expensesTable > tbody").append(generateExpenseChild(expense));

    }
    // Update wallets table
    $("#expenseWallet").empty();
    $("#walletsTable > tbody").empty();
    for (wallet of data.wallets) {
        $("#walletsTable > tbody").append(generateWalletChild(wallet));
        // Update expense form with wallet names
        $("#expenseWallet").append(`<option> ${wallet.name} </option> `);
    }

    setWalletEventListeners();

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
     var date = new Date(expense.date);
     return `
     <tr>
        <td class="e-name"> ${expense.name} </td>
        <td class="e-type"> ${expense.type} </td>
        <td class="e-price"> ${expense.price} </td>
        <td class="e-wallet"> ${expense.wallet} </td>
        <td class="e-date"> ${date.toDateString()}</td>
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
        <td class="w-name"> ${wallet.name} </td>
        <td class="w-balance"> ${parseFloat(wallet.balance).toFixed(2)} </td>
        <td class="w-type"> ${wallet.type} </td>
        <td class="w-date"> ${date.toDateString()} </td>
     </tr>
     `
}

function setWalletEventListeners(){

    $("#walletsTable > tbody > tr").click(function(){
        var name = $(this).find(".w-name").text();
        // Submit ajax request to get full information about this wallet
        $.ajax({
            url: `./users/wallet/getInformation/${name}`,
            method: "get",
            data: {},
            success: showWalletInfoModal
        });
    });
}


function showWalletInfoModal(doc,status){
    /*
     *  Procedure: (1) Update the information fields in the modal, using doc.information [DONE]
     *             (2) Update the 'recent expenses' field, using doc.expenses [DONE]
     *
     */
     if (doc != undefined){
         updateWalletInfoModal(doc.information);
         updateWalletInfoExpenses(doc.expenses);
         $("#walletInformationModal").modal("toggle");
     }
}

function updateWalletInfoModal(info){
    $("#walletINfoTable > tbody > tr > td").empty();
    $("#walletInfoTable > tbody > #walletInfoName > .field").text(info.name);
    $("#walletInfoTable > tbody > #walletInfoType > .field").text(info.type);
    $("#walletInfoTable > tbody > #walletInfoLastUpdated > .field").text(info.lastUpdated);
    $("#walletInfoTable > tbody > #walletInfoBalance > .field").text(info.balance);
}

function updateWalletInfoExpenses(expenses){
    $("#walletInfoExpenses > tbody").empty();
    if (expenses != undefined) {
        for (item of expenses) {
            $("#walletInfoExpenses > tbody").append(generateExpenseChild(item));
        }
    }
}

$("#addBalance").click(function(){
    if($("#walletInfoTable > tbody > #walletInfoName > .field").text() != ""){
        /* Procedure:
         *
         *  1. Open modal to enter a price.
         *  2. Submit an POST request to the server
         *  3. Update fields of the wallet
         *
         */
         $(".modal").modal("hide");
         $("#addBalanceModal").modal("toggle");
         $("#submitBalance").click(undefined);
         $("#submitBalance").click(function(){
            $.ajax({
                url: "./users/wallet/updateBalance/",
                method: "POST",
                data: {
                    wallet: $("#walletInfoTable > tbody > #walletInfoName > .field").text(),
                    balance: $("#BalanceAmount").val()
                },
                success: function(doc,status){
                    $(".modal").modal("hide");
                    updateProfile(doc,status);
                }
            })
         });

    }

});

function updateWalletProfile(doc,status){
    $(".modal").modal("hide");
}

function displayWalletModalError(errorMap){
    console.log("bad error!");
}

function displayExpenseModalError(errorMap){
    console.log("Bad error");
}
