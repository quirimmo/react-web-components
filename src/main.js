window.changeExampleFirstProperty = changeExampleFirstProperty;
window.callback = callback;

function changeExampleFirstProperty() {
	document.querySelector('ex-ample').setAttribute('first-property', 'bonjour!');
}

function callback(param1, param2) {
	console.log('Wow I work (((( )))) !', param1, param2);
}