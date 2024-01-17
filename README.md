<span style="color:red">_Development suspended_</span>

<style>
    .filePath{
        background-color: gray;
        border-radius: 16px;
        padding: 0 10px;
    }
</style>

# Messenger

This is a testing application that allows authorized users to communicate with each other, make new friends, create posts write comments, etc.

## Technologies

### Client

-   React 18.2.0v;
-   Redux 8.1.0v;
-   @reduxjs/toolkit 1.9.5v;
-   Axios 1.4.0v;
-   socket.io-client 4.7.1v;
-   react-icons 4.9.0v;
-   react-router-dom 6.13.0v.

### Server

-   Express 4.18.2v;
-   express-fileupload 1.4.3v;
-   express-validator 7.0.1v;
-   cors 2.8.5v;
-   bcrypt 5.1.0v;
-   jsonwebtoken 9.0.0v;
-   mongoose 7.3.0v;
-   socket.io 4.7.4v.

## initialization

### Client

-   First you need to go to <span class="filePath">Messenger\client</span>;
-   Next you need to install all the dependencies <span class="filePath">npm i</span>;
-   after which you can launch the client <span class="filePath">npm start</span>.

### Server

-   First you need to go to <span class="filePath">Messenger\server</span>;
-   Next you need to install all the dependencies <span class="filePath">npm i</span>;
-   after which you can launch the client <span class="filePath">npm start</span>.

## Problems

There are a number of problems with data that interfere with the operation of the application.

1. incorrect operation of sockets

Due to incorrect configuration of the socket connection between the server and the client, the connection may be disconnected, as a result of which you can see the corresponding message in the browser console

2. Incorrect display of post information

An example of this would be missing a post creation date or missing small content such as a post title

3. Incorrect display of user information

This can be seen when you change your profile photo, then go into any conversation and look at photos of old messages that will not be changed
