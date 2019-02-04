import momentum from '@momentumfx/core';
import {defineCustomElements} from '@momentumfx/components/dist/loader';

import './style.css';

import './timeline';

defineCustomElements(window);
momentum.init({});

const box = document.querySelector('.box');
const content = box.querySelector('.content');

box.addEventListener('click', () => {
  content.classList.toggle('open');
})
