import { useEffect, useState } from "react"

import UploadFiles from "../components/UploadFile"
import ImageView from "./../components/homeImageView"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/client"

export default function Home({ files }) {
  const [session, loading] = useSession()
  const router = useRouter()

  console.log("Files loaded " + files.length)
  return (
    <div>
      <ImageView files={files} />
      {session && (
        <div
          style={{
            position: `fixed`,
            bottom: `25px`,
            right: `25px`,
          }}
        >
          <UploadFiles />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession()
  const resfiles =
    (await (
      await fetch(`${process.env.NEXTAUTH_URL}/api/gdrive/gdrive-api`)
    ).json()) || []
  return {
    props: { session, files: resfiles },
  }
}
