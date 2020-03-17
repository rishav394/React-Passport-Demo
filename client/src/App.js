import React, { Component } from 'react';
import { AppRouter } from './AppRouter';
import M from 'materialize-css';

class App extends Component {
	render() {
		M.AutoInit();
		return <AppRouter />;
	}
}

export default App;
