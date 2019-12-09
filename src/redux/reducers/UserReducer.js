export default (state = { currentUser: null }, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
