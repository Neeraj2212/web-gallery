import { google } from "googleapis";
import multer from "multer";
import { getSession } from "next-auth/client";
import sharp from "sharp";
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
			try {
				upload.array("files")(request, response, async (result) => {
					if (result instanceof Error) {
						return console.log(result);
					}

					const drive = google.drive({ version: "v3" });
					const files = request.files;

					for (let index = 0; index < files.length; index++) {
						const file = files[index];

						const data = await sharp(file.buffer).resize(700).toBuffer();

						const bufferStream = new stream.PassThrough();
						bufferStream.end(data);
						var media = {
							mimeType: file.mimetype,
							body: bufferStream,
						};
						const driveRes = await drive.files.create({
							requestBody: {
								name: file.originalname,
								parents: ["1Yh2cGay35MJ7wwYuPqZnbK_XwydgkZqM"],
							},
							media: media,
							fields: "id,name",
						});
						console.log(driveRes.data);
					}
					console.log("Sending Response");
					response.send("Upload Sucessfull");
				});
			} catch (err) {
				console.log(err);
			}
		} else {
			// Not Signed In
			response.status(401);
		}
	}
}
