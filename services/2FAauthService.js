const {transporter} = require('../middleware/2fa_middleWare')

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const send2FACode = async (email, code) => {
  const mailOptions = {
    from:'srijangiri2003@gmail.com',
    to: email,
    subject: 'Your 2FA Code',
    text: `Your 2FA code is ${code}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {generateCode, send2FACode}