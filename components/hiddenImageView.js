import { useState } from "react";

import { Button } from "react-bootstrap";
import ImageComponent from "./ImageComponent";

export default function HiddenImageView(props) {
	const [showTicks, setTicks] = useState(false);
	const [unhidefiles, btnUnhide] = useState(false);

	const [SelectedFiles, setSelectedFiles] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const HandleEdits = async (path, method) => {
		setLoading(true);
		console.log(SelectedFiles);
		if (SelectedFiles.length) {
			fetch(path, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(SelectedFiles),
			})
				.then(async (res) => {
					alert(await res.text());
					location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="mr-auto ml-3">
					<Button
						variant="outline-warning"
						className="mr-1"
						onClick={() => {
							setTicks(!showTicks);
							btnUnhide(!unhidefiles);
							setSelectedFiles([]);
						}}
					>
						Unhide
					</Button>
				</div>
				{showTicks && unhidefiles ? (
					<div className=" ml-auto mr-3">
						<Button
							variant="success"
							onClick={() => {
								HandleEdits("/api/gdrive/un-hidefiles", "PUT");
							}}
						>
							{isLoading ? "Unhiding .." : "Unhide Selected"}
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
					);
				})}
			</div>
		</div>
	);
}
