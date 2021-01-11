import Image from "next/image";

function imageComponent(props) {
	return (
		<div
			key={props.id}
			className="col-sm-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center"
		>
			<img
				className="img-fluid"
				src={`https://drive.google.com/uc?export=view&id=${props.id}`}
				// width="300"
				// height="300"
				// layout="intrinsic"
				alt={props.name}
			/>
		</div>
	);
}

export default function ImageView(props) {
	return (
		<div className="container">
			<div className="row">{props.files.map(imageComponent)}</div>
		</div>
	);
}
