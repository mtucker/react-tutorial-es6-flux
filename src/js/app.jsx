import React, {Component} from 'react';

class CommentBox extends Component {

	constructor(props) {
		super(props);
		this.state = {data: []};
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}

	loadCommentsFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
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
		this.loadCommentsFromServer();
		setInterval(() => this.loadCommentsFromServer(), this.props.pollInterval);
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}

}

class CommentList extends Component {

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

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {author: '', text: ''};
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAuthorChange(e) {
		this.setState({author: e.target.value});
	}

	handleTextChange(e) {
		this.setState({text: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		var author = this.state.author.trim()
		var text = this.state.text.trim()
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text})
		this.setState({author: '', text: ''});
	}

	render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Your name"
					value={this.state.author}
					onChange={this.handleAuthorChange}
				/>
				<input
					type="text"
					placeholder="Say something..."
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<input type="submit" value="Post" />
			</form>
		);
	}

}

class Comment extends Component {

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

ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000}/>,
	document.getElementById('content')
);
