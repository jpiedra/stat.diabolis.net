import React from "react";
import ReactDOM from "react-dom";

import StatsTable from "./components/StatsTable";

const app = document.getElementById('content');

ReactDOM.render(
	<StatsTable endpoint="http://api.diabolis.net/index.php?" />, 
	app	
);
