const connection = require('../config/connection');
const { getThoughts } = require('../controllers/thoughtController');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomReactions,getRandomAssignments } = require('./data');
const { ObjectId } = require('mongodb');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the users
  const users = [];
  const thoughts = []; // Create an array to hold thought documents
  const friends = []; // Create an array to hold thought documents

  // Loop 2 times -- add users to the users array
for (let i = 0; i < 3; i++) {


  const fullName = getRandomName();
  const username = fullName.split(' ')[0];
  const email = `${username}@gmail.com`;
    // Get some random assignment objects using a helper function that we imported from ./data
    const randomReactions = getRandomReactions(1,username);
    console.log(randomReactions);

    const randomThoughts = getRandomThoughts(2,username,randomReactions);
    console.log(randomThoughts);

    // Create thought documents and push them into the thoughts array
    const thoughtDocs = await Thought.create(randomThoughts);
    thoughts.push(...thoughtDocs);

  // // Create an array to hold the friends for the current user
  // const userFriends = [];

  // // Iterate through existing users to add them as friends for the current user
  // if (users.length > 0) {
  //   for (i = 0; i < users.length; i++) {
  //     console.log(users)
  //       // Exclude the current user itself from the friends list
  //       console.log("HIT")
  //       console.log(users[i])
  //       console.log(users[i]._id);
  //           userFriends.push(ObjectId(users[i]._id));
  
  //   }
  // }

      // Create an array to hold the friends for the current user
      const userFriends = [];

    // Check if there are existing users to add as friends
    if (users.length > 0) { // At least one other user is needed to be a friend
      // Iterate through other users to add them as friends for the current user
      for (const otherUser of users) {
          // Exclude the current user itself from the friends list
          if (otherUser !== users[i]) {
              userFriends.push(otherUser._id);
          }
      }
  }

  // Push the current user to the users array with their thoughts and friends
  users.push({
      username,
      email,
      thoughts: thoughtDocs.map(thought => thought._id), // Push thought IDs into user object
      friends: userFriends // Assign the array of friends to the current user
  });
}

// Add users to the collection and await the results
await User.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});