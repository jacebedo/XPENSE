describe("Expense - EXP01, EXP02", function(){

    describe("Expense Name", function(){
        it("should return true for a name that is 3-40 characters belonging in (A-Z, a-z, 0-9, , .).", function(){
            var test1 = isValidExpenseName("Tuesday Restaurant");
            var test2 = isValidExpenseName("January 4th Grocceries");
            expect(test1).to.be.true;
            expect(test2).to.be.true;
        });

        it("should return true for a name that is 3 characters belonging in (A-Z, a-z, 0-9, , .) - Border Case.",function(){
            var test = isValidExpenseName("Dog");
            expect(test).to.be.true;
        });

        it("should return true for a name that is 40 characters belonging in (A-Z, a-z, 0-9, , .) - Border Case.", function(){
            var test = isValidExpenseName(`1234 1234 1234 1234 1234 1234 1234 12345`);
            expect(test).to.be.true;
        });

        it("should return false for a name that contains characters outside of (A-Z, a-z, 0-9, , .).", function(){
            var test1 = isValidExpenseName("Tuesday Restauran#");
            var test2 = isValidExpenseName("$($!@())");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

        it("should return false for a name that contains a period at the beginning of the name.", function(){
            var test1 = isValidExpenseName(".Invalid Name");
            var test2 = isValidExpenseName("Valid Name.");
            expect(test1).to.be.false;
            expect(test2).to.be.true;
        });

        it("should return false for a name that is less than 3 characters long.", function(){
            var test = isValidExpenseName("XY");
            expect(test).to.be.false;
        });

        it("should return false for a name that is more than 40 characters long.", function(){
            var test = isValidExpenseName(`1234 1234 1234 1234 1234 1234 1234 12345 1234`);
            expect(test).to.be.false;
        });

        it("should return false for an undefined input.", function(){
            var test1 = isValidExpenseName(undefined);
            var test2 = isValidExpenseName("");

            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });
    });

    describe("Expense Type", function(){

        it("should return true for 3-15 Alphabetic characters.", function(){
            var test = isValidExpenseType("Food");
            expect(test).to.be.true;
        });

        it("should return true for 3 alphabetic characters - Border Case.", function(){
            var test = isValidExpenseType("Dog");
            expect(test).to.be.true;
        });

        it("should return true for 15 alphabetic characters - Border Case.", function(){
            var test = isValidExpenseType("ABCD ABCD ABCDE");
            expect(test).to.be.true;
        });

        it("should return false if the name is less than 3 characters long.", function(){
            var test1 = isValidExpenseType("");
            var test2 = isValidExpenseType("xy");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

        it("should return false if the name is more than 15 characters long.", function(){
            var test = isValidExpenseType("abcd abcd abcde abcd");
            expect(test).to.be.false;
        });

        it("should return false if there are non-alphabetic characters in the type", function(){
            var test1 = isValidExpenseType("Invalid 1 Type");
            var test2 = isValidExpenseType("nvalid Ty@pe");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

        it("should return false for an undefined input", function(){
            var test1 = isValidExpenseType(undefined);
            var test2 = isValidExpenseType("");
            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });
    });

    describe("Expense Price", function(){

        it("should return true if the balance is a positive float value", function(){
            var test1 = isValidExpensePrice(10);
            var test2 = isValidExpensePrice(42.11);
            var test3 = isValidExpensePrice(20.00);
            expect(test1).to.be.true;
            expect(test2).to.be.true;
            expect(test3).to.be.true;
        });

        it("should return false for any negative value", function(){
            var test = isValidExpensePrice(-100.00);
            expect(test).to.be.false;
        });

        it("should return false for any non-numeric inputs", function(){
            var test = isValidExpensePrice("abc");
            expect(test).to.be.false;
        });

        it("should return false for infinite inputs", function(){
            var test1 = isValidExpensePrice(NaN);
            var test2 = isValidExpensePrice(Infinity);
            var test3 = isValidExpensePrice(undefined);

            expect(test1).to.be.false;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
        });

        it("should return false for a zero input.", function(){
            var test1 = isValidExpensePrice(0);
            var test2 = isValidExpensePrice(0.00);

            expect(test1).to.be.false;
            expect(test2).to.be.false;
        });

    });


});
