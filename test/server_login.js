const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect;
chai.use(chaiHttp);


describe("Login - LOG01, LOG03, LOG04", function(){

    it("should return AUTH == 1 in the header and the redirect URL in the body if the user has successfully logged into the server.", function(done){
        // Assumption, this user already exists in the database.
        var existingUser = {
            username: "admin",
            password: "testing123"
        };

        chai.request(app)
            .post("/users/login")
            .send(existingUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.redirectURL).to.equal("/profile.html");
                expect(res).to.have.header('AUTH',"1");
                done();
            });
    });

    it("should return a null object if the user is not registered in the database.", function(done){
        var notAUser = {
            username: "amgjr45",
            password: "454545aa"
        };

        chai.request(app)
            .post("/users/login")
            .send(notAUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.not.redirect;
                expect(res.body).to.be.a("null");
                done();
            });
    });

    it("should return a null object if the user enters the wrong password.",function(done){
        var existingUser = {
            username: "admin",
            password: "454545aa"
        };

        chai.request(app)
            .post("/users/login")
            .send(existingUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.not.redirect;
                expect(res.body).to.be.a("null");
                done();
            });
    });

});
