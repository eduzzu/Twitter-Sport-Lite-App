const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Tweet = require('./models/tweet');

mongoose.connect('mongodb://localhost:27017/tweetsApp')
    .then(() => {
        console.log('Mongo connection open');
    })
    .catch((err) => {
        console.log('Issue with mongo');
        console.log(err);
    });



app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const categories = ['Football', 'Formula 1', 'MotoGP', 'Basketball', 'Handball', 'Snooker', 'Rugby'];


app.get('/tweets', async (req, res) => {
    const { category } = req.query;
    try {
        let posts;
        if (category) {
            posts = await Tweet.find({ category });
        } else {
            posts = await Tweet.find({});
        }
        res.render('tweets/home', { posts, category: category || 'All' });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/tweets/newPost', (req, res) => {
    res.render('tweets/addPost', { categories });
});

app.post('/tweets', async (req, res) => {
    try {
        const newTweet = new Tweet(req.body);
        await newTweet.save();
        res.redirect(`/tweets/${newTweet._id}`);
    } catch (error) {
        console.error('Error adding new tweet:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tweets/categories', (req, res) => {
    const { category } = req.params;
    res.render('tweets/categories', { category, categories });
});

app.get('/tweets/newCategory', (req, res) => {
    res.render('tweets/addCategory');
});

app.post('/tweets/categories', (req, res) => {
    const category = req.body.categoryName;
    let isPresent = categories.includes(category);
    if(!isPresent){
        categories.push(category);
    } else{
        res.send(`${category} already exists!`)
    }
    res.redirect('/tweets/categories');
});



app.get('/tweets/editCategory', async (req, res) => {
    const { category } = req.params;
    const post = await Tweet.find({ category })
    res.render('tweets/editCategory', { post, category, categories })
})



app.get('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Tweet.findById(id);
        res.render('tweets/post', { post });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/tweets/:id/editPost', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Tweet.findById(id);
        res.render('tweets/editPost', { post, categories });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Tweet.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.redirect(`/tweets/${post._id}`);
    } catch (error) {
        console.error('Error updating tweet:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/tweets/:id', async (req, res) => {
    const { id } = req.params;
    const deletedTweet = await Tweet.findByIdAndDelete(id);
    res.redirect('/tweets');
});


app.listen(3000, () => {
    console.log('Serverul rulează pe portul 3000');
});
