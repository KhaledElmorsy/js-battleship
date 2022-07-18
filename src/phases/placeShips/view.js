import { createElement, timeout, waitTransitions } from "../viewHelpers";

export default function view() {
  const container = document.getElementById('hud');

  const rotateButton = createElement('<div id="rotate-button" class="button">Rotate</div>');
  const shipPreview = createElement('<div id="ship-preview">■ ■ ■ ■</div>');
  const rotateContainer = createElement('<div id="rotate-container"></div>');
  rotateContainer.append(shipPreview, rotateButton);

  const saveButton = createElement('<div id="save-ships" class="button">Save</div>');

  const resetButton = createElement('<div id="reset-button" class="button">Reset</div>');
  const buttonContainer = createElement('<div id="add-ship-buttons"></div>');

  buttonContainer.append(rotateContainer, resetButton, saveButton);

  const curtain = createElement('<div id="add-ship-curtain" class="hide"></div>')
  const addComplete = createElement('<div id="add-complete" class="hide">Good luck!</div>')
  
  const buttons = {
    rotateButton,
    saveButton,
    resetButton
  }

  function show() {
    container.appendChild(buttonContainer);
  }

  async function end() {
    container.appendChild(curtain);
    await timeout(0)
    await waitTransitions('hide', true, curtain);
    await timeout(400);

    buttonContainer.remove();
    
    curtain.appendChild(addComplete);
    await timeout(0)
    await waitTransitions('hide', true, addComplete);
    
    await timeout(1000);
    await waitTransitions('hide', false, addComplete, curtain);
    await timeout(0);
    
    addComplete.remove();
    curtain.remove();
  }

  function rotatePreivew() {
    shipPreview.classList.toggle('rotated');
  }

  function updatePreviewLength(shipLength) {
    const preview = Array(shipLength).fill('■').join(' ');
    shipPreview.textContent = preview;
  }

  return { show, end, updatePreviewLength, rotatePreivew, rotatePreivew, buttons }
}
