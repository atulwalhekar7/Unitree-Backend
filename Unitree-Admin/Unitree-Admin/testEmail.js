// testEmail.js - TEMPORARY FIX

const nodemailer = require('nodemailer');

// ⚠️ HARDCODE the values temporarily to confirm they work
// Replace with your actual credentials for testing!
const TEST_HOST = 'smtp-relay.sendinblue.com';
const TEST_PORT = 587;
const TEST_USER = 'shreekatkar3632@gmail.com';
const TEST_PASS = 'eyJhcGlfa2V5IjoieGtleXNpYi04MTgyYTZmYTcxNjA2MTNhYjg1ODQwMTQxMWU1MTI3YzA4ZWMxZmI4NDM0NTdkNDBiMTgzYjA1YmFmNTlkNjVhLTl3Z1h5UkVuOGhyTHlKVGIifQ=='; 

async function testEmail() {
    console.log('Testing SMTP connection...');
    
    // Use the temporary hardcoded variables
    let transporter = nodemailer.createTransport({
        host: TEST_HOST,
        port: TEST_PORT,
        secure: false,
        auth: {
            user: TEST_USER,
            pass: TEST_PASS,
        },
        logger: true, 
        debug: true
    });

    const mailOptions = {
        from: TEST_USER,
        to: TEST_USER, 
        subject: 'Brevo Standalone Test',
        text: 'This should now bypass the .env loading issue.',
    };

    try {
        await transporter.verify();
        console.log('✅ SMTP Credentials Verified Successfully!');

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);

    } catch (error) {
        console.error('❌ Connection or Authentication Failed!');
        console.log('\n--- Full Error Object ---');
        console.log(error);
    }
}

testEmail();