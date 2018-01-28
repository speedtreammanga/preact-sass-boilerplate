import { h, render, Component } from 'preact';
import App from './components/app';

const init = () => render(<App />, document.getElementById('root'));

if (module.hot) {
	// module.hot.accept('./components/app', () => requestAnimationFrame(init()));
	module.hot.accept('./components/app', () => {
		const NewApp = require('./components/app').default;
		document.body.removeChild(document.getElementById('root'));
		render(
			<div id="root">
				<NewApp />
			</div>
		, document.body);
		console.clear();
	});
}

init();
