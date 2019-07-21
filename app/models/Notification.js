const mongoose = require('mongoose')
const Schema = mongoose.Schema

let notificationSchema = new Schema ({
    notificationId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },

    notificationIssueData:
    {
        type: Object,
        required:true

    },
    notificationStatus: {
        type: String,
        default: 'un-seen'
    },
    // notificationTitle: {
    //     type: String,
    //     default: ''
    // },
    // NotificationMessage: {
    //     // type: Object,
    //     // // default:''
    // },
    notificationMessage:Object,
    userEmailToSendNotification:{
        type: String,
        default: ''
    },
    notificationPurpose:{

        type: String,
        //default: ''
        
    }
})

module.exports = mongoose.model('Notification', notificationSchema)
