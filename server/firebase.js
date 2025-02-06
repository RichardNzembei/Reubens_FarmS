import admin from 'firebase-admin';

export default function getFirebaseAdmin() {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
   

    if (!serviceAccountKey) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables');
    }

    if (!admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
                databaseURL: process.env.FIREBASE_DATABASE_URL
            });
        } catch (error) {
            console.error('Error parsing Firebase service account key:', error);
            throw new Error('Failed to initialize Firebase admin SDK');
        }
    }

    return admin.firestore();
}
