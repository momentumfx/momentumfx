import { TimelineHandler } from '../intefaces';

const timelines: {[key: string]: TimelineHandler} = {};

export default (name: string, handler?: TimelineHandler) : TimelineHandler => {
  if (!handler && timelines[name]) {
    return timelines[name];
  }

  if(timelines[name]) {
    throw new Error(`Momentum: A timeline named ${name} is already registerd by ${timelines[name]}`);
  }

  timelines[name] = handler;
};