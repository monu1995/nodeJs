const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_APY_KEY)

const sendWelcomeEmail=(email,name)=>{
  sgMail.send({
    to:email,
    from:'mano.1995.1995@gmail.com',
    subject:'Thanks for joining in!',
    text:`Welcome to the app, ${name}. Let me know how you get along with the app `
  })
}

const sendCancelEmail=(email,name)=>{
  sgMail.send({
    to:email,
    from:'mano.1995.1995@gmail.com',
    subject:'Thanks to choose Task App',
    text:`May I know , ${name} the reason for cancel the services `
  })
}

module.exports={
  sendCancelEmail,
  sendWelcomeEmail
}