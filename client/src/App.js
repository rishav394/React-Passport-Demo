import M from 'materialize-css';
import React, { Component } from 'react';
import { AppRouter } from './AppRouter';

class App extends Component {
	render() {
		M.AutoInit();
		return <AppRouter />;
	}
}

export default App;
