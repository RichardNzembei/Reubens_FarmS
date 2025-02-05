import admin from 'firebase-admin';

export default function getFirebaseAdmin() {
    if (!admin.apps.length){
        admin.initializeApp({
            credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}')),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        })
    }
    return admin.firestore();
}