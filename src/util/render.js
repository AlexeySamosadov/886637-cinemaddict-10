const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
};

const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.insertAdjacentElement(`afterend`, element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.insertAdjacentElement(`beforebegin`, element);
      break;
  }
};

const replaceComponentElement = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  if (parentElement) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {render, replaceComponentElement, RenderPosition};
