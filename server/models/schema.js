const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    emailId: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        default: '12345'
    },
    otp: {
        type: String,
    },
    otpExpiration: {
        type: Date,
        required: false,
    },
    firstName: {
        type: String,
        required: 'First Name cannot be empty',
    },
    surname: {
        type: String,
        required: 'Name cannot be empty',
    },
    phoneNo: {
        type: Number,
        required: 'PhoneNo cannot be empty'
    },
    gender: {
        type: String,
        required: 'Gender cannot be empty',
    },
    income: {
        type: Number,

    },
    expenses: {
        type:Number,
    },
    profilePic: {
        type: String,
    },
    debt: {
        type:Number,
        default: 0
    },
    current_savings: {
        type:Number
    },
    investment_Returns: {
        type:Number,
        default: 0
    },
    maritalStatus:{
        type: Boolean,
    },
    number_of_children: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
    },
    totalSaving: {
        type: Number,
    },
    risk_taking: {
        type: Number,
    },
    stocks: [{
        stocks_name: {
            type: String,
        },
        priceBought: {
            type: Number,
        },
        quantity: {
            type: Number
        }
    }],

    
});

module.exports = mongoose.model('User', userSchema);