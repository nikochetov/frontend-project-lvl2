publish:
		npm publish --dry-run
test:
		npm test
test-coverage:
		npm test -- --coverage
lint:
		npx eslint .
run:
		npx babel-node 'src/bin/index.js'
