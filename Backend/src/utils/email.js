const nodemailer = require("nodemailer");

const senMailOrder = (email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: "nguyenducthinh0401@gmail.com",
              pass: "0363578628gmail@",
            },
          });
          const option = {
            from: "nguyenducthinh0401@gmail.com",
            to: email.toString(),
            subject: "THANKS YOUR BOOKING ",
            html: `
                       <h1>Your booking successfully.Thanks !</h1> 
                      `,
          };
          transporter.sendMail(option, (err, info) => {
            if (err) {
              console.log(err);
              return;
            }
            res.json('send mail success !'); 
          });
    } catch (error) {
        
    }
};

const senMailSuccess = (email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: "nguyenducthinh0401@gmail.com",
              pass: "0363578628gmail@",
            },
          });
          const option = {
            from: "nguyenducthinh0401@gmail.com",
            to: email.toString(),
            subject: "BOOKING  APPROVE",
            html: `
                       <h1>Your booking has been 
                       approve.We will contact with you in time lastest !</h1> 
                      `,
          };
          transporter.sendMail(option, (err, info) => {
            if (err) {
              console.log(err);
              return;
            }
            res.json('send mail success !'); 
          });
    } catch (error) {
        
    }
};


const senMailResetPass = (email,newPass) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: "nguyenducthinh0401@gmail.com",
              pass: "0363578628gmail@",
            },
          });
          const option = {
            from: "nguyenducthinh0401@gmail.com",
            to: email.toString(),
            subject: "RESET PASSWORD",
            html: `
                       <span>Your new password for email ${email} is: ${newPass}</span>
                      `,
          };
          transporter.sendMail(option, (err, info) => {
            if (err) {
              console.log(err);
              return;
            }
            res.json('send mail success !'); 
          });
    } catch (error) {
        
    }
};
module.exports = {senMailOrder,senMailSuccess,senMailResetPass}
