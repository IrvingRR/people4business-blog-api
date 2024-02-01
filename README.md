## people4business-api
This app was developed to manage the information of the entries of a simple blog

### Technologies
- Node
- Express
- Express-validator
- dotenv
- cors
- mysql2

## Usage
It is not necessary to locally install the server since it is deployed with the purpose of saving time when using it. To use it, just use the following URL which will allow access to each of the enpoints.

    https://people4business-blog-api-production.up.railway.app/api


## Endpoints

##### Get all entries from database [GET]
    https://people4business-blog-api-production.up.railway.app/api/entries

##### Search entries [GET]
    https://people4business-blog-api-production.up.railway.app/api/entries?term=author&value=Austin

##### Get one entry by ID [GET]
    https://people4business-blog-api-production.up.railway.app/api/entries/{id}

##### Create a new entry [POST]
    https://people4business-blog-api-production.up.railway.app/api/entries

##### Update a entry [PUT]
    https://people4business-blog-api-production.up.railway.app/api/entries/{id}

##### Delete a entry [DELETE]
    https://people4business-blog-api-production.up.railway.app/api/entries/{id}


## Installation
If you need to install the server locally, these are the steps you can follow to do so.

- Create a SQL database with the name people4business-blog

- Import the file "freedb_people4business-blog".

- Copy the repository

- Go to the project folder and run the following command

        npm install

- Define environment variables within the .env file to connect to the database and server locally

- Execute the server with the next command  

        npm run dev