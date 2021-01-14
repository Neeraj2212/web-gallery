import { google } from "googleapis";
import { getSession } from "next-auth/client";

export default async function DeleteFiles(request, response) {
	if ((request.method = "DELETE")) {
		const session = await getSession({ req: request });
		if (session) {
			// Signed in
			const drive = google.drive({ version: "v3" });
			const files = request.body;
			try {
				for (let idx = 0; idx < files.length; idx++) {
					const fileId = files[idx];
					const result = await drive.files.delete({
						fileId: fileId,
					});
					console.log(result);
				}
				response.send("Files deleted Successfully");
			} catch (error) {
				response.status(400).json(error);
			}
		} else {
			// Not Signed in
			response.status(401);
		}
	}
}
