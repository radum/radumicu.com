function bioAboutController(model, container, route) {
	console.log('Rendered bio about view %s using model:\n%s', route.action, JSON.stringify(model, null, 2));
}

module.exports = bioAboutController;
