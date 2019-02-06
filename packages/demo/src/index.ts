import momentum from '@momentumfx/core';
import {defineCustomElements} from '@momentumfx/components/dist/loader';

import './style.css';
import './timeline';

defineCustomElements(window);
momentum.init();

document.body.addEventListener('mfxTimelineRender', (e: CustomEvent) => {
  const detail = e.detail;
  if (detail) {
    const players = Array.isArray(detail) ? detail : [detail];
    players.forEach(player => {
      player.play();
    });
  }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(b => {
  b.addEventListener('click', () => {
    buttons.forEach(b => {
      b.classList.toggle('loading');
    });
  });
});
