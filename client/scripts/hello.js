/* global $ */

import Console from './lib/console';
import $ from 'jquery';

class Hello {
	constructor () {
		this.reply = 'Hello!';
		this.logger = new Console();
	}

	hi () {
		this.logger.log(this.reply + ' ' + name);
	}

	domUpdate () {
		setTimeout(() => {
			$('body').addClass('red');
		}, 2000);
	}
}

export default Hello;
