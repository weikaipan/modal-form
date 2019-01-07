// import { createStore, combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

// const reducers = {
//   form: formReducer
// }

// const reducer = combineReducers(reducers);
// const store = createStore(reducer);

// export default store;
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
