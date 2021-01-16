import Header from "../components/Header";
import ArchivedImageView from "../components/archiveImageView";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function ArchivedFiles() {
	const [session, loading] = useSession();
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
		<>
			{session && (
				<div>
					<Header />
					<ArchivedImageView files={files} />
				</div>
			)}
		</>
	);
}
