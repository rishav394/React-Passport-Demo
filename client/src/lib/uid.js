export default function() {
	return (
		Math.random()
			.toString(36)
			.substr(2, 9) +
		Math.random()
			.toString(36)
			.substr(2, 9) +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
}
