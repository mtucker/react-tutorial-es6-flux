import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../actions/action-types';

export default Store({
  getInitialState() {
    return toImmutable({author: '', text: ''});
  },

  initialize() {
    this.on(actionTypes.SET_FORM_VALUE, setFormValue);
    this.on(actionTypes.CREATE_COMMENT_SUCCESS, resetForm);
  }

});

function setFormValue(state, { fieldName, value} ) {
  return state.setIn([fieldName], value);
}

function resetForm(state){
  state = toImmutable({author: '', text: ''});
  return state;
}
