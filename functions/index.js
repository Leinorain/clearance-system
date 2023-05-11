const { getAuth } = require('firebase-admin/auth')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const { logger } = require('firebase-functions')
const { onRequest, onCall, HttpsError } = require('firebase-functions/v2/https')

initializeApp()

exports.helloworld = onRequest(async (req, res) => {
    logger.info('hello world!')
    res.json({ result: 'hello world!' })
})

exports.bindstudentuser = onCall(async request => {
    const { email, studentId } = request.data

    const userRecord = await getAuth()
        .getUserByEmail(email)

    if(!userRecord.emailVerified) {
        throw new HttpsError('failed-precondition', 'Email is not yet verified.')
    }

    const studentRef = getFirestore()
        .collection('students')
        .doc(studentId)

    const studentDoc = await studentRef.get()
    if(studentDoc.get('userId')) {
        throw new HttpsError('failed-precondition', 'Student has already been bound to a user.')
    }

    const delta = { userId: userRecord.uid }
    await studentRef.update(delta)
    
    return delta
})
