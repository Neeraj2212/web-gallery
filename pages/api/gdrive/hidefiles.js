import { google } from "googleapis";

export default function hideMyFiles(request, response) {
	if (request.method === "PUT") {
		const drive = google.drive({ version: "v3" });
		const files = request.body;
		try {
			files.map(async (file) => {
				const result = await drive.files.update({
					fileId: file.id,
					requestBody: {
						properties: {
							hidden: file.properties.hidden,
						},
					},
				});
				console.log(result.data);
				response.json(result.data);
			});
		} catch (error) {
			response.status(400).json(error);
		}
	}
}
