import { Component, Prop, State, Element, Listen, Event, EventEmitter } from '@stencil/core';
import momentum, { Player } from '@momentumfx/core';
import {MomentumEvent, EventType} from '../interfaces';

@Component({
  tag: 'mfx-1timeline'
})
export class MfxTimeline {
  private _deferPlayerFlush: Function;

  @Prop() handler: string;
  @State() players = [];

  @Element() el: HTMLElement;

  @Event() mfxTimelineInit: EventEmitter;
  @Event() mfxTimelineRender: EventEmitter;

  constructor() {
  }

  @Listen('mfxTimelineInit')
  onInit(event) {       
    if(event.detail !== this) {
      this.players.push(event.detail);
      event.stopPropagation();      
    }
  }

  @Listen('mfxTimelineRender')
  onRender({detail: players, srcElement}: {detail: Player[], srcElement: HTMLElement}) {    
    if(srcElement !== this.el) {
      console.log(`${this.handler} called for render`, players);
    }
  }

  @Listen('mfxPlayerInit')
  onPlayerInit(event: CustomEvent<MomentumEvent<Player>>) {
    const detail: MomentumEvent<Player> = event.detail;
    if (detail.type === EventType.Player) {
      const player = detail.value;
      this.players.push(player);
      event.stopPropagation();
      this._deferPlayerFlush();
    }
  }

  componentWillLoad() {
    const timelineHandler = momentum.timeline(this.handler);
    this._deferPlayerFlush = rafDebounce(() => {
      let players = this.players;
      this.players = [];
      players = timelineHandler.render(players);
      this.mfxTimelineRender.emit(players);
    });
    
    if (!this.handler) {
      throw new Error(`Couldn't find '${this.handler}' timeline handler`);
    }

    this.mfxTimelineInit.emit(this);
  }
}

function rafDebounce<T>(flushFn: Function) {
  let rafIsWaiting = false;
  return () => {
    if (!rafIsWaiting) {
      window.requestAnimationFrame(() => {
        flushFn();
        rafIsWaiting = false;
      });
      rafIsWaiting = true;
    }
  };
}