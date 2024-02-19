# Social Network API

## Description

This application uses a NoSQL database, specifically MongoDb, with Mongoose, to create a Social Media API. A new user can be added, thoughts can be added to a user, and reactions can be added to thoughts. The API allows for all CRUD (Create, Read, Update, Delete) operations. 

## Github code
https://github.com/jalland/socialNetworkAPI 


## Link to Video Demonstration
Note that I had a bit of trouble at the end of the video with the adding/deleting reaction because I had the wrong ID values. I fixed them in the video so it would work. 
https://drive.google.com/file/d/185Tzv1QgFI-m8jsZTOKTyHpbZH-WfPmH/view

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

