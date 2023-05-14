const { initializeApp } = require('firebase-admin/app')
const { onCall } = require('firebase-functions/v2/https')

initializeApp()

exports.bindstudentuser = onCall(require('./student/bindStudentUser'))
