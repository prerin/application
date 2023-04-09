const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
    title: String,
    todoList: [{
        type: String
    }],
    workList: [{
        type: String
    }],
    endList: [{
        type: String
    }]
})

module.exports = mongoose.model('Board', boardSchema)