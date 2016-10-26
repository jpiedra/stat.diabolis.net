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
		this.changeSearchKname = this.changeSearchKname.bind(this);
	}

	getData(query) {
		if (this.state.isFirstCall) this.state.isFirstCall = false;
		$.ajax({
			url: query,
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

	changeSearchKname(event) {
		event.preventDefault();
		this.setState({
			qKname: event.target.value,
			lastRequest: this.props.endpoint + 'with=kname|' + event.target.value
		}, function() {
			this.getData(this.state.lastRequest);
		});
	}

	render() {
		// map each object to a component
		// var fragColumns = Object.keys(statsData[0]);
		var fragRows = this.state.statsData.map(function(entry, index){
			return (
				<StatsRow rowData={entry} key={index}/>
			);
		});

		return (
			<div>	
				<div>
					<h4>Search by value</h4>
					Player Name:
					<input onChange={this.changeSearchKname} value={this.state.qKname} placeholder="Enter player name..." />
				</div>
				<table className="table">
					<tbody>{fragRows}</tbody>
				</table>
			</div>
		);
	}
}
