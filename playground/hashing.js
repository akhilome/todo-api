// const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*
const message = "Hash me! Please!";
const hash = SHA256(message).toString();
// console.log(JSON.stringify({message, hash}, undefined, 2));


const data = {
  id: 4
};

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

console.log({token});

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();
 
console.log({token});

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Correct guy!');
} else {
  console.log('Omo na scam o!')
} */

/* const data = {
  id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);


try {
  const decoded = jwt.verify(token, '123abcd');
  console.log(decoded);
} catch (err) {
  console.log('This one no follow o!')
} */

// On bcrypt
const pass = 'somepassword';

// Using callbacks
/* bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pass, salt, (err, hash) => {
    console.log(hash);
  });
});

const hashedPassword = '$2a$10$PDE3nHy/RNa/YejrVMvR0eI6b466howvsbTbl/g2Gu4i.kmJIgRdi';

bcrypt.compare(pass, hashedPassword, (err, res) => {
  console.log(res);
}); */

// Using Async Await
(async () => {
  const hashedPass = await bcrypt.hash(pass, 10);
  const hashedPassAltered = hashedPass+'modify';
  console.log({genuine_altered: await bcrypt.compare(pass, hashedPassAltered)}, {genuine_unaltered: await bcrypt.compare(pass, hashedPass)});
})();
