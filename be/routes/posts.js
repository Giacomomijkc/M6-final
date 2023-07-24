const mongoose = require('mongoose');
const express = require('express');

const PostsModel = require('../models/postModel');
const AuthorsModel = require('../models/authorModel');
//const { postsBodyParams, validatePostBody } = require('../middlewares/postPostValidation');
//const { validatePatchBody, validatePatchBodyMiddleware } = require('../middlewares/postPatchValidation');

const post = express.Router();


post.get('/posts/title', async (req, res) => {

    const {postTitle} = req.query;

    try {
        const postByTitle = await PostsModel.find({
            title: {
                $regex: '.*' + postTitle + '.*',
                $options: 'i'
            },
        });

        if(!postByTitle || postByTitle.length<= 0){
            res.status(404).send({
                statusCode: 404,
                message:`post with title ${postTitle} not found`
            })
        }

        res.status(200).send({
            statusCode:200,
            postByTitle,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error,
        });
    }
})


post.get('/posts', async (req,res) => {

    try {
        const posts = await PostsModel.find()
        .populate("author")
        .populate("comments")

        res.status(200).send({
            statusCode: 200,
            posts: posts,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }

});

post.get('/posts/:postId', async (req, res) => {
    const {postId} = req.params;

    const postExist = await PostsModel.findById(postId);

    if (!postExist){
        res.status(400).send({
            statusCode: 400,
            message: `Post with id ${postId} not found`
        })
    }

    try {
        const postById = await PostsModel.findById(postId);

        res.status(200).send({
            statusCode: 200,
            postById
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

//rimettere validazione
post.post('/posts/create', async (req, res) => {

    const author = await AuthorsModel.findOne({_id: req.body.author});

    if(!author){
        return res.status(400).send({
            statusCode: 400,
            message:`Author with id ${_id} not found`
        })
    }

    const newPost = new PostsModel({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: {
            value: req.body.readTime.value,
            unit: req.body.readTime.unit,
          },
        author: author._id,
        content: req.body.content,
    })

    try {
        const post = await newPost.save();

        await AuthorsModel.updateOne({_id: author.id}, {$push: {posts: post}});

        res.status(201).send({
            statusCode: 201,
            message: 'Post succesfully created',
            payload: post
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

post.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    const postExist = await PostsModel.findById(postId);

    if (!postExist){
        res.status(400).send({
            statusCode: 400,
            message: `Post with id ${postId} not found`
        })
    }

    try {
        const deletePostById = await PostsModel.findByIdAndDelete(postId);

        res.status(202).send({
            statusCode: 202,
            message: `Post with id ${postId} successfully deleted`,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

//rimettere validazioni
post.patch('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    const postExist = await PostsModel.findById(postId);

    if (!postExist){
        res.status(400).send({
            statusCode: 400,
            message: `Post with id ${postId} not found`
        })
    }

    try {
        const dataToUpdate = req.body;
        const options = {new: true}

        const result = await PostsModel.findByIdAndUpdate(postId, dataToUpdate, options);

        res.status(202).send({
            statusCode: 202,
            message: `Post with id ${postId} successfully updated`,
            result
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

module.exports = post;
