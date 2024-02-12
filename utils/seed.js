const connection = require('../config/connection');
const { getThoughts } = require('../controllers/thoughtController');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomAssignments } = require('./data');

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

  // Loop 2 times -- add users to the users array
  for (let i = 0; i < 2; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const randomThoughts = getRandomThoughts(2);
    // Create thought documents and push them into the thoughts array
    const thoughtDocs = await Thought.create(randomThoughts);
    thoughts.push(...thoughtDocs);

    const fullName = getRandomName();
    const username = fullName.split(' ')[0];
    const email = `${username}@gmail.com`;

    users.push({
      username,
      email,
      thoughts: thoughtDocs.map(thought => thought._id), // Push thought IDs into user object
    });
  }

  // Add users to the collection and await the results
  await User.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});