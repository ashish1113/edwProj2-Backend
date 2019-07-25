const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const passwordLib = require('../libs/generatePasswordLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const events = require('events');
const eventEmitter = new events.EventEmitter();

/* Models */
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');

const IssueModel = mongoose.model('Issues');
const CommentModel = mongoose.model('Comment');
const WatcherModel = mongoose.model('Watcher');
const NotificationModel = mongoose.model('Notification')



function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (var value of array) {
        if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

//for issue create

let createANewNotificationObj = (issueDetails) => {

    NotificationModel.findOne({ 'notificationIssueData.issueId': issueDetails.issueId, notificationPurpose: "create" }, (err, result) => {

        if (err) {
            console.log(err);
            logger.error(err.message, 'notificationController: createANewnotificationObj', 10)

        } else if (check.isEmpty(result)) {

            let peopleToSendNotification = [issueDetails.reporterEmail, issueDetails.assigneeEmail]
            peopleToSendNotification = getUnique(peopleToSendNotification)


            let flag = 0
            let len = peopleToSendNotification.length

            for (let x of peopleToSendNotification) {
                let newnotificationObj = new NotificationModel({
                    notificationId: shortid.generate(),
                    notificationIssueData: issueDetails,
                    notificationStatus: "un-seen",
                    notificationMessage: `hey a new issue is created with IssueId${issueDetails.issueId} by ${issueDetails.reporterName}`,
                    notificationPurpose: 'create',
                    userEmailToSendNotification: x

                })

                newnotificationObj.save((err, result) => {
                    if (err) {
                        console.log("error while saving notifiction: ", err)
                        logger.error(err.message, 'notificationController: createNewNotification', 10)

                    } else {
                        flag++;
                        console.log("notificationObj Created & saved successfully", result)
                        logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                    }
                })
            }


            if (flag != len) {

                console.log("not !all notifications created successfully for create event of the issues")
            }
            else {
                console.log("all notifications created successfully for create event of the issues")
            }
        }

        else {
            console.log("notification obj allready exists for the purpose ", err)
            logger.error('notification obj allready exists for the purpose', 'notificationController: createNewNotification', 10)

        }

    })

}


let createANewNotificationObjOnEdit = (issueDetails) => {



    console.log("to check issue cdetails in notifyOnEdit", issueDetails)

    let peopleToSendNotification = [];

    let findThePeopleToSendfromWatcherList = (issueDetails) => {
        return new Promise((resolve, reject) => {
            console.log("details inside function notification edit -22222222222", issueDetails);
            WatcherModel.find({ issueId: issueDetails.issueId }, (err, result) => {

                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnEdit', 10)
                    let apiResponse = response.generate(true, 'error while find the watcher  details', 400, null)
                    reject(apiResponse)
                }

                else {
                    console.log('result  to send in edit', result)
                    for (let x in result) {
                        peopleToSendNotification.push(result[x].watcherEmail)

                    }
                    console.log("issue Details here in edit", issueDetails)
                    let issueDetailsObj = issueDetails.toObject();
                    issueDetailsObj.peopleToSendList = peopleToSendNotification
                    console.log("issue Details here in edit objectified", issueDetailsObj)

                    issueDetailsObj.peopleToSendList.push(issueDetailsObj.assigneeEmail, issueDetailsObj.reporterEmail)

                    issueDetailsObj.peopleToSendList = getUnique(issueDetailsObj.peopleToSendList)
                    resolve(issueDetailsObj)
                }
            })

        })



    }

    // fun to create notification and save notification to be written here
    let createAndSaveNotificationObj = (finalIssueObj) => {

        console.log("final issueObj", finalIssueObj)

        return new Promise((resolve, reject) => {

            let flag = 0
            let len = finalIssueObj.peopleToSendList.length
            for (let x of finalIssueObj.peopleToSendList) {

                let newnotificationObj = new NotificationModel({
                    notificationId: shortid.generate(),
                    notificationIssueData: finalIssueObj,
                    notificationStatus: "un-seen",
                    notificationMessage: `hey  something Updated in Issue with issueId: ${finalIssueObj.issueId}`,
                    notificationPurpose: 'edit',
                    userEmailToSendNotification: x

                })


                newnotificationObj.save((err, result) => {
                    if (err) {
                        console.log("error while saving notifiction: ", err)
                        logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)


                    } else {
                        flag++;
                        console.log("notificationObj Created successfully On issue-Edit", result)
                        logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)

                    }
                })

            }

            if (flag != len) {

                reject("not !all notifications created successfully for edit event of the issues")
            }
            else {
                resolve("all notifications created successfully for edit event of the issues")
            }



        })




    }

    findThePeopleToSendfromWatcherList(issueDetails)
        .then(createAndSaveNotificationObj)
        .then((resolve) => {

            console.log("notificationObj Created successfully On issue-Edit", resolve)
            logger.info("notificationObj Created successfully", 'notificationController: createANewNotificationObjOnEdit', 1)

        })

        .catch((err) => {

            console.log(err);

            //logger ka dekhna hai
            logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)
        })


}

let createNotificationObjOnComment = (commentData) => {

    console.log("commentData in createNotification", commentData)
    let peopleToSendNotification = [];

    let toSetUserEmailTOSendNotification = (commentData) => {

        console.log("commentData in createNotification->78---------------------------------", commentData)

        return new Promise((resolve, reject) => {

            WatcherModel.find({ issueId: commentData.relatedIssuesId }, (err, result) => {


                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnCommentCreate', 10)
                    let apiResponse = response.generate(true, 'error while find the watcher  details', 400, null)
                    reject(apiResponse)
                }
                else {
                    console.log("notificationObj Created whatcher search On comment", result)

                    for (let x in result) {
                        peopleToSendNotification.push(result[x].watcherEmail)

                    }


                    let commentDataObj = commentData.toObject()
                    commentDataObj.peopleToSendList = peopleToSendNotification
                    console.log("commentData in createNotification-resolve", commentDataObj)
                    resolve(commentDataObj)
                }

            })


        })

    }

    let addAssigneeAndReporter = (commentData) => {

        console.log("commentData in createNotification -> add AssigneeAndReporter", commentData)
        return new Promise((resolve, reject) => {

            IssueModel.findOne({ issueId: commentData.relatedIssuesId }, (err, result) => {
                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnCommentCreate', 10)
                    let apiResponse = response.generate(true, 'error while find the assignee reporter  details', 400, null)
                    reject(apiResponse)
                }
                else {
                    commentData.issueData = result
                    commentData.peopleToSendList.push(result.reporterEmail, result.assigneeEmail)
                    commentData.peopleToSendList = getUnique(commentData.peopleToSendList)
                    resolve(commentData)
                }

            })
        })
    }
    let createAndSaveNotificationObj = (commentData) => {
        return new Promise((resolve, reject) => {
            console.log("commentData in createNotification -> createAndsave", commentData)
            console.log("commentData type", typeof commentData)
            let flag = 0
            let len = commentData.peopleToSendList.length

            for (let x of commentData.peopleToSendList) {
                let newNotificationObj = new NotificationModel({

                    notificationId: shortid.generate(),
                    notificationIssueData: commentData.issueData,
                    notificationStatus: "un-seen",
                    notificationMessage: `hey ${commentData.commenter} commented on the issue with id ${commentData.relatedIssuesId} on ${commentData.createdOn}`,
                    notificationPurpose: 'comment-create',
                    userEmailToSendNotification: x

                })

                newNotificationObj.save((err, result) => {

                    if (err) {
                        console.log("error while saving notifiction:obj -comment-create ", err)
                        logger.error(err.message, 'notificationController: createNewNotificationObjFor-CommentCreate', 10)

                    } else {
                        flag++
                        console.log("notificationObj Created successfully On comment-create", result)
                        logger.info("notificationObj Created successfully", 'notificationController: CommentCreate', 1)
                        // resolve (result)
                    }

                })

            }

            if (flag != len) {
                let apiResponse = response.generate(true, 'ther is no watcher for the given issue', 400, null)
                reject(apiResponse)
            }
            else {
                resolve("all notification obj created successfully on comment create")
            }
        })

    }

    toSetUserEmailTOSendNotification(commentData)
        .then(addAssigneeAndReporter)
        .then(createAndSaveNotificationObj)

        .then((resolve) => {
            console.log("all notificationObj Created successfully On comment-create", resolve)
            logger.info("all notificationObj Created successfully", 'notificationController: createANewNotificationObjOnEdit', 1)

        })

        .catch((err) => {
            console.log(err);

            //logger ka dekhna hai
            logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)
        })





}

let markNotificationAsSeen = (req, res) => {
    console.log("notification id is:", req.query.notificationId)


    let options = {
        notificationStatus: "seen"

    }


    NotificationModel.findOneAndUpdate({ 'notificationId': req.query.notificationId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'notificationController: markAsSeen', 10)
            let apiResponse = response.generate(true, 'Failed To edit notification details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'notificationController: markAsSeen')
            let apiResponse = response.generate(true, 'No notification Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log("Marked As Seen");
            let apiResponse = response.generate(false, "Marked As Seen", 200, result)

            res.send(apiResponse)
            console.log(result);
        }
    })

}

module.exports = {
    createANewNotificationObj: createANewNotificationObj,
    createANewNotificationObjOnEdit: createANewNotificationObjOnEdit,
    createNotificationObjOnComment: createNotificationObjOnComment,
    markNotificationAsSeen: markNotificationAsSeen
}