const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Expense - EXP03", function(){

  it("should return HTTP Status 412 because of unauthorized access", function(done){
    var badExpense = {
      name: "",
      price: "",
      type: "",
      wallet: "",
      date: ""
    }
    chai.request(app)
        .post("/users/addexpense/me")
        .send(badExpense)
        .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(412);
          expect(res.body).to.be.an("object");
          done();
        });

  });
});
