import React from "react";

export default class StatsCell extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<td>
				{this.props.cellData}
			</td>
		)
	}
}