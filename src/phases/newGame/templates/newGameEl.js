import { createElement } from "../../viewHelpers"

const elementHTML = 
`<div id="new-game">
  <input type="text" id="name-input" placeholder="Enter Name">
  <div id="start-button">Start</div>
</div>`

export default createElement(elementHTML)
