import { authorize } from "./authorize";
import listGeneral from "./list-general-files";

// executes at starting of home page to authorize application
export default function DriveApi(request, response) {
	console.log("initializing Drive api");
	authorize();

	return listGeneral(request, response);
}
