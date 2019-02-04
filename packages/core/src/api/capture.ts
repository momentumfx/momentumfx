
// type StringChangeType = 'style' | 'class' | 'attr' | 'child';

export const enum ChangeType {
  Style = 'style',
  Class = 'class',
  Attribute = 'attr',
  Child = 'child'
}

// type StringChangeType = keyof typeof ChangeType;
// interface Options {
//   , 
//   callback: (summary: Summary) => void
// }

export default (element: HTMLElement, type: ChangeType | ChangeType[], attr?: string|string[]) : void => {
  console.log(element, type, attr);
  
  // return null;
}