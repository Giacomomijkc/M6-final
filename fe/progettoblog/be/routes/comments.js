const mongoose = require('mongoose');
const express = require('express');

const CommentsModel = require('../models/commentModel');
const PostsModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

const comment = express.Router();

comment.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentsModel.findById(id)
        .populate("post");

        if (!comment) {
            return res.status(404).send({
                statusCode: 404,
                message: `Comment with id ${id} not found`
            });
        }
        res.status(200).send({
            statusCode: 200,
            comment: comment,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server Error',
            error
        });
    }
});


comment.get('/comments', async (req, res) => {

    try {

        const comments = await CommentsModel.find()
        //.populate("posts")

        res.status(200).send({
            statusCode: 200,
            comments: comments,
        })
        
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

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

comment.delete('/comments/:id', async (req,res) => {
    const {id} = req.params;

    const commentExist = await CommentsModel.findById(id);

    if(!commentExist){
        res.status(404).send({
            statusCode: 404,
            message: `Comment with id ${id} not found`
        })
    }

    try {
        const deleteCommentById = await commentModel.findByIdAndDelete(id)

        res.status(201).send({
            statusCode: 201,
            message:`Comment with id ${id} successfully deleted`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

comment.patch('/comments/update/:id', async (req, res) => {

    const {id} = req.params;

    const commentExist = await CommentsModel.findById(id);

    if(!commentExist){
        res.status(404).send({
            statusCode: 404,
            message: `Comment with id ${id} not found`
        })
    }

    try {
        console.log(Object.keys(res.req))
        const dataToUpdate = req.body;
        const options = {new: true}

        const result = await CommentsModel.findByIdAndUpdate(id, dataToUpdate, options);
        console.log(dataToUpdate)


        res.status(202).send({
            statusCode: 202,
            message: `Comment with id ${id} successfully updated`,
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

module.exports = comment;