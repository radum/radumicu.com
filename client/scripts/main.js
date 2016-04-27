import taunus from 'taunus/browser/debug';
// import wiring from '../../.bin/wiring';

const wiring = require('../../.bin/wiring');

const main = document.getElementsByTagName('main')[0];

taunus.mount(main, wiring);
