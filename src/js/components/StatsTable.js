import React from "react";
import ReactDOM from "react-dom";

import StatsRow from "./StatsRow";

export default class StatsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statsData: [],
			lastRequest: this.props.endpoint,
			isFirstCall: true,
			qKname: ''
		};
		this.getData = this.getData.bind(this);
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

	/*
	searchKname(event) {
		event.preventDefault();
		console.log("Param is:" + param);
		console.log("Query with:" + this.state.lastRequest);

		this.getData();
	}
	*/

	changeKname(event) {
		var text = event.target.value;
		this.setState({
			qKname: text
		});

		console.log(text);

		var param = '';
		if (text.length !== 0) { 
			param = 'with=kname|' + this.state.qKname;
			this.setState({
				lastRequest: this.props.endpoint + param
			});
		};

		this.getData();
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
			<div>	
				<h5>Search by value</h5>
				<form>
					Player Name:
					<input onChange={this.changeKname.bind(this)} value={this.state.qKname} />
				</form>
				<table className="table">
					<tbody>{fragRows}</tbody>
				</table>
			</div>
		);
	}
}
