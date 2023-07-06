export function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getRandomDateTime() {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const endOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();

	const randomDay =
		Math.floor(Math.random() * (endOfMonth - currentDate.getDate() + 1)) + currentDate.getDate();
	const randomTime = Math.floor(Math.random() * (16 * 2 - 9 * 2 + 1)) * 30 + 9 * 60;

	const randomDateTime = new Date(
		currentDate.getFullYear(),
		currentMonth,
		randomDay,
		0,
		randomTime
	);
	return randomDateTime.toISOString();
}
