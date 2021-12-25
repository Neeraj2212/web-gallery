import { useState } from "react"

import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import ImageComponent from "./ImageComponent"

export default function ArchivedImageView(props) {
  const [showTicks, setTicks] = useState(false)
  const [unarchivefiles, btnUnarchive] = useState(false)
  toast.configure()

  const [SelectedFiles, setSelectedFiles] = useState([])
  const [isLoading, setLoading] = useState(false)

  const resetToInitialState = () => {
    setLoading(false)
    btnUnarchive(false)
    setTicks(false)
  }

  const HandleEdits = async (path, method) => {
    setLoading(true)
    console.log(SelectedFiles)
    if (SelectedFiles.length) {
      fetch(path, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SelectedFiles),
      })
        .then(async (res) => {
          toast.success(await res.text())
          props.loadData()
          resetToInitialState()
        })
        .catch((err) => {
          toast.error(err.message)
          console.log(err)
        })
    }
  }

  return (
    <div className="container">
      <div
        className="row"
        style={{
          position: "sticky",
          top: "10px",
          zIndex: 5,
        }}
      >
        <div className="mr-auto ml-3">
          <Button
            variant="dark"
            className="mr-1"
            onClick={() => {
              setTicks(!showTicks)
              btnUnarchive(!unarchivefiles)
              setSelectedFiles([])
            }}
          >
            Unarchive
          </Button>
        </div>
        {showTicks && unarchivefiles ? (
          <div className=" ml-auto mr-3">
            <Button
              variant="success"
              disabled={isLoading}
              onClick={() => {
                HandleEdits("/api/gdrive/un-archivefiles", "PUT")
              }}
            >
              {isLoading ? "Unarchiving .." : "Unarchive Selected"}
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="row">
        {props.files.map((file) => {
          return (
            <ImageComponent
              file={file}
              key={file.id}
              showTicks={showTicks}
              SelectedFiles={SelectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          )
        })}
      </div>
    </div>
  )
}
