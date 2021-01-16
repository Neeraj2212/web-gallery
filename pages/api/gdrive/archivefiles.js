import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default function archivefiles(request, response) {
	if (request.method === "PUT") {
		const session = await getSession({ req: request });
		if (session) {
			const drive = google.drive({ version: "v3" });
		const files = request.body;
		try {
			files.map(async (file) => {
				const result = await drive.files.update({
					fileId: file,
					addParents: "1457wU7ZikBzk-0AufwhWaXGMzhZcfimU", // Moving files from general to archive folder
					removeParents: "1Yh2cGay35MJ7wwYuPqZnbK_XwydgkZqM", // general folder id
				});

				console.log(result.data);
				response.json("Archived Successfully");
			});
		} catch (error) {
			response.status(400).json(error);
		}
		} else {
			response.status(401);
		}
		
	}
}
