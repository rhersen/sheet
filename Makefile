install:	pull mocha /opt/nginx/secure/sheet/browser-bundle.js /opt/nginx/secure/sheet/index.html

pull:
	git pull

mocha:
	node_modules/.bin/mocha

browser-bundle.js:	index.js htmlTable.js formatTimes.js times.js trains.js style.css
	node_modules/.bin/webpack --optimize-minimize

/opt/nginx/secure/sheet/browser-bundle.js:	browser-bundle.js
	cp browser-bundle.js /opt/nginx/secure/sheet/

/opt/nginx/secure/sheet/index.html:	index.html
	cp index.html /opt/nginx/secure/sheet/

