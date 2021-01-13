import readline from "readline";
import { google } from "googleapis";
import { authorize } from "./authorize";

// If modifying these scopes, delete token.json.
export default function DriveApi(request, response) {
	console.log("initializing Drive api");
	authorize();
	listFiles();

	function listFiles() {
		const drive = google.drive({ version: "v3" });
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
