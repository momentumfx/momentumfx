import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import {Effect, Listener, EventType, MomentumEvent} from '../interfaces';
import {Player, PlayState} from '@momentumfx/core';
import {listenForClass} from './listeners';

const REGISTRY: {[name: string]: Listener} = {
  'class': listenForClass
}

// listen="..."
@Component({
  tag: 'mfx-2player'
})
export class MfxPlayer {
  @Event() mfxPlayerInit: EventEmitter<MomentumEvent<Player>>;
  @Element() el: HTMLElement;

  @Prop() listen: string;
  @Prop() handler: string;

  componentDidLoad() { 
    // load all the listeners
    // and watch them for effects
    loadListeners(this.el, this.listen, REGISTRY, (effect) => {
      const fn = (window as any)[this.handler];
      if (fn) {

      }
      const player = buildPlayerFromEffects(effect);
      const type = EventType.Player;
      const event: MomentumEvent<Player> = {value: player, type};
      this.mfxPlayerInit.emit(event);
    });
  }
}

function loadListeners(element: HTMLElement, listener: string = '', registry: {[name: string]: Listener}, cb: (effect: Effect) => any) {
  let listenerTokens: string[];
  
  // listen="class, attr"
  // listen="['class', 'attr']"
  listener = listener.trim();
  if (listener.charAt(0) === '[') { // JSON mode
    listenerTokens = JSON.parse(listener);
  } else {
    listenerTokens = listener.split(/\s+/);
  }

  listenerTokens.forEach(token => {
    const listener = registry[token];
    if (listener) {
      listener(element, cb);
    } else {
      throw new Error(`${token} is not registered inside of the provided registry`);
    }
  });
}

function buildPlayerFromEffects(input: Effect|Effect[]): Player {
  const effects = Array.isArray(input) ? input : [input];
  return new GroupEffectsPlayer(effects);
}

class GroupEffectsPlayer implements Player {
  state: PlayState;

  constructor(private _effects: Effect[]) {}

  play(): void {
    this._effects.forEach(e => e.execute());
  }
  destroy(): void {
  }
  finish(): void {
  }
}