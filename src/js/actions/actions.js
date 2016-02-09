import reactor from '../reactor'
// import {
//   RECEIVE_COMMENTS
// } from './actionTypes'

export default {

  fetchComments() {
    $.ajax({
			url: "/api/comments",
			dataType: 'json',
			cache: false,
			success: function(data) {
        reactor.dispatch("RECEIVE_COMMENTS", data );
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

  }

}
