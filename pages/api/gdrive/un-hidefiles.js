import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function unhideMyFiles(request, response) {
	if (request.method === "PUT") {
		const session = await getSession({ req: request });
		if (session) {
			const drive = google.drive({ version: "v3" });
			const files = request.body;
			try {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					const result = await drive.files.update({
						fileId: file,
						addParents: "1Yh2cGay35MJ7wwYuPqZnbK_XwydgkZqM", // Moving files from hidden to general folder
						removeParents: "1CDG7aTbenX-kMK9Ar77aPJsrWpQTi8Ed", // hidden folder id
					});
				}

				response.json("Files restored Successfully");
			} catch (error) {
				response.status(400).json(error);
			}
		} else {
			response.status(401);
		}
	}
}
