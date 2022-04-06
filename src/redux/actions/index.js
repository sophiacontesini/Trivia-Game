export const PLAYER_INFOS = 'PLAYER_INFOS';

export const savePlayerInfos = (name, email) => ({
  type: PLAYER_INFOS,
  name,
  email,
});
