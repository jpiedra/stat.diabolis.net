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
			qKname: '',
			qMap: '',
			qVname: ''
		};
		this.getData = this.getData.bind(this);
		
		this.evalKname = this.evalKname.bind(this);
		this.changeSearchKname = this.changeSearchKname.bind(this);

		this.evalMap = this.evalMap.bind(this);
		this.changeSearchMap = this.changeSearchMap.bind(this);

		this.evalVname = this.evalVname.bind(this);
		this.changeSearchVname = this.changeSearchVname.bind(this);
		
		this.getData(this.props.endpoint);
	}

	getData(query) {
		if (this.state.isFirstCall) this.state.isFirstCall = false;
		$.ajax({
			url: query,
			dataType: 'json',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			},
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

	evalKname(kname) {
		var param = "";
		if (kname === "") {
			param = "";
		} else {
			param = "with=kname|" + kname;
		}
		return param;
	}

	evalMap(map) {
		var param = "";
		if (map === "") {
			param = "";
		} else {
			param = "with=map|" + map;
		}
		return param;
	}

	evalVname(vname) {
		var param = "";
		if (vname === "") {
			param = "";
		} else {
			param = "with=vname|" + vname;
		}
		return param;
	}

	changeSearchKname(event) {
		event.preventDefault();
		var text = event.target.value || "";	
	
		this.setState({
			qKname: text,
			lastRequest: this.props.endpoint + this.evalKname(text)
		}, function() {
			this.getData(this.state.lastRequest);
		});
	}

	changeSearchMap(event) {
		event.preventDefault();
		var text = event.target.value || "";	
	
		this.setState({
			qMap: text,
			lastRequest: this.props.endpoint + this.evalMap(text)
		}, function() {
			this.getData(this.state.lastRequest);
		});
	}

	changeSearchVname(event) {
		event.preventDefault();
		var text = event.target.value || "";	
	
		this.setState({
			qVname: text,
			lastRequest: this.props.endpoint + this.evalVname(text)
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
				<div className="panel-body">
					<h4>Search by a single field</h4>
					<p>Returns 1,000 latest entries</p>
					<div className="row">
						<div className="col-md-4">
							Player:
							<input onChange={this.changeSearchKname} value={this.state.qKname} placeholder="Enter player name..." />
						</div>
						<div className="col-md-4">
							Map:
							<input onChange={this.changeSearchMap} value={this.state.qMap} placeholder="Enter map title..." />
						</div>
						<div className="col-md-4">
							Victim:
							<input onChange={this.changeSearchVname} value={this.state.qVname} placeholder="Enter monster name..." />
						</div>
					</div>
				</div>
				<table className="table">
					<tbody>{fragRows}</tbody>
				</table>
			</div>
		);
	}
}
