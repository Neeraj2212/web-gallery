import Image from "next/image";
import { FormCheck, Button } from "react-bootstrap";
import { useState } from "react";

function ImageComponent({
	file,
	showTicks,
	hideFiles,
	deleteFiles,
	DeleteFilesId,
	setDeleteFilesId,
}) {
	return (
		<div
			className="col-sm-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center"
			style={{ position: `relative` }}
		>
			<Image
				className="img-fluid"
				// src={`https://drive.google.com/uc?export=view&id=${props.id}`}
				src={`https://drive.google.com/thumbnail?id=${file.id}`} // Loading Thumbnails for fast Load
				width="300"
				height="300"
				layout="intrinsic"
				alt={file.name}
			/>
			{showTicks ? (
				<FormCheck
					type="checkbox"
					name="hide"
					onChange={() => {
						if (hideFiles) {
							file.properties.hidden === "false"
								? (file.properties.hidden = "true")
								: (file.properties.hidden = "false");
						} else if (deleteFiles) {
							setDeleteFilesId(
								DeleteFilesId.includes(file.id)
									? DeleteFilesId.filter((i) => i !== file.id) // remove item
									: [...DeleteFilesId, file.id] // add item
							);
						}
					}}
					style={{ position: `absolute`, right: "25px", bottom: "25px" }}
				></FormCheck>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default function ImageView(props) {
	const [showTicks, setTicks] = useState(false);
	const [hideFiles, btnHide] = useState(false);
	const [deleteFiles, btnDelete] = useState(false);
	const [DeleteFilesId, setDeleteFilesId] = useState([]);
	const [isLoading, setLoading] = useState(false);
	return (
		<div className="container">
			<div className="row">
				<div className="mr-auto ml-3">
					{!deleteFiles ? (
						<Button
							variant="outline-warning"
							onClick={() => {
								setTicks(!showTicks);
								btnHide(!hideFiles);
							}}
						>
							{props.type}
						</Button>
					) : (
						<div></div>
					)}

					{!hideFiles ? (
						<Button
							variant="outline-danger"
							onClick={() => {
								setTicks(!showTicks);
								btnDelete(!deleteFiles);
							}}
						>
							Delete
						</Button>
					) : (
						<div></div>
					)}
				</div>
				{showTicks && hideFiles ? (
					<div className=" ml-auto">
						<Button
							variant="success"
							onClick={async () => {
								const hidden = props.files.filter(
									(file) => file.properties.hidden === props.property
								);
								console.log(hidden);
								if (hidden) {
									fetch("/api/gdrive/hidefiles", {
										method: "PUT",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(hidden),
									})
										.then((res) => {
											location.reload();
										})
										.catch((error) => {
											console.log(error);
										});
								}
							}}
						>
							{props.type} Selected
						</Button>
					</div>
				) : (
					<div></div>
				)}
				{showTicks && deleteFiles ? (
					<div className=" ml-auto">
						<Button
							variant="danger"
							onClick={() => {
								setLoading(true);
								fetch("/api/gdrive/deletefiles", {
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(DeleteFilesId),
								})
									.then(async (res) => {
										alert(await res.text());
										location.reload();
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							{isLoading ? "Deleting .." : "Delete Selected"}
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
							hideFiles={hideFiles}
							deleteFiles={deleteFiles}
							DeleteFilesId={DeleteFilesId}
							setDeleteFilesId={setDeleteFilesId}
						/>
					);
				})}
			</div>
		</div>
	);
}
