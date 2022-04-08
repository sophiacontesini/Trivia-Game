import { UPDATE_CONFIG } from '../actions';

const INITIAL_STATE = {
  category: false,
  difficulty: false,
  type: false,
};

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CONFIG:
    return action.config;

  default:
    return state;
  }
};

export default config;
