import { parse } from 'css-what';

export const h = <T extends HTMLElement = HTMLElement>(
  selector: string,
  ...childNodes: Node[]
): T => {
  const [element] = parse(selector).map((selectors) =>
    selectors.reduce((element: HTMLElement | null, details) => {
      if (element === null && details.type !== 'tag') {
        element = document.createElement('div');
      }

      if (details.type === 'tag') {
        return document.createElement(details.name);
      }

      if (details.type === 'attribute' && details.name !== 'class') {
        element.setAttribute(details.name, details.value ?? '');
      }

      if (details.type === 'attribute' && details.name === 'class') {
        element.classList.add(details.value);
      }

      return element;
    }, null)
  );

  childNodes.forEach((childNode) => element.append(childNode));

  return element as T;
};
