import hbs from 'nodemailer-express-handlebars'
import nodemailer  from 'nodemailer'
import path from 'path';
import server from "config"
import { title } from 'process';

// initialize nodemailer
let transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: server.email.email,
            pass: server.email.secrete
        }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))
// const send email

const sendVerification  = async (user, emailDetials) => {
  let url = `http://${server.applicationInterface.host}:${server.applicationInterface.port}/api/auth/verify-email/${emailDetials.id}/${emailDetials.secreteText}`
  const mailOptions = {
    from: `"Auto Code Grader" <${server.email.email}>`, // sender address
    template: "email", // the name of the template file, i.e., email.handlebars
    to: user.email,
    subject: `Welcome to Auto Code Grder, ${user.name}`,
    context: {
      name: user.name,
      url,
      secreteText:emailDetials.secreteText
    },
  };
  try {
    await transporter.sendMail(mailOptions)
  } catch(err) {
    console.log(`${err} \n sending email ${user.name} ${user.email}`)
  }
}

const sendResetPassword  = async (user, emailDetials) => {
  const mailOptions = {
    from: `"Auto Code Grader" <${server.email.email}>`, // sender address
    template: "password", // the name of the template file, i.e., email.handlebars
    to: user.email,
    subject: `Reset you Password, ${user.name}`,
    context: {
      name: user.name,
      secreteText:emailDetials.secreteText
    },
  };
  try {
    await transporter.sendMail(mailOptions)
  } catch(err) {
    console.log(`${err} \n sending email ${user.name} ${user.email}`)
  }
}

const notifyLecturer  = async (lecturerEmail,assTitle, questionNumber) => {
  const mailOptions = {
    from: `"Auto Code Grader" <${server.email.email}>`, // sender address
    template: "notifyLecturer", // the name of the template file, i.e., email.handlebars
    to: lecturerEmail,
    subject: `cant find result.txt during execution  ${assignement.title}`,
    context: {
      title: assTitle,
      questionNumber : questionNumber,
    },
  };
  try {
    await transporter.sendMail(mailOptions)
  } catch(err) {
    console.log(`${err} \n sending email ${lecturerEmail}`)
  }
}


export {sendVerification, sendResetPassword, notifyLecturer}

  