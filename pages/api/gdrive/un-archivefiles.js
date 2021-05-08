import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function unarchivefiles(request, response) {
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
						addParents: `${process.env.MAIN_FOLDER}`, //   Moving files from archive to general folder
						removeParents: `${process.env.ARCHIVED_FOLDER}`, // arhieve folder id
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
