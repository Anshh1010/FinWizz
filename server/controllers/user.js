// const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString([], {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//     });
// };
const Users = require("")

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
        const { emailId, password, otp} = req.body;
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
        res.json({ message: 'OTP sent successfully', badgeID: user.badgeID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.verifyOTP = async(req, res) => {
    try {
        let { badgeID, otp } = req.body;
        let user = await User.findOne({ badgeID });
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (user.otp !== otp || Date.now() > user.otpExpiration) {
            return res.status(401).json({ error: 'Invalid otp' });
        }

        const imageUrl = user.profilePic;

        user.otp = undefined;
        user.otpExpiration = undefined;

        user = await user.save();
        const token = jwt.sign({ emailId: user.emailId, badgeID: user.badgeID }, // Include badgeID in the payload
            secretKey, {
                expiresIn: '1d', // Set the expiration time for the token
            }
        );
        user.jwtToken = token;
        await user.save();

        res.json({ token, badgeID: user.badgeID, imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};