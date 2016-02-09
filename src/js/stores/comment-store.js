import { Store, toImmutable } from 'nuclear-js'

export default Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on("RECEIVE_COMMENTS", receiveComments);
  }
})

function receiveComments(state, comments ) {
  console.log("RECEIVE COMMENTS INS COMMENT STORE");
  let newComments = toImmutable(comments);
  console.log(newComments);
  return state = newComments;
}
