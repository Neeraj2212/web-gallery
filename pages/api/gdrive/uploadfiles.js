import { google } from "googleapis";
import multer from "multer";

import stream from "stream";
export const config = {
	api: {
		bodyParser: false,
	},
};
const upload = multer();
// function runmiddleware(request, response) {
// 	upload.array("files")(request, response, (result) => {
// 		if (result instanceof Error) {
// 			return console.log(result);
// 		}
// 		console.log("Middleware Worked");
// 		console.log(request.files);
// 		return result;
// 	});
// }

export default async function UploadFiles(request, response) {
	if (request.method === "POST") {
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

		// runmiddleware(request, response);
		// console.log("in Main");
		// console.log(request.files);

		// const drive = google.drive({ version: "v3" });
		// const files = request.body;
	}
}

// import nextConnect from "next-connect";
// import multer from "multer";

// const upload = multer({
// 	storage: multer.diskStorage({
// 		destination: "./public/uploads",
// 		filename: (req, file, cb) => cb(null, file.originalname),
// 	}),
// });

// const apiRoute = nextConnect({
// 	onError(error, req, res) {
// 		res
// 			.status(502)
// 			.json({ error: `Sorry something Happened! ${error.message}` });
// 	},
// 	onNoMatch(req, res) {
// 		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
// 	},
// });

// apiRoute.use(upload.array("req.body.files"));

// apiRoute.post((req, res) => {
// 	res.status(200).json({ data: "success" });
// });

// export default apiRoute;

// export const config = {
// 	api: {
// 		bodyParser: false, // Disallow body parsing, consume as stream
// 	},
// };
