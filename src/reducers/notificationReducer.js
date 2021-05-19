const notificationReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.payload;
  case 'CLOSE_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export const showAction = (message, type) => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: {
      message,
      type
    }
  };
};

export const closeAction = () => {
  return {
    type: 'CLOSE_NOTIFICATION'
  };
};

export default notificationReducer;