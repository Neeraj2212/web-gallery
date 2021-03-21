import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function listHidden(request, response) {
	const session = await getSession({ req: request });
	if (session) {
		const drive = google.drive({ version: "v3" });
		drive.files.list(
			{
				q: "'1CDG7aTbenX-kMK9Ar77aPJsrWpQTi8Ed' in parents", // hidden folder id
				// fields: "*",
				fields: "files(name,id)",
			},
			(err, res) => {
				if (err) return console.log("The API returned an error: " + err);
				const files = res.data.files; // list of all files in hidden folder
				if (files.length) {
					// console.log(files);
					response.json(files);
				} else {
					console.log("No files found.");
					response.status(404);
				}
			}
		);
	} else {
		response.status(401);
	}
}