import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/comment-box';
import CommentStore from './stores/comment-store'
import FormStore from './stores/form-store'
import reactor from './reactor';

reactor.registerStores({
  'commentStore': CommentStore,
  'formStore': FormStore,
});

ReactDOM.render(
	<CommentBox reactor={reactor} url="/api/comments" pollInterval={2000}/>,
	document.getElementById('content')
);
