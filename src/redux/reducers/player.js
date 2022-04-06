export const LOGIN = 'LOGIN';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    return {
      ...state,
      player: action.payLoad,
    };
  }
  default:
    return state;
  }
};

export default player;
