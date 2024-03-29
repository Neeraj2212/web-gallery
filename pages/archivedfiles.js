import ArchivedImageView from "../components/archiveImageView"
import { useState, useEffect, useLayoutEffect } from "react"
import { useSession } from "next-auth/client"

export default function ArchivedFiles() {
  const [session, loading] = useSession()
  const [files, setFiles] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const resfiles = await (
      await fetch("api/gdrive/list-archived-files")
    ).json()
    console.log(resfiles)
    setFiles(resfiles)
  }

  return (
    <>
      {session && (
        <div>
          <ArchivedImageView files={files} loadData={loadData} />
        </div>
      )}
    </>
  )
}
