import Header from "./../components/Header";
import HiddenImageView from "./../components/hiddenImageView";
import { useState, useEffect } from "react";

export default function HiddenFiles() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const resfiles = await (await fetch("api/gdrive/list-hidden-files")).json();
		setFiles(resfiles);
	};

	return (
		<div>
			<Header />
			<HiddenImageView files={files} />
		</div>
	);
}
