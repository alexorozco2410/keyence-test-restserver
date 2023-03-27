
const { Schema, model } = require('mongoose')

const DocumentSchema = Schema({
    data: [{
        userID: {
            type: String,
            default: '000'
        },
        userName: {
            type: String,
            default: 'ZZZ'
        },
        date: {
            type: String,
            default: '01-01-2010'
        },
        punchIn: {
            type: String,
            default: '00:00'
        },
        punchOut: {
            type: String,
            default: '00:00'
        }
    }]
})



module.exports = model('Document', DocumentSchema)