describe("Register", function() {
    describe("Username", function() {
        it("should return true for a valid username", function() {
            var retval = isValidUsername("johnsmith1");
            expect(retval).to.be.ok();
        });

        it("should return true for a username that is 3 characters long (corner case)", function() {
            var retval = isValidUsername("gud");
            expect(retval).to.be.ok()
        });

        it("should return true for a username that is 15 characters long (corner case)", function() {
            var retval = isValidUsername("11111AAAAA22222");
            expect(retval).to.be.ok();
        });

        it("should return true for a username that has whitespace at the start and the ends",function(){
            var retval = isValidUsername("                  testusername                ");
            expect(retval).to.be.ok();
        });

        it("should return false for a username that is <3 characters long",function() {
            var retval = isValidUsername("XY");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a username that is >15 characters long",function(){
            var retval = isValidUsername("11111AAAAA22222X");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a username that has characters that do not belong in the set [A-Z,a-z,0-9,_]", function(){
            var retval = isValidUsername("NotValid!");

            expect(retval).to.not.be.ok();
        });

        it("should return false for a username  that has whitespace in the middle", function(){
            var retval = isValidUsername("test username");
            expect(retval).to.not.be.ok();
        });


    });

    describe("Password", function(){
        it("should return true for a password with at 7 chars, and at least 1 letter and number (border case)", function(){
            var retval = isValidPassword("Abcd123");
            expect(retval).to.be.ok();
        });

        it("should return true for a password that is more than 7 chars, and at least 1 letter and numbeer", function(){
            var retval = isValidPassword("AbcDe1234");
            expect(retval).to.be.ok();
        });

        it("should return true for a password that has whitespace at the ends, but is valid by definition.",function(){
            var retval = isValidPassword("          Abcd123         ");
            expect(retval).to.be.ok();
        });

        it("should return false for a password that has less than 7 characters", function(){
            var retval = isValidPassword("2Short");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a password that does not have a number",function(){
            var retval = isValidPassword("abcdefg");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a password that does not have a letter",function(){
            var retval = isValidPassword("1234567");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a password that has characters that are not alphanumeric",function(){
            var retval = isValidPassword("abcdefg!");
            expect(retval).to.not.be.ok();
        });
    });

    describe("First/Last Name", function(){

        it("should return true for a name that is valid by definition", function(){
            var retval = isValidName("Jean Pierre");
            expect(retval).to.be.ok();
        });

        it("should return true for a name that is 2 characters in length (border case)",function(){
            var retval = isValidName("JP");
            expect(retval).to.be.ok();
        });

        it("should return true for a name that is 15 characters in length (border case)", function(){
            var retval = isValidName("Johnny Pleiades");
            expect(retval).to.be.ok();
        });

        it("should return true for a name that contains more than 2 words, but is valid",function(){
            var retval = isValidName("tic tac toe");
            expect(retval).to.be.ok();
        });

        it("should return false for a name that is less than 2 characters in length", function(){
            var retval = isValidName("K");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a name that is more than 15 characters in length", function(){
            var retval = isValidName("Pleiades Pleiades");
            expect(retval).to.not.be.ok();
        });

        it("should return false for a name that contains non-alphabetic characters (except the space character)",function(){
            var retval = isValidName("T0mmy@ S@lam1");
            expect(retval).to.not.be.ok();
        });


    });

    describe("Birthday",function(){
        it("should return true for a valid birthdate (any date past 1950-01-01)", function(){
            var retval = isValidBday(new Date(96,09,21));
            expect(retval).to.be.ok();
        });

        it("should return false for a birthdate that is before 1950-01-01", function(){
            var retval = isValidBday(new Date(0,0,10));
            expect(retval).to.not.be.ok();
        });

        it("should return false for a birthdate that is past the current date", function(){
            var date = new Date();
            date.setYear(date.getFullYear() + 1000);
            var retval = isValidBday(date);
            expect(retval).to.not.be.ok();
        });

        it("should return false for a date that is not valid",function(){
            var retval = isValidBday("abcd");
            expect(retval).to.not.be.ok();
        });
    });

    describe("E-mail",function(){
        it("should return true for valid e-mail syntax",function(){
            var retval = isValidEmail("johnsmith1@gmail.com");
            expect(retval).to.be.ok();
            retval = isValidEmail("jane_doe1_mail@sfu.ca");
            expect(retval).to.be.ok();
        })

        it("should return false for invalid e-mail syntax",function(){
            var retval = isValidEmail("joh#@#!@#n@hotmail.com");
            expect(retval).to.not.be.ok();
        });
    });
});
