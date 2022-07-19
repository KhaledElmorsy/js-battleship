import './style.css'
/**
 * 
 * @param {Player[]} players 
 */
export default async function battle(players) {
  
  function selectSpace(currentPlayer) {
    return new Promise((resolve) => {
      if (currentPlayer.isPC) resolve({
        col: Math.floor(Math.random() * 15),
        row: Math.floor(Math.random() * 15),
        playerIndex: 0,
      });
      else {
        players.forEach((player, i) => {
          if (player === currentPlayer) return
          player.boardView.spaceElements.forEach((space) => {
            space.onclick = () => {
              const { col, row } = player.boardView.getIndices(space);
              resolve({ col, row, playerIndex: i })
            }
          })
        }
        )
      }
    })
  }
  
  function getWinner() {
    const stillPlaying = players.filter((player) => !player.lost);
    return stillPlaying.length === 1? stillPlaying[0] : null
  }

  const winner = await new Promise(async (resolveGame) => {
    let winner;
    let turn = 0;
    const updateTurn = () => turn = turn? 0 : 1;
    while(!winner) {
      const {col, row, playerIndex} = await selectSpace(players[turn]);
      if (players[playerIndex].board.checkHit(col, row)) continue
      players[turn].attack(players[playerIndex], col, row);
      players[playerIndex].boardView.update();
      winner = getWinner();
      updateTurn();
    }
    resolveGame(winner);
  });

  return winner.name
}
