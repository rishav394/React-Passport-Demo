import React from 'react';
import HomePage from './components/Homepage';
import { BrowserRouter, Route } from 'react-router-dom';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={HomePage} />
			</div>
		</BrowserRouter>
	);
};
