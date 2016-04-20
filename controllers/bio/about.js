module.exports = function (req, res, next) {
	res.viewModel = {
		model: {
			title: 'Radu Micu \u2014 I can see what you see not',
			meta: {
				description: 'I love the web.'
			}
		}
	};

	// Render the view
	next();
};
