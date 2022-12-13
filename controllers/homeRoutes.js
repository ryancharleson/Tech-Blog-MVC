const { userInfo } = require('os');
const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');


router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post', (req, res) => {

    res.render('create-post', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');

});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment, 
                attributes: ['comment_text', 'id', 'post_id', 'user_id', 'created_at']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No posts found using this ID' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({

        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'id', 'post_id', 'user_id', 'created_at'],

            }

        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get ({ plain: true }));
        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;