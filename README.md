# RESTful API in Node and Express by Adrian Balcan ( www.adrianbalcan.com )

## Requirements

- Node and npm

## Installation

- Clone the repo: `git clone git@github.com:adrianbalcan/coffeshops`
- Install dependencies: `npm install`
- Start the server: `npm start` or `node app.js`

## Use

- Get Coffee shops list: GET http://localhost:9000/coffeeshops
- Insert new Coffee shop: POST http://localhost:9000/coffeeshops
- Get specific Coffee shop: GET http://localhost:9000/coffeeshops/:id
- Edit an existent Coffee shop: PUT http://localhost:9000/coffeeshops/:id
- Remove an existent Coffee shop: DELETE http://localhost:9000/coffeeshops/:id