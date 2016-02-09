import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../actions/action-types';

export default Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on(actionTypes.FETCH_COMMENTS_SUCCESS, fetchCommentsSuccess);
    this.on(actionTypes.CREATE_COMMENT_START, createCommentStart);
  }
})

function fetchCommentsSuccess(state, comments) {
  let newComments = toImmutable(comments);
  return state = newComments;
}

function createCommentStart(state, comment) {
  let newComment = toImmutable(comment);
  return state.merge(newComment);
}
