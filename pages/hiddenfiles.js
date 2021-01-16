import Header from "./../components/Header";
import HiddenImageView from "./../components/hiddenImageView";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function HiddenFiles() {
	const [session, loading] = useSession();
	const [files, setFiles] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const resfiles = await (await fetch("api/gdrive/list-hidden-files")).json();
		setFiles(resfiles);
	};

	return (
		<>
			{session && (
				<div>
					<Header />
					<HiddenImageView files={files} />
				</div>
			)}
		</>
	);
}
