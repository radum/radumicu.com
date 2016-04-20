// export default function (model, container, route) {
// 	console.log('Rendered home index view %s using model:\n%s', route.action, JSON.stringify(model, null, 2));
// };

function homeIndexController(model, container, route) {
	console.log('Rendered home index view %s using model:\n%s', route.action, JSON.stringify(model, null, 2));
}

module.exports = homeIndexController;
