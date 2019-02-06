import {Timeline, TimelineHandler, Player, PlayState} from '@momentumfx/core';

// timeline gets player
// timeline generates new player
// timeline can buffer 

@Timeline({
  name: 'myTimeline'
})
export class MyTimeline implements TimelineHandler {
  init(parent: TimelineHandler): void {

  }

  render(players: Player[]): Player[] {
    const player = new GroupPlayer(players);
    return [player];
  }
}

class GroupPlayer implements Player {
  state: PlayState = 0;
  constructor(private _players: Player[]) {

  }

  play() {
    this._players[0].play();
    //this._players.forEach(p => p.play());
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }

  finish(): void {
    throw new Error("Method not implemented.");
  }
}