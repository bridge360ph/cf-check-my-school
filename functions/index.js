const functions = require('firebase-functions');
const fetch = require('node-fetch');

const encodeBody = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

exports.createCMSUser = functions.auth.user().onCreate(async user => {
  const url = 'https://app.checkmyschool.org/api-2/cmsappuser/create_user';
  const userDataJson = {
    firebaseId: user.uid,
    email: user.email
  };

  if (user.displayName) {
    data['fullName'] = user.displayName;
  }

  if (user.photoURL) {
    data['photoUrl'] = user.photoUrl;
  }

  const data = encodeBody(userDataJson);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrer: 'no-referrer',
    body: data
  });

  return await response.json();
});
