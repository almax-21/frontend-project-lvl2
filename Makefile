install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test

test-watch:
	npx -n '--experimental-vm-modules --no-warnings' jest --watch

test-coverage:
	npm run coverage
