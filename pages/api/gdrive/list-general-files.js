import { google } from "googleapis"

export default function listGeneral(request, response) {
  const drive = google.drive({ version: "v3" })
  drive.files.list(
    {
      q: `'${process.env.MAIN_FOLDER}' in parents`, //general folder id
      // fields: "*",
      fields: "files(name,id,imageMediaMetadata)",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err)
      const files = res.data.files // list of all files in general folder
      if (files.length) {
        // console.log(files);
        response.json(files)
      } else {
        console.log("No files found.")
        response.status(404)
        response.end([])
      }
    }
  )
}
