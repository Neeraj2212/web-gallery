import { useState } from "react";
import { useSession } from "next-auth/client";
import { Button } from "react-bootstrap";
import ImageComponent from "./ImageComponent";
import { useRouter } from "next/router";

export default function ImageView(props) {
	const router = useRouter();
	const [session, loading] = useSession();
	const [showTicks, setTicks] = useState(false);
	const [hideFiles, btnHide] = useState(false);
	const [deleteFiles, btnDelete] = useState(false);
	const [archiveFiles, btnArchive] = useState(false);
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

					router.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="container">
			<div className="row">
				{session && (
					<>
						<div className="mr-auto ml-3">
							<Button
								variant="outline-warning"
								disabled={deleteFiles || archiveFiles}
								className="mr-1"
								onClick={() => {
									setTicks(!showTicks);
									btnHide(!hideFiles);
									setSelectedFiles([]);
									console.log(location.pathname);
								}}
							>
								Hide
							</Button>

							<Button
								variant="outline-danger"
								className="mx-1"
								disabled={hideFiles || archiveFiles}
								onClick={() => {
									setTicks(!showTicks);
									setSelectedFiles([]);
									btnDelete(!deleteFiles);
								}}
							>
								Delete
							</Button>

							<Button
								variant="outline-dark"
								className="mx-1"
								disabled={hideFiles || deleteFiles}
								onClick={() => {
									setTicks(!showTicks);
									setSelectedFiles([]);
									btnArchive(!archiveFiles);
								}}
							>
								Archive
							</Button>
						</div>
						{showTicks && hideFiles ? (
							<div className=" ml-auto mr-3">
								<Button
									variant="success"
									onClick={() => {
										HandleEdits("/api/gdrive/hidefiles", "PUT");
									}}
								>
									{isLoading ? "Hiding .." : "Hide Selected"}
								</Button>
							</div>
						) : (
							<div></div>
						)}
						{showTicks && deleteFiles ? (
							<div className=" ml-auto mr-3">
								<Button
									variant="danger"
									onClick={() => {
										HandleEdits("/api/gdrive/deletefiles", "DELETE");
									}}
								>
									{isLoading ? "Deleting .." : "Delete Selected"}
								</Button>
							</div>
						) : (
							<div></div>
						)}
						{showTicks && archiveFiles ? (
							<div className=" ml-auto mr-3">
								<Button
									variant="dark"
									onClick={async () => {
										HandleEdits("/api/gdrive/archivefiles", "PUT");
									}}
								>
									{isLoading ? "Archiving .." : "Archive Selected"}
								</Button>
							</div>
						) : (
							<div></div>
						)}
					</>
				)}
			</div>

			<div
				// className="row"
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexGrow: 1,
					flexDirection: "row",
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
					);
				})}
			</div>
		</div>
	);
}
