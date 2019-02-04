import { Config } from '@stencil/core';

export const config = {
  namespace: 'mfx',
  input: 'src/index.ts',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' }    
  ]
};
