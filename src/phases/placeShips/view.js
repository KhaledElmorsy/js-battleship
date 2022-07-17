import { createElement } from "../viewHelpers";

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
  
  const buttons = {
    rotateButton,
    saveButton,
    resetButton
  }

  function show() {
    container.appendChild(buttonContainer);
  }

  function hide() {
    container.removeChild(buttonContainer);
  }

  function rotatePreivew() {
    shipPreview.classList.toggle('rotated');
  }

  function updatePreviewLength(shipLength) {
    const preview = Array(shipLength).fill('■').join(' ');
    shipPreview.textContent = preview;
  }

  return { show, hide, updatePreviewLength, rotatePreivew, rotatePreivew, buttons }
}
