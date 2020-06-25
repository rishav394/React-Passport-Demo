import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/Homepage';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={HomePage} />
			</div>
		</BrowserRouter>
	);
};
