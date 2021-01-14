import { useEffect, useState } from "react";
import Header from "./../components/Header";
import UploadFiles from "../components/UploadFile";
import ImageView from "./../components/imagesView";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const [files, setFiles] = useState([]);

	useEffect(() => {
		loadData();
		router.prefetch("/hiddenfiles");
	}, []);

	const loadData = async () => {
		const resfiles = await (await fetch("api/gdrive/gdrive-api")).json();
		setFiles(resfiles);
	};

	console.log("Files loaded " + files.length);
	return (
		<div>
			<Header />
			<ImageView
				type="Hide"
				property="true"
				files={files.filter((file) => file.properties.hidden === "false")}
			/>
			<div
				style={{
					position: `fixed`,
					bottom: `25px`,
					right: `25px`,
				}}
			>
				<UploadFiles />
			</div>
		</div>
	);
}
