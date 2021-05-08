import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function hideMyFiles(request, response) {
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
						addParents: `${process.env.HIDDEN_FOLDER}`, // Moving files from general to hidden folder
						removeParents: `${process.env.MAIN_FOLDER}`, // general folder id
					});
				}

				response.json("Files Hidden Successfully");
			} catch (error) {
				response.status(400).json(error);
			}
		} else {
			response.status(401);
		}
	}
}
