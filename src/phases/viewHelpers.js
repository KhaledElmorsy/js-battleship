export function createElement(elementHTML) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = elementHTML;
  if (wrapper.childElementCount === 1) return wrapper.firstChild;
  return wrapper;
}

/**
 * Function that returns a promise which adds a class to elements in an array.
 * The class should trigger transitions. The promise reolvse when all the transitions end.
 * @param {string} className Class to add to the element to trigger transition
 * @param {boolean} remove False: Add class. True: Remove class.
 * @param {HTMLElement} elements Target element(s).
 */
export function waitTransitions(className, remove, ...elements) {
  return new Promise((resolve) => {
    const transitions = elements.map((element) => {
      return new Promise((resolveTransition) => {
        const method = remove? 'remove' : 'add';
        element.classList[method](className);
        element.ontransitionend = (e) => {
          if (e.target !== e.currentTarget) return
          element.ontransitionend = undefined;
          resolveTransition();
        };
      });
    });
    Promise.all(transitions).then(resolve);
  });
}

/**
 * Returns a promise that resolves after the input duration
 * @param {number} duration The duration to wait before resolve in 'ms'
 * @returns {Promise}
 */
export function timeout(duration) {
  return new Promise((resolve) => setTimeout(resolve,duration))
}
