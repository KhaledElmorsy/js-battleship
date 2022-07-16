export function createElement(elementHTML) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = elementHTML;
  if(wrapper.childElementCount === 1) return wrapper.firstChild;
  return wrapper;
};
