var should = require("chai").should(),
expect = require("chai").expect,
assert = require("chai").assert,
supertest = require("supertest"),
app = require("../app");
var url = supertest("http://localhost:8080");
describe("Testing the first route", function(err){
  it("should handle the request", function(done){
    url
        .get("/add")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
           //expect(res.text).to.be.equal("express");

          // assert(res.text == "express","Test has failed");
          done();
        });
  });
});
