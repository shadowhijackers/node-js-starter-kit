# Node JS Starter kit in SOLID Architecture.
  
# Introduction
  
   This is the starter kit project for node js  with `typescript` 
 programming. This project is with `express js` and `mongoose` frameworks to 
 build a  Rest APIs. This project structure also support with multiple API
 protocalls also we build the project with unit testing for end points and
 logic codes by `supertest` and `jest`.
 
 This project also example for best practice  node js application
 
 ## Project structure explanations:
  
      1. api - Write api codes like rest, graphql, socket
      2. common - Write common functions to be usable for all the modules 
      3. config - Write App config code
      4. code - Write Application core level code like engine of your 
                your project, service providers 
      5. models - Wirte database collection models
      6. loaders - Write your application modueles and load dependcy of app
      7. services - Write application logics
      8. subscribers - Write Event subscriber code
      9. types - Write application types like interfaces, absracts
      10. __test__  - Write jest unit testing code. 
 
 # Core Concepts of this application.
    
   Node Js is run time environment for javascript which built on
   V8 Javascript engine. Its Single thread non blocking IO programming  
   environment and its intepreted language. Which uses the javascript to 
   run a servers. javascript is dynamic programming language. There is no
   type defention and less OOPS features for its programming. So Choosing
   Typescript for developing node js application which will increase the 
   productivity and easy to write reusable code.
   
   This application is mainly design for develop a secured, low latency 
   swagger friendly (not yet implemented for swagger)  and strong implementation.
   
   We everyone know javascript is a single thread application. So Writing
   perfomable app is very difficult compare than the other multi thread 
   programming. However its offer a non blocking IO So we can able to 
   delivering resources to endpoints is make fast as possible as per writing
   javascript asynchronus coding styles and event emiters. So Here we are using
   async and Event dispatchers. 
   
    Case Study:
         We are writing api for user registration. In this endpoint logic 
       we are writting the code for user registration if the user data 
       valid the we will send confimation email and return responses. 
       Here we can write send the email confirmation in event emmiter when 
       the user data valid then write the api to return response and emit the
       user data to send the email confirmation in background.  
       
   > We can write the async packages to handle the complex asynchronus calls parallely and series
     
   To reduce the latency of an endpoints response  we are not added the
   common middleware like body parser. which added in particularly api calls
   only. So other API calls can make faster.
   
   Write Test driven development Its an common approach from most of the
   developers. Writing an unit testing for project it will make you more confident
   to deployment and do not allow your code run in production if it not tested.   
   Here we are using jest and supertest for endpoints. Use seperate db for unit 
   testing environment.
  
   We are added the pm2 server cofiguration here to run this application in 
   cluster mode to speed up the api calls. We are setting the environmetn varibales
   for only in development and testing not added for production. Which added in pm2 server
   So it give an extra layer security for an app. include the pm2-server
   file in your cloud instance itself. here we added for example.    
 
   Use HTTPS/SSL for security, We added helmet and cors setup for improving the 
   security purpose. Adding the secure level module in the middleware only never
   going to be make your application more secure its about how you are writing also
   to be consider. use csurf for prevent the CSRF attack. 
   
       Case Study:
          I have seen one web application there they written one api call for the 
        loginned User details by passing id in http query. Even that  id is in number format
        as 1001 when we changed the 1001 to 1002 it gave the details of another uses
        details. They can get the another user deta. Its became a CSRF loophole. They can get
        the data by any otherways like JWT token or Auth token. So Writing the code is need
        to be secured manner. Poor way of coding become a loophole.
        
   Don't make user ids in readable formats. its will helpful to enumrate  the other user. Study more
   about security improvement in [OWSAP](https://www.owasp.org/index.php/Web_Application_Security_Testing_Cheat_Sheet.)   
   
   Use Rate Limitter for avoid DDoS , brute force attack and dictionary attack on form datas like signin, OTP cracking. 
   We are already using the Helmet it will prevent some browser level attack.
    
   To imporve the low latency of IO calls we are using the Event emitters, async calls for 
   parallel and series asynchronus process.  
     
     
    
This project is refered from the following blog and some documents. 
[Reference](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf) 

 > Note : This project still in construction mode


