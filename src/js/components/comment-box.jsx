import React, {Component} from 'react';
import CommentList from './comment-list';
import CommentForm from './comment-form';
import actions from '../actions/actions';
import { Provider } from 'nuclear-js-react-addons';
import reactor from '../reactor';

export default class CommentBox extends Component {

	constructor(props) {
		super(props);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}

	handleCommentSubmit(comment) {
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	componentDidMount() {
		setInterval(() => actions.fetchComments(), this.props.pollInterval);
	}

	render() {
		return (
			<Provider reactor={reactor}>
				<div className="commentBox">
					<h1>Comments</h1>
					<CommentList />
					<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
				</div>
		</Provider>
		);
	}

}
