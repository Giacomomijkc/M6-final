const mongoose = require('mongoose')
const express = require('express')

const AuthorsModel = require('../models/authorModel');
const PostsModel = require('../models/postModel');
//const { authorsBodyParams, validatePostAuthor } = require('../middlewares/authorPostValidation');
//const {validatePatchBodyAuthors, validatePatchBodyAuthorMiddleware} = require('../middlewares/authorPatchValidations')

const author = express.Router()

author.get('/authors', async (req, res)  =>{
    try {
        const authors = await AuthorsModel.find()
        .populate("posts");

        res.status(200).send({
            statusCode: 200,
            authors: authors,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
});

author.get('/authors/:authorId', async (req, res) => {
    const { authorId } = req.params;

    try {
        const authorById = await AuthorsModel.findById(authorId);

        res.status(200).send({
            statusCode: 200,
            authorById,
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

author.get('/authors/:id/posts', async (req, res) => {
    const {id} = req.params;

    try {
        const findAuthor = await AuthorsModel.findById(id);

        const findPost = await PostsModel.find({"author.name": findAuthor.name});
    
        res.status(200).send({
            statusCode: 200,
            message: `posts of Author with id ${id} successfully finded`,
            findPost});
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error
        });
    }
})

//rimettere validazioni
author.post('/authors/create', async (req, res) => {
    const newAuthor = new AuthorsModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        avatar: req.body.avatar
    })

    try {
        const author = await newAuthor.save();

        res.status(201).send({
            statusCode: 201,
            message: 'Author successfully created',
            payload: author
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
author.patch('/authors/:authorId',async (req, res) => {
    const { authorId } = req.params;

    const authorExist = await AuthorsModel.findById(authorId);

    if(!authorExist){
        res.status(404).send({
            statusCode: 404,
            message: `Author with id ${authorId} not found`
        });
    }

    try {
        const id = authorId;
        const dataToUpdate = req.body;
        const options = {new: true}

        const result = await AuthorsModel.findByIdAndUpdate(id, dataToUpdate, options);

        res.status(200).send({
            statusCode: 200,
            message: `Author with id ${id} successfully edited`,
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

author.delete('/authors/:authorId', async (req, res) => {
    const { authorId } = req.params;

    const authorExist = await AuthorsModel.findById(authorId);

    if(!authorExist){
        res.status(404).send({
            statusCode: 404,
            message: `Author with id ${authorId} not found`
        });
    }

    try {
        const deleteAuthorById = await AuthorsModel.findByIdAndDelete(authorId)

        res.status(200).send({
            statusCode: 200,
            message: `Author with id ${authorId} successfully deleted`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message:'Internal server Error ',
            error,
        });
    }
})

module.exports = author;