import React, {Component} from 'react';

export default class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {data: []};
	}

	rawMarkup() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	}

	render() {
		return (
			<div className="comment">
				<h2 className="comment">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}

}
