import React, {Component} from 'react';
import Comment from './comment';

export default class CommentList extends Component {

	constructor(props) {
		super(props);
		this.state = {data: []};
	}

	render() {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);

		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}

}
