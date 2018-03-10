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
		const dynamicArguments = [].concat(
			onCallback.substring(onCallback.lastIndexOf('(') + 1, onCallback.lastIndexOf(')')).split(','),
			onCallback
		);
		const fn = new Function(...dynamicArguments);
		fn.call(null, { test: 'hello world' }, { test2: 'hello world 2' });
	}
}

export default SimpleReactComponent;
