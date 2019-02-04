import momentum from '../index';
import { ChangeType } from '../api/capture';

export default (
  element: HTMLElement, 
  type: ChangeType | ChangeType[], 
  attr?: string|string[]
) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  console.log(target, propertyKey, descriptor);
  momentum.capture(element, type, attr);
};
