import {Timeline, TimelineHandler, Player, Effect, PlayState} from '@momentumfx/core';

@Timeline({
  name: 'myTimeline'
})
export class MyTimeline implements TimelineHandler {
  init(parent: TimelineHandler): void {

  }
  capture(effects: Effect[]): void {
    throw new Error("Method not implemented.");
  }
  render(players: Player[]): Player[] {
    console.log(players, 'mytimeline');
    
    return players;
  }
  // @Listen('.divCapture')
  // buildStyleAnimation(element, effectOrPlayer) {

  // }
}

@Timeline({
  name: 'list'
})
export class MyList implements TimelineHandler {  
  init(parent: TimelineHandler): void {
    throw new Error("Method not implemented.");
  }
  capture(effects: Effect[]): void {
    throw new Error("Method not implemented.");
  }
  render(players: Player[]): Player[] {
    console.log(players, 'list');
    return players;
  }
}