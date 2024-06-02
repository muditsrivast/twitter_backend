const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/twitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { versionKey: false });

const tweetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, 'jwt_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});

app.post('/api/tweets', async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const tweet = new Tweet({ userId: objectId, text });
    await tweet.save();
    res.status(201).json({ message: 'Tweet posted', tweet });
  } catch (error) {
    res.status(400).json({ message: 'Posting tweet failed', error: error.message });
  }
});

app.get('/api/users/:userId/timeline', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit, lastTweetId } = req.query;

    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }

    let query = { userId: new mongoose.Types.ObjectId(userId) };
    if (lastTweetId) {
      if (!isValidObjectId(lastTweetId)) {
        throw new Error('Invalid lastTweetId');
      }
      query._id = { $lt: new mongoose.Types.ObjectId(lastTweetId) };
    }

    let tweetsQuery = Tweet.find(query).sort({ createdAt: -1 });
    if (limit) {
      tweetsQuery = tweetsQuery.limit(parseInt(limit, 10));
    }

    const tweets = await tweetsQuery.exec();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(400).json({ message: 'Fetching timeline failed', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
