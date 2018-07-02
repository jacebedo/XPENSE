const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Wallet - WAL03", function(){

  it("should return HTTP Status 412 because of unauthorized access", function(done){
    var badWallet = {
      name: "",
      type: "",
      balance: "",
      increment: "",
      lastUpdated: ""
    }
    chai.request(app)
        .post("/users/addwallet/me")
        .send(badWallet)
        .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(412);
          expect(res.body).to.be.an("object");
          done();
        });

  });
});
