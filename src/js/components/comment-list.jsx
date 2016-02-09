import React, {Component} from 'react';
import Comment from './comment';
import getters from '../getters/getters';
import { Provider, connect, nuclearComponent } from 'nuclear-js-react-addons'

@connect(props => ({
    comments: getters.comments
}))
export default class CommentList extends Component {

	render() {

    const {
      reactor,
      comments
    } = this.props;

		var commentNodes = comments.valueSeq().map(comment => {

			return (
				<Comment author={comment.get('author')} key={comment.get('id')}>
					{comment.get('text')}
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
