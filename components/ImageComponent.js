import Image from "next/image";
import { FormCheck } from "react-bootstrap";

export default function ImageComponent({
	file,
	showTicks,

	SelectedFiles,
	setSelectedFiles,
}) {
	const aspectRatio =
		file.imageMediaMetadata.width / file.imageMediaMetadata.height;
	return (
		<div
			// className="col-sm-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center"
			style={{
				flexGrow: 1,
				width: `${aspectRatio * 250}px`,

				boxSizing: `border-box`,
				position: "relative",
			}}
		>
			<img
				src={`https://drive.google.com/thumbnail?id=${file.id}`} // Loading Thumbnails for fast Load
				style={{
					width: `100%`,
					objectFit: `cover`,
					padding: `8px`,
					height: `100%`,
				}}
				loading="lazy"
			/>

			{showTicks ? (
				<FormCheck
					type="checkbox"
					name="hide"
					onChange={() => {
						setSelectedFiles(
							SelectedFiles.includes(file.id)
								? SelectedFiles.filter((i) => i !== file.id) // remove item
								: [...SelectedFiles, file.id] // add item
						);
					}}
					style={{
						position: `absolute`,
						right: "35px",
						bottom: "25px",
					}}
				/>
			) : (
				<div></div>
			)}
		</div>
	);
}

// Extras
// <Image
// 	// className="img-fluid"
// 	// src={`https://drive.google.com/uc?export=view&id=${props.id}`}
// 	src={`https://drive.google.com/thumbnail?id=${file.id}`} // Loading Thumbnails for fast Load
// 	width="300"
// 	height="300"
// 	layout="intrinsic"
// 	alt={file.name}
// />
