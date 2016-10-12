"use strict"
let supertest = require("supertest");
let should = require("should");

// This agent refers to PORT where program is runninng.

let server = supertest.agent("http://localhost:8090");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/getUserInfo")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      //res.status.should.equal(200);
      // Error key should be false.
     // res.body.error.should.equal(false);
      done();
    });
  });

});