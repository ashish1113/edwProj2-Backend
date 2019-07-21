const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const issueController = require("./../../app/controllers/issueController");
const commentController = require("./../controllers/commentController");
const watcherController = require("./../controllers/watcherController");
const  notificationController = require("./../controllers/notificationController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const multerLib = require('./../multer/multer')
const passport = require('passport')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')


module.exports.setRouter = (app,passport) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);

    //for passport-----------------------------------------------------------------

    app.get('/login/facebook', 
		passport.authenticate('facebook', { scope : ['email'] }
	));

	// handle the callback after facebook has authenticated the user
	app.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
    );
    // app.get('/api/logout', (req, res)=>{
    //     req.logout();
        

    //     res.redirect('/login/facebook');
        
    // })

   
    app.get('/home',(req,res)=>{
        console.log("00000000000000000",req.session);
        res.send("hello"+req.user);
    })

    app.get('/logout', function(req, res){
        req.logout();
        console.log("00000000000000000",req);
        res.send(req.logout());
      });

      app.get(`${baseUrl}/view/allUsers`, auth.isAuthorized, userController.getAllUserOnSystem);

      app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUserInfo);

      // _______________ route for issue. _______________________________.


      app.post(`${baseUrl}/create/issue`, auth.isAuthorized, multerLib.upload.single('image'), issueController.createNewIssue);

      app.get(`${baseUrl}/get/allIssues`, auth.isAuthorized, issueController.getAllIssueOnSystem);

      app.get(`${baseUrl}/userIssues/:email`, auth.isAuthorized, issueController.getAllAssingedIssueOfAUser);

      app.get(`${baseUrl}/issueDetails/:issueId`, auth.isAuthorized, issueController.getSingleIssueDetails);

      app.put(`${baseUrl}/editIssue/:issueId`, auth.isAuthorized, multerLib.upload.single('image'), issueController.editAnExistingIssue);


       // _______________________route for comment. ________________________.

       app.post(`${baseUrl}/create/comment`, auth.isAuthorized, commentController.createNewComment);


       app.get(`${baseUrl}/:issueId/view/comment`, auth.isAuthorized, commentController.readComment);

        // _______________________route for watcher. _________________________.



        app.post(`${baseUrl}/add/as/watcher`, auth.isAuthorized, watcherController.addWatcherToAnIssue);



        app.get(`${baseUrl}/:issueId/get/watcherList`, auth.isAuthorized, watcherController.getAllWatchersOfAnIssue);


        // _______________________ route for search. ___________________________.



        app.get(`${baseUrl}/issue/:text/search`, auth.isAuthorized, issueController.searchIssue);




//to be tested laterr
        app.get(`${baseUrl}/mark/notification/seen`, auth.isAuthorized, notificationController.markNotificationAsSeen);






    //routes for passport-->socialLogin------------------------------------------------

//     app.get('/login/facebook',
//     passport.authenticate('facebook', { scope: ['email'] }
//     ));

// // handle the callback after facebook has authenticated the user
// app.get('/login/facebook/callback',
//     passport.authenticate('facebook', {
//         // successRedirect : '/',
//         // failureRedirect: '/home'
//     }), userController.socialSignin
// );
// app.get('/api/logout', (req, res) => {
//     // req.logout();
//     // res.redirect('/');
//     res.send(req.logout());

// })


app.get(`${baseUrl}/get/Details/full`,userController.getInfoForToken)

}
