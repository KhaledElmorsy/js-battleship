import boardView from './view';

export default async function (playerList) {
  const boardViews = Array.from(playerList, (player, i) =>
    boardView(player, i)
  );
  boardViews.forEach(board => board.show());

  return { boardViews, playerList }
}
