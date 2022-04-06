import { PLAYER_INFOS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_INFOS:
    return {
      name: action.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default player;
