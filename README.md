## Installation

```bash
$ cp env.example .env // add the port number on which you want to run the app
$ npm install
```

## Change microservice urls

1. cd ./src/shared/constants/msUrls.ts
2. constant "ownerMsUrl" change to owner microservice url 
3. constant  "productMsUrl" change to product microservice url 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Details

```bash
$ http://localhost:<port>/api
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
