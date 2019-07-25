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




let addWatcherToAnIssue = (req, res) => {

    WatcherModel.findOne({ $and: [{ 'issueId': req.body.issueId }, { 'watcherEmail': req.body.watcherEmail }] })
        .select('-__v -_id')
        // .lean()
        .exec((err, issueDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'issueController: addWatcherToAIssue', 10)
                let apiResponse = response.generate(true, 'Failed to find  watcher details for given issueId', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(issueDetails)) {
                let newWatcher = new WatcherModel({
                    watcherId: shortid.generate(),
                    issueId: req.body.issueId,
                    watcherEmail: req.body.watcherEmail.toLowerCase(),
                    createdOn: time.now(),

                })
                newWatcher.save((err, newWatcher) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'issueController: addWatcherToAIssue', 10)
                        let apiResponse = response.generate(true, 'Failed to add as a watcher', 500, null)
                        res.send(apiResponse)
                    } else {
                        console.log("Added as a watcher");
                        logger.info("watcher Added", "issueController: addWatcherTOAIssue");
                        let apiResponse = response.generate(false, 'watcher Added', 200, newWatcher);
                        res.send(apiResponse);
                    }
                })
            } else {
                logger.error('Already added as watcher for this issue ', 'issueController: addAsWatcher', 4)
                let apiResponse = response.generate(true, 'Already added as watcher for this issue ', 403, null)
                res.send(apiResponse)
            }


        })
} // end of addWatcherTOAIssue function.



let getAllWatchersOfAnIssue = (req, res) => {
    WatcherModel.find({ 'issueId': req.params.issueId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'issueController:getAllWatchersOfAnIssue', 10)
                let apiResponse = response.generate(true, "Failed to find watcher for the issue", 500, null);
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Watcher Found', 'issueController:getAllWatchersOfAnIssue')
                let apiResponse = response.generate(true, 'No Watcher Found for the issue', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Watcher Found', 'issueController:getAllWatchersOfAnIssue')
                let apiResponse = response.generate(false, 'All Watcher Found Successfully', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getWatcher of An Idssue function.


module.exports = {
    addWatcherToAnIssue: addWatcherToAnIssue,
    getAllWatchersOfAnIssue: getAllWatchersOfAnIssue
}