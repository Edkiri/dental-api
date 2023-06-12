# Dental RESTful API


## Objective
Create a RESTful application that manages appointments for a dental clinic.
## Stack
<div align="center">
<a href="https://www.mongodb.com/">
    <img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
 </div>

## How it works?
In the application, there are four types of users: 'user', who is the default patient; 'dentist', who are the available dentists to attend appointments; 'admin', who are responsible for creating 'dentists' and managing business data, and the 'superadmin' that is the only one capable of creating others 'admin'.

For a patient to request an appointment, they must be registered with complete profile information. The patient must choose a service to request the appointment.

Once an appointment is requested, it can be confirmed or canceled by an 'admin'. The administrator must choose a date and time to confirm the appointment.

The patient also has the ability to cancel their own appointment. Also the dentist assigned to the appointment can cancel it. A reason message must be sent by the one canceling it. 

Finally, an administrator marks the appointment as completed and records the patient's evaluation within the appointment.

![db documents](images/dental-api-documents.png)

## Local instalation
Clone the repository.
```bash
git clone https://github.com/Edkiri/dental-api.git
```
Then, install the project's dependencies:
```bash
npm install
```
### Set up the database
This project uses [MongoDB](https://account.mongodb.com/) as its database.
The project has a `docker-compose.yml` file ready to use if you have [Docker](https://www.docker.com/) installed.

You can also install MongoDB on your local machine directly or use a cloud service.

copy `.env.example` to `.env`. This file contains variables to connect to MongoDB, and some other for the app, like jwt secret token, email and password of superadmin user. 

```bash
 cp .env.example .env
```


#### `.env` variables for MongoDB.

```bash
MONGO_DATABASE=your_database_nane
MONGO_USERNAME=your_database_user
MONGO_PASSWORD=your_database_password
MONGO_PORT=your_database_port
MONGO_DATABASE_URL=your_database_url
```

If you are using Docker, you can use the following values:

```bash
MONGO_DATABASE=dentaldb
MONGO_USERNAME=root
MONGO_PASSWORD=secret
MONGO_PORT=27017
MONGO_DATABASE_URL=mongodb://root:secret@localhost:27017
```


If you have [Docker](https://www.docker.com/) installed, you can use the following command to start a MongoDB container:

```bash
docker-compose up -d
```

Now run the seeder to create superadmin user and default services.

```bash
npm run seed
```
To run the project in development mode, run the following command:

```bash
npm run dev
```

This project uses eslint and prettier to style and format the code. Make sure to install those extensions on your IDE if you want to use them.