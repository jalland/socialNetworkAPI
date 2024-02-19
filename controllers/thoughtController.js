const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
    const thought = await Thought.create(req.body);

    // Find the user and update their thoughts array
    const updateUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

      res.json(updateUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(500).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.json({ message: 'No thought with this id!' });
      }
      else{
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
 //Add a reaction to a thought
  async addReaction(req, res){
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      
    } catch (error) {
      res.status(500).json(err);
    }
  },

  //delete a reaction from a thought
async deleteReaction(req, res){
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { runValidators: true, new: true } 
    );

    if (!thought) {
      res.json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    
  } catch (error) {
    res.status(500).json(err);
  }
}

};

