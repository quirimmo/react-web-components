window.changeExampleFirstProperty = changeExampleFirstProperty;
window.callback = callback;

function changeExampleFirstProperty() {
	document.querySelector('ex-ample').setAttribute('first-property', 'bonjour!');
}

function callback(param1, param2) {
	console.log('Callback executed!', param1, param2);
}