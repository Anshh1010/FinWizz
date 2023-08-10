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
        required: false,
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
    profilePic: {
        type: String,
        required: 'Last Name cannot be empty',
    },
    phoneNo: {
        type: String,
        required: 'PhoneNo cannot be empty'
    },
    gender: {
        type: String,
        required: 'Gender cannot be empty',
    },
    income: {
        type: Number,
        required: 'Cannot be empty'
    },
    expenses: {
        type:Number,
        required: 'Cannot be empty',
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
        type: String,
    },
    number_of_children: {
        type: Number,
        default: 0
    },
    age: {
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