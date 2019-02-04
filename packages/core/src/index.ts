import timeline from './api/timeline';
import capture from './api/capture';

export * from './intefaces';
export * from './decorators/index';

interface Window {
  momentum: any;
}

declare var window: Window;

window.momentum = window.momentum || {
  init(options: Object) {
    // defineCustomElements(window);
    console.log(options)
  },
  timeline,
  capture
};

export default window.momentum;