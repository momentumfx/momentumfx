import momentum from '../index';
import { TimelineHandler } from '../intefaces';

export default ({name} : {name: string}) => 
  ({prototype: {render}}: {prototype: TimelineHandler}) => {
    momentum.timeline(name, render);
  }