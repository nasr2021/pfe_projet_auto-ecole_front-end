const crypto = require('crypto');

const generateVapidKeys = () => {
  const vapidKeys = crypto.generateKeyPairSync('ec', {
    namedCurve: 'P-256',
  });

  const publicKey = vapidKeys.publicKey.export({
    type: 'spki',
    format: 'pem',
  });

  const privateKey = vapidKeys.privateKey.export({
    type: 'pkcs8',
    format: 'pem',
  });

  return { publicKey, privateKey };
};

const vapidKeys = generateVapidKeys();
console.log('Public Key:');
console.log(vapidKeys.publicKey);
console.log('Private Key:');
console.log(vapidKeys.privateKey);
