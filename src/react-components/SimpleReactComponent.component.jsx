import React from 'react';

class SimpleReactComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onExecuteCallback = this.onExecuteCallback.bind(this);
	}

	render() {
		return (
			<section>
				<p>Yeah it works!</p>
				<button onClick={this.onExecuteCallback}>Execute Callback!</button>
			</section>
		);
	}

	onExecuteCallback() {
		const onCallback = this.props.callback;
		const fn = new Function('theCallback', onCallback);
		fn.call(null, { test: 'hello world' });
	}
}

export default SimpleReactComponent;
