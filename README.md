# Twitter Clone App Backend
This project is a simple Twitter clone API built with Node.js, Express, and MongoDB. It allows users to register, log in, post tweets, and fetch user timelines.


## Features
User registration
User authentication (login)
Posting tweets
Fetching user timelines with pagination


## Prerequisites
Node.js and npm
MongoDB


## Installation And Execution
1. Clone the repository
2. Open the terminal
3. enter the command 
- npm install (to install all the dependencies)
- node index.js (to run the project) 


## API Endpoints

### Register a new user
1. URL: localhost:3000/api/users/register
2. Method: POST
3. Request Body:
- {
    "username": "your_username",
    "password": "your_password"
  }

### User login
1. URL: localhost:3000/api/users/login
2. Method: POST
3. Request Body:
- {
    "username": "your_username",
    "password": "your_password"
  }

### Post a new tweet
1. URL: localhost:3000/api/tweets
2. Method: POST
3. Request Body:
- {
    "userId": "user_id_from_previous_step",
    "text": "your_text"
  }

### Fetch user timeline with pagination
1. URL: localhost:3000/api/users/:userId/timeline
2. Method: GET
3. URL Parameters:
- userId: User ID whose timeline is to be fetched


## Issues and Troubleshooting
Youn might get stuck while posting a tweet, this is because you might have not stored the _id which is reflected while calling the register API. So make sure to copy the _id in order to avoid any issue.


## MyContact info: muditsrivastava992@gmail.com


# Demo Of Running Project
![WhatsApp Image 2024-06-03 at 02 24 52_6bf7e799](https://github.com/muditsrivast/twitter_backend/assets/88673223/bafa5e2e-e26c-49a0-9609-1bf64a8a6497)
![WhatsApp Image 2024-06-03 at 02 26 01_5d9b920b](https://github.com/muditsrivast/twitter_backend/assets/88673223/33f26f4f-762b-49de-8d16-b4285bc884c7)
![WhatsApp Image 2024-06-03 at 02 43 10_16aeb3fa](https://github.com/muditsrivast/twitter_backend/assets/88673223/e02fb25c-bed4-42d6-8e46-d3fdd54c2bd6)
![WhatsApp Image 2024-06-03 at 02 44 25_e7ba61b5](https://github.com/muditsrivast/twitter_backend/assets/88673223/0cbfa64d-239f-4453-9d48-fbb2a0d98217)
