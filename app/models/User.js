'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName:{
    type: String,
    default: ''
  },
  userName:{
    type: String,
    default:'',
    unique:true
  },
  
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  
  
  
  socialLoginFlag :{
    type:Boolean,
    default:false
  },

  localLoginFlag :{
    type:Boolean,
    default:false
  }


})


mongoose.model('User', userSchema);