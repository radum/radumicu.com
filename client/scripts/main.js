import taunus from 'taunus/browser/debug';
import wiring from '../../.bin/wiring';

var main = document.getElementsByTagName('main')[0];

taunus.mount(main, wiring);
