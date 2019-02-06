export interface Effect {
  element: HTMLElement;
  type: string;
  payload: any;
  execute: Function;
}

export interface Listener {
  (element: HTMLElement, cb: (effect: Effect) => any);
}

export const enum EventType {
  Player,
  Timeline
} 

export interface MomentumEvent<T> {
  type: EventType;
  value: T;
}