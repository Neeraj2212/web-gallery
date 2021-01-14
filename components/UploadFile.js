import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function UploadFiles() {
	const [show, setShow] = useState(false);
	const [acceptedFiles, setAcceptedFiles] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleUpload = (e) => {
		e.preventDefault();
		const data = new FormData();
		for (const file in acceptedFiles) {
			data.append("files", acceptedFiles[file]);
		}
		fetch("/api/gdrive/uploadfiles", {
			method: "POST",
			body: data,
		})
			.then(async (res) => {
				alert(await res.text());
				location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Button
				variant="primary"
				onClick={handleShow}
				style={{ borderRadius: `50px`, fontSize: `1.3rem` }}
			>
				Upload
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Upload Files</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpload}>
						<Form.File.Input
							multiple={true}
							accept="image/*"
							onChange={(event) => {
								setAcceptedFiles(event.target.files);
							}}
						/>
						<div className="mt-2 d-flex justify-content-end">
							<Button
								type="submit"
								onClick={() => {
									setLoading(true);
								}}
							>
								{isLoading ? "Uploading ..." : "Upload"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
