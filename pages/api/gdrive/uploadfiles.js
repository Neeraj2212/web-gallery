import { google } from "googleapis";
import multer from "multer";
import fs from "fs";
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

export default function UploadFiles(request, response) {
	if (request.method === "POST") {
		upload.array("files")(request, response, (result) => {
			if (result instanceof Error) {
				return console.log(result);
			}

			const drive = google.drive({ version: "v3" });
			const files = request.files;

			files.forEach(async (file) => {
				const bufferStream = new stream.PassThrough();
				bufferStream.end(file.buffer);
				var fileMetaData = {
					name: file.originalname,
					parents: "1LkDx99HV8dHmRjzXbmDYnH3wY5hty28V",
				};
				var media = {
					mimeType: file.mimetype,
					body: bufferStream,
				};

				drive.files.create(
					{
						requestBody: {
							name: file.originalname,
							parents: ["1LkDx99HV8dHmRjzXbmDYnH3wY5hty28V"],
							properties: {
								hidden: "false",
							},
						},
						media: media,
						fields: "*",
					},
					function (err, file) {
						if (err) {
							// Handle error
							console.error(err);
						} else {
							console.log("File Id:", file.id);
						}
					}
				);
			});
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
