import { google } from "googleapis"
import { getSession } from "next-auth/client"

export default async function listArchived(request, response) {
  const session = await getSession({ req: request })
  if (session) {
    const drive = google.drive({ version: "v3" })
    drive.files.list(
      {
        q: `'${process.env.ARCHIVED_FOLDER}' in parents`, // archived folder id
        // fields: "*",
        fields: "files(name,id,imageMediaMetadata)",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err)
        const files = res.data.files // list of all files in archived folder
        if (files.length) {
          // console.log(files);
          response.json(files)
          return
        } else {
          console.log("No files found.")
          response.status(404)
        }
      }
    )
  } else {
    response.status(401)
    response.json([])
  }
}
