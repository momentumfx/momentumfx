import {Effect} from '../interfaces';

const ignoreElements = new WeakSet<HTMLElement>();

export function listenForClass(element: HTMLElement, cb: (effect: Effect) => any) {
  const observer = new MutationObserver(records => {
    const newClass = element.className;

    if (ignoreElements.has(element)) {
      console.log('ignore ', element, newClass);
      return;
    }

    ignoreElements.add(element);
    //tick(() => ignoreElements.delete(element));

    records.forEach(r => {
      const element = r.target as HTMLElement;
      const oldClass = r.oldValue;
      element.className = oldClass;
      const effect: Effect = {
        execute: () => {
          element.className = newClass;
        },
        element, 
        type: 'class',
        payload: {
          oldClass,
          newClass
        }
      };
      cb(effect);
    });
  });

  observer.observe(element, {
    attributeFilter: ['class'],
    attributeOldValue: true,
    subtree: true
  });

  return () => {
    observer.disconnect();
  }
}

function tick(fn: Function) {
  requestAnimationFrame(() => fn());
}