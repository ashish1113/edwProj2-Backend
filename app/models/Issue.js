const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let issueSchema = new Schema({

  issueId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },

  title: {
    type: String,
    default: ''

  },
  reporterEmail: {
    type: String,
    required: true
  },

  assigneeEmail: {
    type: String,
    required: true
  },
  reporterName: {
    type: String,
    required: true
  },

  assigneeName: {
    type: String,
    required: true
  },
  status: {
    type: String,

  },
  creationDate: {
    type: Date,
  },

  lastestModificationDate:
  {
    type: Date,
  },

  description: {
    type: String,
    default: ''
  },
  screenshotName: {
    type: String,
    default: ''
  },


  screenshotPath: {
    type: String,
    default: ''
  },


})

// creating a text index.
// setting up text indexes on all string fields in our model.
issueSchema.index({ '$**': 'text' })

mongoose.model('Issues', issueSchema);