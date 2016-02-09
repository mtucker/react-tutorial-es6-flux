import React, {Component} from 'react';
import { Provider, connect, nuclearMixin } from 'nuclear-js-react-addons';
import actions from '../actions/actions'
import getters from '../getters/getters'

@connect(props => ({
    values: getters.newFormValues
}))
export default class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateField(fieldName, e) {
		actions.updateCommentField(fieldName, e.target.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		actions.submitCommentForm();
	}

	render() {

		const {
      reactor,
      values
    } = this.props;

		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Your name"
					value={values.get('author')}
					onChange={this.updateField.bind(this, 'author')}
				/>
				<input
					type="text"
					placeholder="Say something..."
					value={values.get('text')}
					onChange={this.updateField.bind(this, 'text')}
				/>
				<input type="submit" value="Post" />
			</form>
		);
	}

}
