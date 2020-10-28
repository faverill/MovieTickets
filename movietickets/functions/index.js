const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.addAdminRole = functions.https.onCall((data, context) => {
	// get user and add custom claim (admin)
		return admin.auth().getUserByEmail(data.email).then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true
			});
		}).then(() => {
			return {
				message: `Success! ${data.email} has been made an admin`
			}
		}).catch(err => {
			return err;
		});
});


class NotAnAdminError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'NotAnAdminError';
    }
}

/*
exports.addAdminRole = functions.https.onCall(async (data, context) => {
	//Checking that the user calling the Cloud Function is an Admin user
    const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
	// get user and add custom claim (admin)
	const callerUserRecord = await admin.auth().getUser(callerUid);
	if( callerUserRecord.customClaims.admin) {
		return admin.auth().getUserByEmail(data.email).then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true
			});
		}).then(() => {
			return {
				message: `Success! ${data.email} has been made an admin`
			}
		}).catch(err => {
			return err;
		});
	} else {

		throw new NotAnAdminError('Only Admin users can create new Admins.');
	}
	
});
*/

exports.deleteAdminRole = functions.https.onCall(async (data, context) => {
	//Checking that the user calling the Cloud Function is an Admin user
    const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
	// get user and remove custom claim (admin)
	const callerUserRecord = await admin.auth().getUser(callerUid);
	if( callerUserRecord.customClaims.admin) {
		return admin.auth().getUserByEmail(data.email).then(user => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: false
			});
		}).then(() => {
			return {
				message: `Success! ${data.email} has been removed as an admin`
			}
		}).catch(err => {
			return err;
		});
	} else {

		throw new NotAnAdminError('Only Admin users can remove Admins.');
	}
	
});
