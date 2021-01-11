import readline from "readline";
import { google } from "googleapis";

// import { credentials } from "./credentials";

// If modifying these scopes, delete token.json.
export default function DriveApi(request, response) {
	console.log("initializing Drive api");
	const SCOPES = ["https://www.googleapis.com/auth/drive"];
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	const TOKEN_PATH = process.env.DB_FOLDER_ACCESS;

	// Load client secrets from a local file.

	// Authorize a client with credentials, then call the Google Drive API.
	// authorize(JSON.parse(content), listFiles);

	authorize(listFiles);

	/**
	 * Create an OAuth2 client with the given credentials, and then execute the
	 * given callback function.
	 * @param {Object} credentials The authorization client credentials.
	 * @param {function} callback The callback to call with the authorized client.
	 */
	function authorize(callback) {
		const client_id = process.env.DB_FOLDER_CLIENT_ID;
		const client_secret = process.env.DB_FOLDER_CLIENT_SECRET;
		const redirect_uris = process.env.REDIRECT_URIS;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		if (TOKEN_PATH) {
			oAuth2Client.setCredentials(TOKEN_PATH);
			callback(oAuth2Client);
		} else {
			return getAccessToken(oAuth2Client, callback);
		}
		// Check if we have previously stored a token.

		/**
		 * Get and store new token after prompting for user authorization, and then
		 * execute the given callback with the authorized OAuth2 client.
		 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
		 * @param {getEventsCallback} callback The callback for the authorized client.
		 */
		function getAccessToken(oAuth2Client, callback) {
			const authUrl = oAuth2Client.generateAuthUrl({
				access_type: "offline",
				scope: SCOPES,
			});
			console.log("Authorize this app by visiting this url:", authUrl);
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
			rl.question("Enter the code from that page here: ", (code) => {
				rl.close();
				oAuth2Client.getToken(code, (err, token) => {
					if (err) return console.error("Error retrieving access token", err);
					oAuth2Client.setCredentials(token);
					// Store the token to disk for later program executions
					TOKEN_PATH = JSON.stringify(token);
					console.log("Token stored to", TOKEN_PATH);
				});
				callback(oAuth2Client);
			});
		}
	}

	//Execuated once at starting of project to add hidden property to all files

	/*async function UpdateFiles(auth, file) {
			const drive = google.drive({ version: "v3", auth });
	
			const result = await drive.files.update({
				// fields: "*",
				fileId: file.id,
				requestBody: {
					properties: {
						hidden: "false",
					},
				},
			});
			console.log(result.data);
		}*/

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
	 */
	function listFiles(auth) {
		const drive = google.drive({ version: "v3", auth });
		drive.files.list(
			{
				q: "'1LkDx99HV8dHmRjzXbmDYnH3wY5hty28V' in parents",
				// fields: "*",
				fields: "files(name,id,properties)",
			},
			(err, res) => {
				if (err) return console.log("The API returned an error: " + err);
				const files = res.data.files;
				if (files.length) {
					// console.log("Files:");

					// files.map((file) => {
					// 	// UpdateFiles(auth, file);
					// 	console.log(file);
					// });
					response.json(files);
				} else {
					console.log("No files found.");
				}
			}
		);
	}
}
