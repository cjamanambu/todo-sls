"use strict";

// tests for createTodo
// Generated by serverless-mocha-plugin

const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper(
  "createTodo",
  "/.esbuild/.build/src/functions/todo/handlers.js",
  "createTodo"
);

describe("createTodo", () => {
  before((done) => {
    done();
  });

  it("implement tests here", async () => {
    const response = await wrapped.run();
    expect(response).to.not.be.empty;
  });
});
