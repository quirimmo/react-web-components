# react-web-components

An example project for showing how to implement micro apps through web components.

In this case the micro app is implemented through React, which is bound to a web component directly ready to be used inside your main container application.

The web component is called `ex-ample` and it implements two attributes, one simple property and one callback in order to show how to interact with the web component (so with the micro app).

```HTML
<ex-ample first-property="hello world" callback-property="callback(a, b)">
</ex-ample>
```

The definition of this web component happens inside the `web-components/example.js` file:

```JavaScript
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
            case 'callback-property':
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
```

The web component is defined through an ES6 class which extends `HTMLElement`.

The `observedAttributes` method returns the list of attributes to be observed, and when these attributes then will change, the method `attributeChangedCallback` will be triggered.

The `connectedCallback` is triggered when the web component will be mount. We create a first container elemenet which will be the root of the React micro application.
We pass the `callback-property` as props to the React application, in order to be called later inside the React application.

In the React component `react-components/SimpleReactComponent.component.jsx` the callback is executed thorugh the following code:

```JavaScript
const onCallback = this.props.callback;
const dynamicArguments = [].concat(
    onCallback.substring(onCallback.lastIndexOf('(') + 1, onCallback.lastIndexOf(')')).split(','),
    onCallback
);
const fn = new Function(...dynamicArguments);
fn.call(null, { test: 'hello world' }, { test2: 'hello world 2' });
```

The callback is defined inside the `main.js`:

```JavaScript
function callback(param1, param2) {
    console.log('Callback executed!', param1, param2);
}
```
