## Annotation
Example React / Node Js app for user administration. 

## Features

1. User registration
2. User password recovery
3. Paginated list of all users
4. User details with login sessions list
5. Users removal
6. Registration of users while logged in

## Setup and Installation
1. Make sure you have installed node >= v8.9 & npm >= v5.5.
2. Run npm npm `npm run install-all`
3. In root directory create `config.json` file
 
```json
{
  "gmail-acc": "<your-gmail-acc-to-send-notifications-from>",
  "gmail-pass": "<pw>"
} 
```

## Run for development
Just run `npm run dev`

## Run for production
Execute following commands
1. `npm run build`
2. `npm start`

## API
* POST /api/login
    * Expected body: { email: <email>, password: <password> }
    * Responds with: { token: <authorization-token }
* GET /api/users
    * Expected query params: from, limit
    * Expected 'Authorization' header with token
    * Responds with: { users: <array>, hasNext: <boolean>, hasPrev: <boolean>
* GET /api/user
    * Expected query params: id
    * Expected 'Authorization' header with token
    * Responds with: { email: <email>, id: <id>, logins: <array>
* POST /api/new-user
    * Expected body: { email: <email>, password: <password> }
* POST /api/delete-user
    * Expected body: { id: <id> }
    * Expected 'Authorization' header with token
* POST /api/recovery
    * Expected body: { email: <email> }
