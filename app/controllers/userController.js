const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
/* Models */
const UserModel = mongoose.model('User')


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meets the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, 'password parameter is missing', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {

                    console.log("the details heres in signup are",retrievedUserDetails)
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userName: req.body.email.toLowerCase(),
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpasswordUsingMd5(req.body.password),
                            
                            localLoginFlag: true
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else{
                        if (retrievedUserDetails.socialLoginFlag == true && retrievedUserDetails.localLoginFlag == false) {

                            console.log("in check condition".retrievedUserDetails)
                            retrievedUserDetails.password = passwordLib.hashpasswordUsingMd5(req.body.password)
                            retrievedUserDetails.localLoginFlag = true;
                            retrievedUserDetails.mobileNumber = req.body.mobileNumber;
                           
                            retrievedUserDetails.save((err, updatedDetails) => {
                                if (err) {
                                    console.log(err)
                                    logger.error(err.message, 'userController: createUser->updateInfo', 10)
                                    let apiResponse = response.generate(true, 'Failed to update info the  User', 500, null)
                                    reject(apiResponse)
                                }
                                else {
                                    logger.info('user Info udated to login locally', 'userController:createUser->updateInfo', 10)
                                    let newUserObj = updatedDetails.toObject();
                                    resolve(newUserObj)
                                }
                            })
    
                        }
                        else {
                            logger.error('User Already Present With this Email both locally & socially', 'userController: createUser', 4)
                            let apiResponse = response.generate(true, 'User Already Present With this Email both locally & socially', 403, null)
                            reject(apiResponse)
                        }
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created or updated', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        if (userDetails.localLoginFlag == false) {
                            logger.info('signup to login successfully', 'userController: findUser()', 10)
                            let apiResponse = response.generate(true, 'You are a social user not local user, first signup to login locally', 400, null)
                            reject(apiResponse)
                        } else {
                            /* prepare the message and the api response here */
                            logger.info('User Found', 'userController: findUser()', 10)
                            resolve(userDetails)
                        }
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'email parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    // end of find user function

    let validatePassword = (retrievedUserDetails) => {
        console.log(retrievedUserDetails);

        return new Promise((resolve, reject) => {



            let checkToken = passwordLib.comparePasswordGenerated(req.body.password, retrievedUserDetails.password);
            if (checkToken === true) {
                let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                delete retrievedUserDetailsObj.password
                delete retrievedUserDetailsObj._id
                delete retrievedUserDetailsObj.__v
               
                console.log(retrievedUserDetailsObj);
                resolve(retrievedUserDetailsObj)
            } else {

                logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                let apiResponse = response.generate(true, 'Wrong Password, Login Failed', 400, null)
                reject(apiResponse)

            }
        })
    }
    // end of validatePassword() function.

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                    console.log("token is generated");
                }
            })
        })
    }
    // end of generateToken() function.

    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }
    // end of saveToken() function.

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}


// end of the login function 


let logout = (req, res) => {

    AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })

    

} // end of the logout function.



let getAllUserOnSystem = (req,res) =>{
        
                UserModel.find()
                    .exec((err,details) =>{
                        if(err){
                            logger.error(err.message, 'userController: getAllUserOnSystem', 10)
                            let apiResponse = response.generate(true, 'Failed To find  Users', 500, null)
                            res.send(apiResponse)
                        } else if(check.isEmpty(details)){
                            logger.info('no local user found', 'userController: getAllUserOnSystem');
                            let apiResponse = response.generate(false, 'no user Found on syatem', 404, details)
                            res.send(apiResponse)
                        } else{
                            let apiResponse = response.generate(false, ' user Found on system', 200, details)
                            res.send(apiResponse)
                        }
                    })
            
    }




    let getSingleUserInfo = (req, res) => {
        UserModel.findOne({ 'userId': req.params.userId })
            .select('-password -__v -_id')
            .lean()
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: getSingleUserInfo', 10)
                    let apiResponse = response.generate(true, 'Failed to find  user details', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No user found', 'userController: getSingleUserInfo')
                    let apiResponse = response.generate(true, 'No user found', 404, null)
                    res.send(apiResponse)
                    
                } else {
                    logger.info(' User Info Found', 'userController: getSingleUserInfo')
                    let apiResponse = response.generate(false, ' User Details Found', 200, result)
                    res.send(apiResponse)
                }
            })
    } // end of getSingleUserInfo function.


    let socialLogin =(req,res) =>{

        let getUserDetails =()=>{
            return new Promise ((resolve,reject)=>{
    
    
                if(check.isEmpty(req.user)) {
    
                    logger.error('User Details  Passed is empty', 'userController: socilaSignin()', 7)
                    let apiResponse = response.generate(true, 'No User Details Found Or empty', 404, null)
                    reject(apiResponse)
    
                }
                else{
    
                    let userObj = req.user.toObject()
    
                    delete userObj.password
                    delete userObj._id
                    delete userObj.__v
        
        
                    resolve(userObj);
        
    
                }
               
    
            })
        } //end of filterUserDeatails
    
    
    
        let generateToken = (userDetails) => {
            
            return new Promise((resolve, reject) => {
                token.generateToken(userDetails, (err, tokenDetails) => {
                    if (err) {
                        console.log(err)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        tokenDetails.userId = userDetails.userId
                        tokenDetails.userDetails = userDetails
                        resolve(tokenDetails)
                        console.log("token is generated");
                    }
                })
            })
        }
        // end of generateToken() function.
    
    
        let saveToken = (tokenDetails) => {
            console.log("save token");
            return new Promise((resolve, reject) => {
                AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                    if (err) {
                        console.log(err.message, 'userController:socialLogin- saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To find&save Token', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedTokenDetails)) {
                        let newAuthToken = new AuthModel({
                            userId: tokenDetails.userId,
                            authToken: tokenDetails.token,
                            tokenSecret: tokenDetails.tokenSecret,
                            tokenGenerationTime: time.now()
                        })
                        newAuthToken.save((err, newTokenDetails) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController:socialLogin- saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To save Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    } else {
                        retrievedTokenDetails.authToken = tokenDetails.token
                        retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                        retrievedTokenDetails.tokenGenerationTime = time.now()
                        retrievedTokenDetails.save((err, newTokenDetails) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: sociallogin-saveToken', 10)
                                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                                reject(apiResponse)
                            } else {
                                let responseBody = {
                                    authToken: newTokenDetails.authToken,
                                    userDetails: tokenDetails.userDetails
                                }
                                resolve(responseBody)
                            }
                        })
                    }
                })
            })
        }
        // end of saveToken() function.
    
    
        filterUserDetails(req,res)
        .then(generateToken)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, ' Social Login Successful', 200, resolve)
                res.status(200)
                // res.send(apiResponse)
    
                res.redirect(`http://www.bhaiyaji.club:4200/loggedin/${apiResponse.data.authToken}`)
                // console.log("response send on successful social login",res)
            })
            .catch((err) => {
                console.log("errorhandler");
                console.log(err);
                res.status(err.status)
                res.send(err)
            })
    
    
    
    
    
    
    }



    let getInfoForToken =(req,res) =>{

        console.log("token in req",req.query.authToken)
    
    
        let findInAuthModel = () =>{
    
            return new Promise((resolve,reject) =>{
                AuthModel.findOne({authToken:req.query.authToken},(err,result)=>{
                    if(err)
                    {
                        logger.error(err.message, 'userController: getInfoForToken', 10)
                            let apiResponse = response.generate(true, 'Failed to find  user details of given tocken', 500, null)
                            reject(apiResponse)
        
                    } else if (check.isEmpty(result))
                    {
                        logger.error('No Details Found for token', 'userController: getInfoForToken()', 7)
                                let apiResponse = response.generate(true, 'No User Details Found for token', 404, null)
                                reject(apiResponse)
                    }
        
                    else {
                        console.log("token details found",result)
                        resolve(result)
                    }
        
                })
    
            })
    
           
        }
    
        let findUserInfoFromTokenDetails =(tokenDetails)=>{
    
    
            return new Promise((resolve,reject) =>{
    
                token.verifyClaimWithoutSecret(tokenDetails.authToken,(err,decoded)=>{
                    if (err)
                    {
                        logger.error(err.message, 'userController: getInfoForToken', 10)
                        let apiResponse = response.generate(true, 'Failed to find verify token for user details of given tocken', 500, null)
                        reject(apiResponse)
        
                    }
                    else{
        
                        console.log("user data after decoding",decoded)
                        resolve(decoded)
                    }
                })
    
            })
    
            
        }
    
        findInAuthModel(req,res)
        .then(findUserInfoFromTokenDetails)
        .then((resolve)=>{
            let apiResponse = response.generate(false, 'get User Details', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
    
    
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
    
        
    }





    



module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    getAllUserOnSystem:getAllUserOnSystem,
    getSingleUserInfo:getSingleUserInfo,
    socialLogin:socialLogin,
    logout: logout,
    getInfoForToken

}// end exports