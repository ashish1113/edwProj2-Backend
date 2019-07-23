const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')

/* Models */
const AuthModel = mongoose.model('Auth')
const IssueModel = mongoose.model('Issues')

const CommentModel = mongoose.model('Comment');
const WatcherModel = mongoose.model('Watcher');

const events = require('events');
const eventEmitter = new events.EventEmitter();


const notificationController = require ('./notificationController')

let createNewComment = (req, res) => {

    let verifyIssueAndEmailGiven = () => {

        return new Promise((resolve, reject) => {
            if (req.body.commenterEmail && req.body.issueId) {
                if (!(validateInput.Email(req.body.commenterEmail))) {
                    let apiResponse = response.generate(true, 'commenterEmail doesnot fulfill the requirement', 400, null)
                    reject(apiResponse)
                }
                else {
                    IssueModel.findOne({ issueId: req.body.issueId })
                        .select('-__v -_id')
                        // .lean()
                        .exec((err, result) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'issueController: createNewComment', 10)
                                let apiResponse = response.generate(true, 'issueId not found', 500, null)
                                reject(apiResponse)
                            } else if (check.isEmpty(result)) {
                                logger.info('No issue Found', 'issueController: createNewComment')
                                let apiResponse = response.generate(true, 'No issue Found', 404, null)
                                reject(apiResponse)
                            }
                            else {
                                let newCommentsDetails = {
                                    issueId: req.body.issueId,
                                    comment: req.body.comment,
                                    commenter: req.body.commenter,
                                    commenterEmail: req.body.commenterEmail,
                                }
                                resolve(newCommentsDetails)
                            }
                        })

                }
            }
            else {
                logger.error('Email or issueId  Missing During comment Creation', 'IssueController: createNewComment()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }



        })

    }

    let writeComment = (commentDetails) => {
        return new Promise((resolve, reject) => {

            let newComment = new CommentModel({
                commentId: shortid.generate(),
                relatedIssuesId: commentDetails.issueId,
                comment: commentDetails.comment,
                commenter: commentDetails.commenter,
                commenterEmailId: commentDetails.commenterEmail,
                createdOn: time.now()
            })
            newComment.save((err, newComment) => {
                if (err) {
                    console.log("error while saving new comment: ", err)
                    logger.error(err.message, 'issueController: writeComment', 10)
                    let apiResponse = response.generate(true, 'Failed to save new comment', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(newComment)) {
                    console.log("no comment found");
                    logger.info('No comment Found', 'issueController: writeComment')
                    let apiResponse = response.generate(true, 'No Comment Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log("comment created");
                    logger.info("comment created", "issueController: writeComment");
                    let apiResponse = response.generate(false, 'Commented successfully', 200, newComment);
                     eventEmitter.emit("comment-write", newComment);
                    resolve(newComment);
                }
            })

        })

    }

    verifyIssueAndEmailGiven(req, res)
        .then(writeComment)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Commented created&saved successfully', 200, resolve);
            res.send(apiResponse)
        })



}


eventEmitter.on("comment-write", (commentData) => {
      console.log("data in comment event on ",commentData)
    IssueModel.findOne({ 'issueId': commentData.relatedIssuesId })
    .select('-__v -_id')

    .exec((err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'commentController: eventEmitter.on-> new comment created', 10)
            // let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
            // res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue found', 'commentController: eventEmitter.on-> new comment created')
            // let apiResponse = response.generate(true, 'No issue found', 404, null)
            // res.send(apiResponse)
        } else {
            logger.info('Issue found', 'commentController: eventEmitter.on-> new comment created');

            // console.log("resul t in event emmiter",result)
            notificationController.createNotificationObjOnComment(commentData)
            // let apiResponse = response.generate(false, 'Issue details found', 200, result)
            // res.send(apiResponse)
        }
    })

// notificationController.createANewNotificationObjOnEdit(issueData)




})


let readComment = (req, res) => {

    CommentModel.find({ 'relatedIssuesId': req.params.issueId })
        .select('-__v -_id')
        .sort('-createdOn')
        .skip(parseInt(req.query.skip) || 0)
        .lean()
        .limit(10)
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'issueController: viewComment', 10)
                let apiResponse = response.generate(true, 'Failed to find comment with this issueId', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No comment found', 'issueController: viewComment')
                let apiResponse = response.generate(true, 'No comment found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Comment Found', 'issueController: viewComment')
                let apiResponse = response.generate(false, 'comment Found', 200, result)
                res.send(apiResponse)
            }
        })



}


module.exports ={
    createNewComment:createNewComment,
    readComment:readComment

}