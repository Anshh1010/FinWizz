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
        res.json({ message: 'User added successfully', name: user.firstName, emailId: user.emailId });
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
        res.json({message:'User information updated successfully',emailId: user.emailId});
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


exports.addStocks = async(req, res) => {
    try {
        const emailId = req.params.emailId;
        const { stocks_name, priceBought, quantity } = req.body;
    
        const user = await User.findOne({ emailId });

        if (!emailId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const stock = {
            stock: {
                stocks_name:stocks_name,
                priceBought: priceBought,
                quantity: quantity,
            },
        };
        user.stocks.push(stock);
        await user.save();

        return { success: true, message: 'Stock investment added successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding stock investment' };
    }
};
exports.getPerformance = async(req, res) => {
    const { stockName } = req.params;
    console.log(stockName);
    try {

        // Start the Python script with the stock's name as an argument
        console.log("Going")
        const pythonScript = spawn('python3', ['/Users/anshhchaturvedi/Desktop/FinWizz/server/python/getPlots.py', stockName]);
        console.log("spawn done")
        pythonScript.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
        });

        pythonScript.stderr.on('data', (data) => {
            console.error(`Python script error: ${data}`);
        });

        pythonScript.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);

            const plotPaths = [
                'plots/combined_plot.png'

            ];

            res.json({ plotPaths });
        });
    } catch (error) {
        console.error(`Error in try-catch block: ${error}`);
    }
};

exports.getRisk = async(req, res) => {
    const risk = req.body;
    if (risk > 15) {
        data = {
            'IRCTC': 0.283,
            'INDIAN RAILWAY FINANCE CORPORATION': 0.302,
            'SAGAR CEMENTS': 0.380,
            'INFOSYS': 0.404,
            'INDRAPRASTHA GAS LIMITED': 0.514,
            'ITC': 0.601,
            'HAVELLS': 0.624,
            'GLAND PHARMACEUTICALS': 0.642,
            'AXTEL': 0.671,
            'RELIANCE INDUSTRIES': 0.885,
            'VARUN BEVERAGES LIMITED': 0.933,
            'DCM SHRIRAM INDUSTRIES LIMITED': 0.956,
            'YAMUNA SYNDICATE LIMITED': 1.015,
            'DISA INDIA LIMITED': 1.052,
            'LARSEN AND TOUBRO': 1.062,
            'ZEN TECHNOLOGIES': 1.145,
            'ADANI PORTS': 1.293,
            'TATA STEEL': 1.614,
            'PIX TRANSMISSIONS': 1.634,
            'TATAMOTORS': 2.099,
        }


    } else {
        data = {
            options: ["EXCHANGE TRADED FUNDS", "FIXED DEPOSITS", "MUTUAL FUNDS", "BONDS"],
            data1: ["ETFs are investment funds that trade on stock exchanges. They hold a diversified portfolio of assets like stocks bonds, or commodities. ETFs offer easy diversification and liquidity, as they can be bought and sold throughout the trading day at market prices.They generally have lower expense ratios compared to mutual funds ",
                "Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other assets. They are managed by professional fund managers who make investment decisions on behalf of the investors. Mutual funds are priced once a day after the market closes, and you buy or sell at the net asset value (NAV) price. They offer diversification and are suitable for investors with different risk tolerances",
                "FDs are fixed-term savings accounts offered by banks and financial institutions. You deposit a lump sum amount for a predetermined period at a fixed interest rate. FDs provide a stable and predictable return, but the returns are generally lower compared to riskier investments like stocks. They are considered low-risk investments because the principal amount is guaranteed by the bank.",
                "Bonds are debt securities issued by governments, municipalities, or corporations to raise capital. When you buy a bond, you are essentially lending money to the issuer in exchange for periodic interest payments and the return of the principal amount at maturity. Bonds are generally considered lower-risk investments compared to stocks, and they provide a fixed income stream."
            ],
            data2: [" ETFs: The rate of return can vary widely depending on the underlying assets. Generally, ETFs that invest in stocks have higher potential returns, while those investing in bonds or other fixed-income assets have lower potential returns.", "Bonds: Bonds offer a fixed interest rate, so the rate of return is known at the time of investment. It's usually lower than potential stock market returns.", "Mutual Funds: Returns depend on the performance of the underlying assets. Equity mutual funds (investing in stocks) have higher potential returns, while bond funds have more moderate returns.", "FDs: FDs offer a fixed interest rate at the time of deposit, providing a predictable but often lower rate of return compared to other investment options. "],
            data3: [" ETFs: Risk varies depending on the assets held. Stock-based ETFs have higher risk due to stock market volatility. Bond-based ETFs might have lower risk than stocks but higher risk than bonds.", " Bonds: Generally considered lower risk, especially government bonds. Corporate bonds carry some default risk, and bond prices can fluctuate based on interest rate changes.", "Mutual Funds: Risk depends on the fund's holdings. Equity funds have higher risk due to market volatility, while bond funds have varying levels of risk based on the types of bonds held.", "FDs: Considered low-risk due to the principal guarantee provided by the bank, making them a more conservative investment option."]
        }

    }
    res.json(data)

}
