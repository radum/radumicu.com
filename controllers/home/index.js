module.exports = function (req, res, next) {
	res.viewModel = {
		model: {
			title: 'radumicu.com - Welcome to my corner of the web'
		}
	};

	// Render the view
	next();
};
