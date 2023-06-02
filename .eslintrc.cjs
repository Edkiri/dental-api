module.exports = {
	root: true,
	extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	globals: {
		NodeJS: true,
	},
	rules: {
		'no-console': 0,
	},
};
