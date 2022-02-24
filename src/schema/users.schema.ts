const { Schema } = require('mongoose')

export const SchemaUser = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: [String]
})