import newGameEl from "./templates/newGameEl";

export default (function view(){
  const container = document.getElementById('hud');
  const element = newGameEl;
  const input = element.querySelector('#name-input');
  const startButton = element.querySelector('#start-button');
  
  /**
   * Append the element containing the player name input field and button to the 
   * hud and return the element
   * @returns {HTMLElement}
   */
  function show() {
    container.appendChild(element);
  }

  /**
   * Remove the input and button from the container
   */
  function hide() {
    container.removeChild(element)
  }

  return { show, hide, input, startButton }
})();
