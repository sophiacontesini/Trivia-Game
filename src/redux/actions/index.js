export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const REQUEST_FAILED = 'SAVE_TOKEN';
export const LOGIN = 'LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const saveToken = (payLoad) => ({
  type: SAVE_TOKEN,
  payLoad,
});

const requestFailed = (payLoad) => ({
  type: REQUEST_FAILED,
  payLoad,
});

export function getTokenAction() {
  return async (dispatch) => {
    dispatch(requestToken);
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const result = await response.json();
      dispatch(saveToken(result));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}

export const makeLoginAction = (name, email) => ({
  type: LOGIN,
  name,
  email,
});

export const updateScoreboardAction = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const resetScoreboardAction = () => ({
  type: RESET_SCORE,
  score: 0,
});
