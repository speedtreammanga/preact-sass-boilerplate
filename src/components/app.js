import { h, render, Component } from 'preact';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { time: "ZERO" };

		setInterval(() => {
			this.setState({
				time: new Date().toLocaleTimeString()
			});
		}, 500);
	}
	render() {
		const {time} = this.state;
		return (
			<span>Chalk: { time }</span>
		);
	}
}

export default App;
