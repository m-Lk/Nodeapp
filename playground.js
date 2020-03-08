
const bcrypt = require('bcryptjs');

async function run () {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('12345', salt);
    console.log('salt: ', salt);
    console.log('hashed: ', hashed);
}

run();