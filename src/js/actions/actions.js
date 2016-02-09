import reactor from '../reactor';
import getters from '../getters/getters';
import { toImmutable } from 'nuclear-js';
import actionTypes from './action-types';

export default {

  fetchComments() {

    reactor.dispatch(actionTypes.FETCH_COMMENTS_START);

    $.ajax({
			url: "/api/comments",
			dataType: 'json',
			cache: false,
			success: function(data) {
        reactor.dispatch(actionTypes.FETCH_COMMENTS_SUCCESS, data );
			}.bind(this),
			error: function(xhr, status, err) {
				console.error("/api/comments", status, err.toString());
        reactor.dispatch(actionTypes.FETCH_COMMENTS_FAIL, data );
			}.bind(this)
		});

  },

  updateCommentField(fieldName, value){
    reactor.dispatch(actionTypes.SET_FORM_VALUE, {fieldName, value, });
  },

  submitCommentForm() {
    const formValues = reactor.evaluate(getters.newFormValues)

    reactor.dispatch(actionTypes.CREATE_COMMENT_START, formValues);

		$.ajax({
			url: '/api/comments',
			dataType: 'json',
			type: 'POST',
			data: {author: formValues.get("author"), text: formValues.get("text")},
      success: function(data) {
        reactor.dispatch(actionTypes.CREATE_COMMENT_SUCCESS, data );
			}.bind(this),
			error: function(xhr, status, err) {
				console.error("/api/comments", status, err.toString());
        reactor.dispatch(actionTypes.CREATE_COMMENT_FAIL, data );
			}.bind(this)
		});

  }

}
