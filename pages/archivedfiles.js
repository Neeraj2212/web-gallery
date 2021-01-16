import Header from "../components/Header";
import ArchivedImageView from "../components/archiveImageView";
import { useState, useEffect } from "react";

export default function ArchivedFiles() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const resfiles = await (
			await fetch("api/gdrive/list-archived-files")
		).json();
		setFiles(resfiles);
	};

	return (
		<div>
			<Header />
			<ArchivedImageView files={files} />
		</div>
	);
}
