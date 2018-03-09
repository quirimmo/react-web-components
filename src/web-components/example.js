import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';
import SimpleReactComponent from './../react-components/SimpleReactComponent.component.jsx';

class Example extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['first-property', 'callback-property'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		switch (attr) {
			case 'first-property':
				console.log(`Value changed from ${oldValue} to ${newValue}`);
				break;
			default:
				console.log('Property not covered by attributeChangedCallback of HTML Custom Element');
				break;
		}
	}

	connectedCallback() {
		const mountPoint = document.createElement('span');
    	this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
		const callbackProperty = this.getAttribute('callback-property');
		ReactDOM.render(<SimpleReactComponent callback={callbackProperty} />, mountPoint);
		retargetEvents(this);
	}
}

customElements.define('ex-ample', Example);

export default Example;
