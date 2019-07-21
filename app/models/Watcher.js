const mongoose = require('mongoose')
const Schema = mongoose.Schema

let watcherSchema = new Schema({
    watcherId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    issueId: {
        type: String,
        default: ''
    },
    watcherEmail: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default:''
    }
})

module.exports = mongoose.model('Watcher', watcherSchema);