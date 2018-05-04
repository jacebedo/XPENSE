const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect;
chai.use(chaiHttp);


describe('Registration (Server)', function(){

    describe('Uniqueness', function(){

        it("should return the User object if the user exists in the database", function(done){
            var existingUser = {
                username: "admin",
                password: "testing123",
                fname: "Test",
                lname: "Account",
                bday: new Date(96,10,21),
                email: "adminacc@gmail.com"
            };

            chai.request(app)
                .post("/users/register")
                .send(existingUser)
                .end(function(err,res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;

                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.an("object");
                    done();
                });
            });

        it("should redirect to the root page if the user does not exist in the database",function(done){
            var newUser = {
                username: "testUser",
                password: "blankpass1",
                fname: "Test",
                lname: "Account",
                bday: new Date(96,10,21),
                email: "testUser1@gmail.com"
            }

            chai.request(app)
                .post("/users/register")
                .send(newUser)
                .end(function(err,res){
                    // Check if page redirects
                    expect(res).to.redirect
                    expect(err).to.be.null;
                    expect(res.body).to.be.an("Object").that.is.empty;

                    chai.request(app)
                        .delete(`/users/delete/${newUser.username}`)
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            done();
                        });

                });


        });
    });

});
