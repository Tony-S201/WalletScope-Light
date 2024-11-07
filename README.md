# WalletScope-Light

**WSL is a solution to track your wallet tokens.**

Users can create wallet and tokens (manually or coingecko imported).

There is no DB authentication system, you need to authenticate you using an EVM address and the related wallets and tokens you will create are related to it.

## Backend

Stack:
- NodeJS
- Express
- MongoDB
- Mongoose

Requirements:
- Node
- Mongodb

Create a database using mongodb:
```bash
# Start mongod service
$ sudo service mongod start

# Enter in mongo
$ mongo

# Create a database
> use my_database_name
```

Configuration .env file:
```bash
# Default 5000
PORT=
# You can use "mongo" command to get the ip_address
# You can use "show dbs" command into mongo to get the database name
MONGO_URL="mongodb://ip_address:27017/my_database_name"
# Default value "http://localhost:3000"
FRONT_URL=""
```

Setup:
```bash
# Dependencies installation
$ npm install

# Run server application
$ node app.js
```

## Frontend

Stack:
- NextJS / React
- TypeScript
- Wagmi /  Viem
- RainbowKit
- Material UI
- TailwindCSS

Configuration .env file:
```bash
# Put your node server backend URL
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

Setup:
```bash
# Install dependencies
$ yarn install
# or
$ npm install
```
```bash
# Start application
$ yarn run dev
# or
$ npm run dev
```