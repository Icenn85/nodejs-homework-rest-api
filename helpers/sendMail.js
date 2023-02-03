const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_KEY, MY_EMAIL } = process.env;



async function sendMail(data) {
    try {
        sendGrid.setApiKey(SEND_GRID_KEY);

        const email = { ...data, from: MY_EMAIL };
        await sendGrid.send(email);
        return true;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    sendMail,
};