# Twitter Clone API
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
URL: localhost:3000/api/users/register
Method: POST
Request Body:
- {
    "username": "your_username",
    "password": "your_password"
  }

### User login
URL: /api/users/login
Method: POST
Request Body:
- {
    "username": "your_username",
    "password": "your_password"
  }

### Post a new tweet
URL: /api/tweets
Method: POST
Request Body:
- {
    "userId": "user_id_from_previous_step",
    "text": "your_text"
  }

### Fetch user timeline with pagination
URL: /api/users/:userId/timeline
Method: GET
URL Parameters:
- userId: User ID whose timeline is to be fetched


