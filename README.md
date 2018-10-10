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
