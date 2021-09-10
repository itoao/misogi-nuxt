import firebase from 'firebase'
if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCM26GlPQ09xO_hqT7jxVtMDuVWKJDYI0w",
        authDomain: "misogi-nuxt.firebaseapp.com",
        projectId: "misogi-nuxt",
        storageBucket: "misogi-nuxt.appspot.com",
        messagingSenderId: "525014345028",
        appId: "1:525014345028:web:3606f774c24270274fa311"
    })
}
export default firebase