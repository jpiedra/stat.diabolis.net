import React from "react";
import ReactDOM from "react-dom";

import StatsRow from "./StatsRow";

export default class StatsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statsData: [],
			lastRequest: this.props.endpoint,
			isFirstCall: true
		};
		this.getData();
	}

	getData() {
		if (this.state.isFirstCall) this.state.isFirstCall = false;
		$.ajax({
			url: this.state.lastRequest,
			dataType: 'json',
			crossDomain: true,
			cache: false,
			success: function(data) {
				this.setState({
					statsData: data
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.state.lastRequest, status, err.toString());
			}.bind(this)
		});
	}

	render() {
		// map each object to a component
		// var fragColumns = Object.keys(statsData[0]);
		var fragRows = this.state.statsData.map(function(entry){
			return (
				<StatsRow rowData={entry} />
			);
		});

		return (
			<table className="table">
				<tbody>{fragRows}</tbody>
			</table>
		);
	}
}
