'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    commentId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    relatedIssuesId: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
        default: ''
    },
    commenter: {
        type: String,
        default: ''
    },
    commenterEmailId: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ""
    }
})

module.exports = mongoose.model('Comment', commentSchema);