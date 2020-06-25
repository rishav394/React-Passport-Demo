# React Passport Demo

## Basic demonstration of how to communicate between the Authentication Server and React Project

## Prerequisite

- Start mongodb locally or update MONGODB_URI
- Install [nodeJS](https://nodejs.org/en/download/)
- Install [yarn](https://classic.yarnpkg.com/en/docs/install) (yarn > npm)

## How to run (Development)

From the main directory after installing all the `node_modules` (`yarn install`) in both `client` and `server`, run

```
yarn dev
```

### Server (Production)

Run on express server

```
cd server/
yarn install
node index.js
```

Go to localhost:4000

**Then on a different console.**

### Client (Production)

```
cd client/
yarn install
yarn run build
serve build
```

Go to localhost:3000

### Important

Either use `.env` and `dotenv`
Or
Add a `keys.js` file under `config` with the same keys as in `.env`
