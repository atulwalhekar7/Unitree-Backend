const bcrypt = require('bcrypt');

const rawPassword = 'demoPassword123';
const saltRounds = 10; // Use the same salt rounds as your original code

bcrypt.hash(rawPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Raw Password:', rawPassword);
        console.log('Hashed Password:', hash);
        console.log('\n--- COPY THE HASH ABOVE ---');
    }
});