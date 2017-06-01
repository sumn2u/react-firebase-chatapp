const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.newMessageAlert = functions.database.ref('/messages/{message}')
.onWrite((event) => {
    const message = event.data.val();

    const getTokens = admin.database().ref('users').once('value')
                    .then((snapshot) => {
                      const tokens = [];
                      snapshot.forEach((user) => {
                          const token  = user.child('token').val();
                          if (token) tokens.push(token);
                      });

                      return tokens;
         });

  const getAuthor = admin.auth().getUser(message.uid);
  Promise.all([getTokens, getAuthor]).then(([tokens, author]) => {
    const payload = {
        notification :{
            title : `Hot Take From ${author.displayName}`,
            body: message.content,
            icon: author.photoURL
        }
    };
    admin.messaging().sendToDevice(tokens,payload). catch(console.error)
  })
})