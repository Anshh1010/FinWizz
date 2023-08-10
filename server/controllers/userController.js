// const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString([], {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//     });
// };

const nodemailer = require('nodemailer')
const User = require('../models/schema')

function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

async function sendOTPByEmail(email, otp) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });

    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.log('Error sending OTP email', error);
    }
}


exports.loginUser = async(req, res) => {
    try {
        const { emailId, password} = req.body;
        let user = await User.findOne({ emailId, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const newOTP = generateOTP();
        user.otp = newOTP;
        user.otpExpiration = Date.now() + 5 * 60 * 1000;

        await sendOTPByEmail(emailId, newOTP);

        user = await user.save();

        // Return the token and badgeID to the client
        res.json({ message: 'OTP sent successfully', emailId: user.emailId, name : user.firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.verifyOTP = async(req, res) => {
    try {
        let { emailId, otp } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(250).json({ error: 'User not found' })
        }
        console.log(user);
        console.log('Provided OTP:', otp);
        console.log('Stored OTP:', user.otp);

        if (user.otp !== otp || Date.now() > user.otpExpiration) {
            return res.status(250).json({ error: 'Invalid otp' });
        }

        user.otp = undefined;
        user.otpExpiration = undefined;

        await user.save();

        res.json({ emailId: user.emailId, firstName: user.firstName  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.signup = async(req, res) => {
    try{
        const { emailId , password, password0 } = req.body;

        const admin = await User.findOne({ emailId:emailId });
        if(admin){
            return res.status(250).json({error:'User with same email id already exists'});
        }
        if(password!==password0){
            return res.status(250).json({error:'Passwords do not match'});
        }
        const {firstName, surname, phoneNo, gender} = req.body;
        const user = new User({
            emailId:emailId,
            password:password,
            firstName:firstName,
            surname:surname,
            phoneNo:phoneNo,
            gender:gender
        });
        await user.save();
        res.json({message:'User added successfully', name : user.firstName});
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Error Signing up'});
    }
};
exports.updateUserAfterSignup = async(req, res) => {
    try{
        const { emailId } = req.params;
        const user = await User.findOne({ emailId:emailId });
       
        if(!user){
            return res.status(250).json({error:'User with same email id already exists'});
        }
        
        const {income, expenses, debt, current_savings, investment_Returns, maritalStatus, number_of_children, age } = req.body;

        user.income = income;
        user.expenses = expenses;
        user.debt = debt;
        user.current_savings = current_savings;
        user.investment_Returns = investment_Returns;
        user.maritalStatus = maritalStatus;
        user.number_of_children = number_of_children;
        user.age = age;
        user.totalSaving = (income - expenses - debt) + current_savings + investment_Returns 

        await user.save();
        res.json({message:'User information updated successfully',user});
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Error Updating Information'});
    }
};

exports.risk = async(req, res) => {
    try{
        const { emailId } = req.params;
        const user = await User.findOne({ emailId:emailId });
       
        if(!user){
            return res.status(250).json({error:'User with same email id already exists'});
        }
        
        const {risk_taking} = req.body;

        user.risk_taking = risk_taking;
       

        await user.save();
        res.json({message:'Risk taking availability updated successfully',user});
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Error Updating Information'});
    }
};

exports.suggestions = async(req, res) => {
    try{
        const {emailId} = req.params;
        const user = await User.findOne({ emailId:emailId });
       
        if(!user){
            return res.status(250).json({error:'User with same email id already exists'});
        }

        
        if(user.risk_taking >= 15) 
        {
           user.choice = "Stocks"
        }
        else if(user.risk_taking >= 10 && user.risk_taking <15) 
        {
            user.choice = "Mutual Funds";
        }
        else if(user.risk_taking >= 5 && user.risk_taking <10) 
        {
            user.choice = "Bonds";
        }
        else if(user.risk_taking >= 5 && user.risk_taking <10) 
        {
            user.choice = "ETF";
        }
        await user.save()
        res.json({message:'Risk'});
    }catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error Updating Information'});
    }
}