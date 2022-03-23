# Todo-SLS

This project is an API that uses the following technologies to enable CRUD capability for a simple to-do list application:

- [TypeScript](https://www.typescriptlang.org/)
- [AWS (Lambda, API Gateway, DynamoDB)](https://aws.amazon.com/)
- [Serverless Framework](https://www.serverless.com/framework/docs/)
- Unit Testing & Mocking using Mocha and Sinon
- E2E Testing using Mocha and Supertest

## Getting Started

### Dependencies
- This project was generated using the `aws-nodejs-typescript` template from the [Serverless Framework](https://www.serverless.com). For more information on this boilerplate, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws). The project requires NodeJS `lts/fermium (v.14.15.0)`. It is essential to use the same Node version in local and in your lambda's runtime.
- As this project deploys DynamoDB locally on your computer, you must have the Java Runtime Environment (JRE) version 8.x or newer. Please refer to the [documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) on local DynamoDB deployment.

### Installation
First, clone this repository in any suitable location on your system:
```bash
git clone https://github.com/cjamanambu/todo-sls.git
```
Then change directory to the todo-sls directory and install the project dependencies with NPM:
```bash
cd todo-sls && npm install
```
Install the serverless CLI globally via NPM:
```bash
npm install -g serverless
```
Install your local DynamoDB instance using the serverless CLI:
```bash
sls dynamodb install
```
### Executing Project
To run the program, simply run the following command within the todo-sls directory:
```bash
npm start
```
You should see the following output to indicate that the project is up and running locally:
```bash
Dynamodb Local Started, Visit: http://localhost:8080/shell
DynamoDB - created table TodosTable

Starting Offline at stage dev (us-east-2)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * getAllTodos: todo-sls-dev-getAllTodos
           * createTodo: todo-sls-dev-createTodo
           * updateTodo: todo-sls-dev-updateTodo
           * deleteTodo: todo-sls-dev-deleteTodo

   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                 │
   │   GET    | http://localhost:3000/dev/todo                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/getAllTodos/invocations   │
   │   POST   | http://localhost:3000/dev/todo                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/createTodo/invocations    │
   │   PUT    | http://localhost:3000/dev/todo/{id}                                  │
   │   POST   | http://localhost:3000/2015-03-31/functions/updateTodo/invocations    │
   │   DELETE | http://localhost:3000/dev/todo/{id}                                  │
   │   POST   | http://localhost:3000/2015-03-31/functions/deleteTodo/invocations    │
   │                                                                                 │
   └─────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀

Enter "rp" to replay the last request
```
### Deployment
To deploy the project to a live AWS environment, first ensure you have AWS CLI installed and your default profile credentials set. Then run the following command to deploy the project:
```bash
sls deploy
```
To specify the AWS profile to use, run the command with the profile flag:
```bash
sls deploy --aws-profile YOUR_AWS_PROFILE
```
After testing, you can remove all AWS resources and stacks that were spun up during deployment with this command:
```bash
sls remove
```
My own personal AWS deployment is currently at:
```bash
  endpoints:
  GET - https://ikkmfxdcb9.execute-api.us-east-2.amazonaws.com/dev/todo
  POST - https://ikkmfxdcb9.execute-api.us-east-2.amazonaws.com/dev/todo
  PUT - https://ikkmfxdcb9.execute-api.us-east-2.amazonaws.com/dev/todo/{id}
  DELETE - https://ikkmfxdcb9.execute-api.us-east-2.amazonaws.com/dev/todo/{id}
  
  functions:
  getAllTodos: todo-sls-dev-getAllTodos
  createTodo: todo-sls-dev-createTodo
  updateTodo: todo-sls-dev-updateTodo
  deleteTodo: todo-sls-dev-deleteTodo
```

## Help
Currently, you may run into trouble using DynamoDB locally with the new M1 Apple Silicon. If that is the case, please check out [this article](http://taint.org/2022/02/09/183535a.html) for a resolution.

## Considerations
The following are the rationale for a few decisions I made and the overall experience I had:

- I could've set up sort keys to use for sorting the to-dos coming from the DynamoDB table. However, the fact that I had to use the more recent of createdAt and updatedAt meant extra complexity, so I just used a helper function to sort the result after scanning the table.
- I'm still trying to find the best way to handle tests with Mocha. There is a plugin for the Serverless Framework called `serverless-mocha-plugin` but it currently doesn't support Typescript and could be why I'm having difficulty using it to test.
- Please, if you have workarounds for this, feel free to reach out to me. Thank you.
