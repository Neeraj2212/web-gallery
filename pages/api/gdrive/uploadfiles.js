import { google } from "googleapis";
import multer from "multer";
import { getSession } from "next-auth/client";
import stream from "stream";
export const config = {
	api: {
		bodyParser: false,
	},
};
const upload = multer();

export default async function UploadFiles(request, response) {
	if (request.method === "POST") {
		const session = await getSession({ req: request });
		if (session) {
			// Signed In
			upload.array("files")(request, response, async (result) => {
				if (result instanceof Error) {
					return console.log(result);
				}

				const drive = google.drive({ version: "v3" });
				const files = request.files;

				for (let index = 0; index < files.length; index++) {
					const file = files[index];
					const bufferStream = new stream.PassThrough();
					bufferStream.end(file.buffer);

					var media = {
						mimeType: file.mimetype,
						body: bufferStream,
					};
					const driveRes = await drive.files.create({
						requestBody: {
							name: file.originalname,
							parents: ["1LkDx99HV8dHmRjzXbmDYnH3wY5hty28V"],
							properties: {
								hidden: "false",
							},
						},
						media: media,
						fields: "id,name",
					});
					console.log(driveRes.data);
				}

				console.log("Sending Response");
				response.send("Upload Sucessfull");
			});
		} else {
			// Not Signed In
			response.status(401);
		}
	}
}
