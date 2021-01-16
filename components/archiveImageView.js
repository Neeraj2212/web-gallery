import { useState } from "react";

import { Button } from "react-bootstrap";
import ImageComponent from "./ImageComponent";

export default function ArchivedImageView(props) {
	const [showTicks, setTicks] = useState(false);
	const [unarchivefiles, btnUnarchive] = useState(false);

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
						variant="outline-dark"
						className="mr-1"
						onClick={() => {
							setTicks(!showTicks);
							btnUnarchive(!unarchivefiles);
							setSelectedFiles([]);
						}}
					>
						Unarchive
					</Button>
				</div>
				{showTicks && unarchivefiles ? (
					<div className=" ml-auto mr-3">
						<Button
							variant="success"
							onClick={() => {
								HandleEdits("/api/gdrive/un-archivefiles", "PUT");
							}}
						>
							{isLoading ? "Unarchiving .." : "Unarchiving Selected"}
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
