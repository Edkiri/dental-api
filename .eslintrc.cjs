module.exports = {
	root: true,
	extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
	env: {
		es2017: true,
		node: true,
	},
	globals: {
		NodeJS: true,
	},
	rules: {
		'no-console': 0,
		'consistent-return': 0,
		'import/prefer-default-export': 0,
		'no-underscore-dangle': 0,
		'import/extensions': 0,
	},
};
