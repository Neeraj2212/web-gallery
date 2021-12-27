import { useState } from "react"

import { Button } from "react-bootstrap"
import { toast } from "react-toastify"
import ImageComponent from "./ImageComponent"

export default function HiddenImageView(props) {
  const [showTicks, setTicks] = useState(false)
  const [unhidefiles, btnUnhide] = useState(false)
  const [SelectedFiles, setSelectedFiles] = useState([])
  const [isLoading, setLoading] = useState(false)
  toast.configure()

  const resetToInitialState = () => {
    setLoading(false)
    btnUnhide(false)
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
            variant="warning"
            className="mr-1"
            onClick={() => {
              setTicks(!showTicks)
              btnUnhide(!unhidefiles)
              setSelectedFiles([])
            }}
          >
            Unhide
          </Button>
        </div>
        {showTicks && unhidefiles ? (
          <div className=" ml-auto mr-3">
            <Button
              variant="success"
              disabled={isLoading}
              onClick={() => {
                HandleEdits("/api/gdrive/un-hidefiles", "PUT")
              }}
            >
              {isLoading ? "Unhiding .." : "Unhide Selected"}
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexGrow: 1,
          flexDirection: "row",
          marginTop: "1.5rem",
          gap: "8px",
        }}
      >
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
