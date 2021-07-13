const nodeMailer = require('nodemailer')

const sendEmail = async options => {

let transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:"adankhan1@yahoo.com",
        pass:".killthething."
    }
})

let mailOptions = {
    from:'"Phone_Khata Team" <adankhan1@yahoo.com>',
    to: options.email,
    subject:"Welcome to Our Family",
    text:`Thank You for signing up with us. We ensure to give you best service from our end.Please verify your email through this OTP ${generate_otp}.

Regards,
Bahi Khata Team`,

    html: options.mailOptions

}

//Sending mail to the receipient
const info = await transport.sendMail(mailOptions);

console.log("Mail sent to: " , options.email)
}

//Generate random 6 digits otp number which is to be sent through email
const generate_otp = Math.floor(Math.random()*1000000)


module.exports = {sendEmail , generate_otp}