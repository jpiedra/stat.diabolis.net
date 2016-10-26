import React from "react";

import StatsCell from "./StatsCell";

export default class StatsRow extends React.Component {
	// we now use constructor() instead of getInitialState, 
	// and set the state member of this component after super()
	constructor(props) {
		super(props);
		this.state = {
			row: this.convertToArray(this.props.rowData)
		};
		// instead of using componentDidMount(), update state
		// in constructor()
		//this.setState({
		//	row: this.convertToArray(this.props.rowData)
		//});
	}

	convertToArray(row) {
		var arr = $.map(row, function(el) {
			return el;
		})

		return arr;
	}

	render() {
		var fragCells = this.state.row.map(function(value){
			return (
				<StatsCell cellData={value} />
			)
		});

		return (
			<tr>
				{fragCells}
			</tr>
		);
	}
}