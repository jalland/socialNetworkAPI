const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, 
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          // Use regular expression to check email format
          return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought' // Reference to the Thought model
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' // Self-reference to the User model
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
