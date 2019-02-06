export const enum PlayState {
  Running = 1,
  Paused = 2,
  Finished = 100,
  Destroyed = 999
}

export interface Player {
  state: PlayState|string;
  play(): void;
  destroy(): void;
  finish(): void;
}

export interface Effect {
  type: string;
  element: Element;
  domFn: Function|null;
  player: Player|null;
  data: any|null;
}

export interface PlayerHandler {
  capture(effects: Effect[]): void;  
}

export interface TimelineHandler {
  init(parent: TimelineHandler): void;
  render(players: Player[]): Player[];
}