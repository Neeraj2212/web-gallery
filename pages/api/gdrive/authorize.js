import { google } from "googleapis"
import readline from "readline"

export const authorize = async () => {
  if (google.option?.auth) {
    return
  }
  const TOKEN_PATH = {
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    expiry_date: process.env.EXPIRY_DATE,
  }
  const SCOPES = ["https://www.googleapis.com/auth/drive"]
  const client_id = process.env.DB_FOLDER_CLIENT_ID
  const client_secret = process.env.DB_FOLDER_CLIENT_SECRET
  const redirect_uris = ["urn:ietf:wg:oauth:2.0:oob"]
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  if (TOKEN_PATH) {
    oAuth2Client.setCredentials(TOKEN_PATH)
    google.options({ auth: oAuth2Client })
    return // setting auth for future requests
  } else {
    return getAccessToken(oAuth2Client)
  }
  // Check if we have previously stored a token.

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    })
    console.log("Authorize this app by visiting this url:", authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close()
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err)
        oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        TOKEN_PATH = JSON.stringify(token)
        console.log("Token stored to", TOKEN_PATH)
      })
    })
  }
}
