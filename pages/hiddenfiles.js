import Header from "./../components/Header";
import ImageView from "./../components/imagesView";
import { useState, useEffect } from "react";

export default function HiddenFiles() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const resfiles = await (await fetch("api/gdrive/gdrive-api")).json();
		setFiles(resfiles);
	};

	return (
		<div>
			<Header />
			<ImageView
				type="Unhide"
				property="false"
				files={files.filter((file) => file.properties.hidden === "true")}
			/>
		</div>
	);
}
