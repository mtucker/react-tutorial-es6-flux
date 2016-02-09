import { Reactor } from 'nuclear-js';
import actions from './actions/actions';
import CommentStore from './stores/comment-store';

const reactor = new Reactor({
  debug: true
})

export default reactor
