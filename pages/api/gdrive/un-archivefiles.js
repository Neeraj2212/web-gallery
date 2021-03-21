import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function unarchivefiles(request, response) {
	if (request.method === "PUT") {
		const session = await getSession({ req: request });
		if (session) {
			const drive = google.drive({ version: "v3" });
			const files = request.body;
			try {
				files.map(async (file) => {
					const result = await drive.files.update({
						fileId: file,
						addParents: "1Yh2cGay35MJ7wwYuPqZnbK_XwydgkZqM", //   Moving files from archive to general folder
						removeParents: "1457wU7ZikBzk-0AufwhWaXGMzhZcfimU", // arhieve folder id
					});

					// console.log(result.data);
				});
				response.json("Files restored Successfully");
			} catch (error) {
				response.status(400).json(error);
			}
		} else {
			response.status(401);
		}
	}
}
