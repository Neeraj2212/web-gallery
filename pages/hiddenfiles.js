import HiddenImageView from "./../components/hiddenImageView"
import { useState, useEffect, useLayoutEffect } from "react"
import { useSession } from "next-auth/client"

export default function HiddenFiles() {
  const [session, loading] = useSession()
  const [files, setFiles] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const resfiles = await (await fetch("api/gdrive/list-hidden-files")).json()
    setFiles(resfiles)
  }

  return (
    <>
      {session && (
        <div>
          <HiddenImageView files={files} loadData={loadData} />
        </div>
      )}
    </>
  )
}
