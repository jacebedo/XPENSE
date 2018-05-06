describe("Login - LOG02",function(){
    // Assertion: ~/public/js/verify.js is used to verify the information in the form.

    describe("Username", function() {
        it("should return true for a valid username", function() {
            var retval = isValidUsername("johnsmith1");
            expect(retval).to.be.true;
        });

        it("should return true for a username that is 3 characters long (corner case)", function() {
            var retval = isValidUsername("gud");
            expect(retval).to.be.true
        });

        it("should return true for a username that is 15 characters long (corner case)", function() {
            var retval = isValidUsername("11111AAAAA22222");
            expect(retval).to.be.true;
        });

        it("should return true for a username that has whitespace at the start and the ends",function(){
            var retval = isValidUsername("                  testusername                ");
            expect(retval).to.be.true;
        });

        it("should return false for a username that is <3 characters long",function() {
            var retval = isValidUsername("XY");
            expect(retval).to.be.false;
        });

        it("should return false for a username that is >15 characters long",function(){
            var retval = isValidUsername("11111AAAAA22222X");
            expect(retval).to.be.false;
        });

        it("should return false for a username that has characters that do not belong in the set [A-Z,a-z,0-9,_]", function(){
            var retval = isValidUsername("NotValid!");

            expect(retval).to.be.false;
        });

        it("should return false for a username  that has whitespace in the middle", function(){
            var retval = isValidUsername("test username");
            expect(retval).to.be.false;
        });


    });

    describe("Password", function(){
        it("should return true for a password with at 7 chars, and at least 1 letter and number (border case)", function(){
            var retval = isValidPassword("Abcd123");
            expect(retval).to.be.true;
        });

        it("should return true for a password that is more than 7 chars, and at least 1 letter and numbeer", function(){
            var retval = isValidPassword("AbcDe1234");
            expect(retval).to.be.true;
        });

        it("should return true for a password that has whitespace at the ends, but is valid by definition.",function(){
            var retval = isValidPassword("          Abcd123         ");
            expect(retval).to.be.true;
        });

        it("should return false for a password that has less than 7 characters", function(){
            var retval = isValidPassword("2Short");
            expect(retval).to.be.false;
        });

        it("should return false for a password that does not have a number",function(){
            var retval = isValidPassword("abcdefg");
            expect(retval).to.be.false;
        });


        it("should return false for a password that does not have a letter",function(){
            var retval = isValidPassword("1234567");
            expect(retval).to.be.false;
        });

        it("should return false for a password that has characters that are not alphanumeric",function(){
            var retval = isValidPassword("abcdefg!");
            expect(retval).to.be.false;
        });

        it("should return flase for a password that has a space in the middle", function(){
            var retval = isValidPassword("abcd 1234");
            expect(retval).to.be.false;
        });
    });


});
