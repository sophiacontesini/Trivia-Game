import { LOGIN, UPDATE_SCORE } from '../actions';

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
      name: action.name,
      gravatarEmail: action.email,
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      score: state.score + action.score,
    };
  }
  default:
    return state;
  }
};

export default player;
