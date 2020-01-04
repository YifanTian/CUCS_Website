const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    // id: String,
    id: Number,
    title: String,
    name: String,
    description: String,
    answers: [],
    author: String,
});

module.exports = mongoose.model('Post', postSchema, 'post');
