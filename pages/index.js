import { useEffect, useState } from "react";
import Header from "./../components/Header";
import ImageView from "./../components/imagesView";

export default function Home() {
	const [files, setFiles] = useState([]);
	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const files = await (await fetch("api/gdrive/gdrive-api")).json();
		setFiles(files);
	};

	console.log("Current files in folder " + files.length);
	return (
		<div>
			<Header />

			<ImageView files={files} />
		</div>
	);
}
