describe("Wallet - WAL01, WAL02",function(){

    describe("Name",function(){
        it("should return true if the wallet name is valid", function(){
            var test1 = isValidWalletName("Sample Wallet"); //Standard Case
            var test2 = isValidWalletName("x01");   // Corner case - Length is 3 chars
            var test3 = isValidWalletName("ABCD EFGH IJKLM");   //Corner case - Length is 15 chars

            expect(test1).to.be.true;
            expect(test2).to.be.true;
            expect(test3).to.be.true;
        });

        it("should return false if the wallet name is less than 3 characters long.",function(){
            var test1 = isValidWalletName("");
            var test2 = isValidWalletName("XY");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

        it("should return false if the wallet name is more than 15 characters long", function(){
            var test = isValidWalletName("ABCD EFGH IJKLM NOP");
            expect(test).to.be.false;
        });

        it("should return false if the wallet name contains no letters or numbers", function(){
            var test1 = isValidWalletName("      "); // 6 spaces
            var test2 = isValidWalletName("...");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

        it("should return false for characters that do not belong in the set {A-Z,a-z,0-9,\ ,\.} and true otherwise", function(){
            var test1 = isValidWalletName("Budget 1.1");
            var test2 = isValidWalletName("Budget @12");
            var test3 = isValidWalletName("%Wallet");

            expect(test1).to.be.true;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
        });
    });

    describe("Type",function(){
        it("should return true if the wallet type is an enumeration of: {'one-time','daily','weekly','monthly'}", function(){
            var test1 = isValidWalletType("one-time");
            var test2 = isValidWalletType("daily");
            var test3 = isValidWalletType("weekly");
            var test4 = isValidWalletType("monthly");

            expect(test1).to.be.true;
            expect(test2).to.be.true;
            expect(test3).to.be.true;
            expect(test4).to.be.true;
        });

        it("should return false for any other inputs",function(){
            var test1 = isValidWalletType("");
            var test2 = isValidWalletType("notValid");
            var test3 = isValidWalletType("onetime");
            var test4 = isValidWalletType("Daily");

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
            expect(test4).to.be.false;
        });

    });

    describe("Initial Balance",function(){

        it("should return true if the balance is a positive float value or zero", function(){
            var test1 = isValidWalletBalance(0.00);
            var test2 = isValidWalletBalance(42.11);
            var test3 = isValidWalletBalance(20.00);
            var test4 = isValidWalletBalance(10);
            expect(test1).to.be.true;
            expect(test2).to.be.true;
            expect(test3).to.be.true;
            expect(test4).to.be.true;
        });

        it("should return false for any negative value", function(){
            var test = isValidWalletBalance(-100.00);
            expect(test).to.be.false;
        });

        it("should return false for any non-numeric inputs", function(){
            var test = isValidWalletBalance("abc");
            expect(test).to.be.false;
        });

        it("should return false for infinite inputs", function(){
            var test1 = isValidWalletBalance(NaN);
            var test2 = isValidWalletBalance(Infinity);

            expect(test1).to.be.false;
            expect(test2).to.be.false;
        })

    });

    describe("Increment",function(){

        it("should return true if the wallet type is {'daily','monthly','weekly'} and the input is a non-zero float value", function(){
            var test1 = isValidWalletIncrement(20.00,"daily");
            var test2 = isValidWalletIncrement(45.00,"weekly");
            var test3 = isValidWalletIncrement(100.00,"monthly");

            expect(test1).to.be.true;
            expect(test2).to.be.true;
            expect(test3).to.be.true;
        });

        it("should return true if the wallet type is 'one-time' and the input is zero", function(){
            var test = isValidWalletIncrement(0,"one-time");
            expect(test).to.be.true;
        });

        it("should return false if the wallet type is {'daily','weekly','monthly'} and the input is zero",function(){

            var test1 = isValidWalletIncrement(0,"daily");
            var test2 = isValidWalletIncrement(0,"weekly");
            var test3 = isValidWalletIncrement(0.00,"monthly");

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
        });

        it("should return false if the wallet type is 'one-time' and the input is a non-zero float value",function(){
            var test = isValidWalletIncrement(25.00,"one-time");
            expect(test).to.be.false;
        });

        it("should return false if the input is a negative value", function(){
            var test1 = isValidWalletIncrement(-1.00,"daily");
            var test2 = isValidWalletIncrement(-0.50,"weekly");
            var test3 = isValidWalletIncrement(-150.00,"monthly");
            var test4 = isValidWalletIncrement(-11.00,"one-time");

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
            expect(test4).to.be.false;
        });

        it("should return false if the input is not a number", function(){
            var test1 = isValidWalletIncrement("abcd","daily");
            var test2 = isValidWalletIncrement("ab334","weekly");
            var test3 = isValidWalletIncrement("100.xy","monthly");
            var test4 = isValidWalletIncrement(NaN,"one-time");

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
            expect(test4).to.be.false;
        });

        it("should return false if the input is an infinite value",function(){
            var test1 = isValidWalletIncrement(Infinity,'one-time');
            var test2 = isValidWalletIncrement(Infinity,'daily');
            var test3 = isValidWalletIncrement(Infinity,'weekly');
            var test4 = isValidWalletIncrement(Infinity,'monthly');

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
            expect(test4).to.be.false;
        });
    });

});
