const mongoose = require('mongoose');
const express = require('express');

const CommentsModel = require('../models/commentModel');
const PostsModel = require('../models/postModel');

const comment = express.Router();

comment.post('/comments/create', async (req,res) => {

    const post = await PostsModel.findOne({_id: req.body.post});

    if(!post){
        return res.status(400).send({
            statusCode: 400,
            message:`Post with id ${_id} not found`
        })
    }

    const newComment = new CommentsModel({
        rate: req.body.rate,
        content: req.body.content,
        post: req.body.cover,
        post: post._id,
    })

    try {
        const comment = await newComment.save();

        await PostsModel.updateOne({_id: post._id}, {$push: {comments: comment}});

        res.status(201).send({
            statusCode: 201,
            message: `Comment succesfully created`,
            payload: comment
        })
        
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

module.exports = comment;