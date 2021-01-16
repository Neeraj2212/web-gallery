import Image from "next/image";
import { FormCheck } from "react-bootstrap";

export default function ImageComponent({
	file,
	showTicks,

	SelectedFiles,
	setSelectedFiles,
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
