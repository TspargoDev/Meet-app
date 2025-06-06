const { google } = require("googleapis");
const calendar = google.calendar("v3");

const SCOPES = [
	"https://www.googleapis.com/auth/calendar.events.public.readonly",
];

const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// ✅ REMOVE the trailing slash here
const redirect_uris = ["https://meet-app-lac.vercel.app"];

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	redirect_uris[0]
);

// ✅ Function to generate the Google Auth URL
module.exports.getAuthURL = async () => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
		redirect_uri: redirect_uris[0], // ✅ Force it to match
	});

	console.log("🔗 Google Auth URL generated:", authUrl); // ✅ LOG IT

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify({ authUrl }),
	};
};

// ✅ Function to exchange the code for access token
module.exports.getAccessToken = async (event) => {
	const code = decodeURIComponent(`${event.pathParameters.code}`);

	return new Promise((resolve, reject) => {
		oAuth2Client.getToken(
			code,
			{ redirect_uri: redirect_uris[0] },
			(error, response) => {
				if (error) return reject(error);
				return resolve(response);
			}
		);
	})
		.then((results) => {
			return {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify(results),
			};
		})
		.catch((error) => {
			return {
				statusCode: 500,
				body: JSON.stringify(error),
			};
		});
};

// ✅ Function to fetch calendar events using access token
module.exports.getCalendarEvents = async (event) => {
	const access_token = decodeURIComponent(
		`${event.pathParameters.access_token}`
	);
	oAuth2Client.setCredentials({ access_token });

	return new Promise((resolve, reject) => {
		calendar.events.list(
			{
				calendarId: CALENDAR_ID,
				auth: oAuth2Client,
				timeMin: new Date().toISOString(),
				singleEvents: true,
				orderBy: "startTime",
			},
			(error, response) => {
				if (error) return reject(error);
				return resolve(response);
			}
		);
	})
		.then((results) => {
			return {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				body: JSON.stringify({ events: results.data.items }),
			};
		})
		.catch((error) => {
			return {
				statusCode: 500,
				body: JSON.stringify(error),
			};
		});
};
