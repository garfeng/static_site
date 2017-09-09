all:clean
	@webpack --optimize-minimize -p 
	@gzip dist/static/*/*
	@gzip -l dist/static/*/*
	@gzip -d dist/static/*/*
	cp dist/static/js/* ../static/js/ -rf

clean:
	@rm dist/* -rf

dev:clean
	@webpack 
	@ls dist/static/*/* -lh
	#cp src/index.html dist/
	#cp src/electron_setup.js dist/
	#cp src/package.json dist/
	cp dist/static/js/* ../static/js/ -rf

env:
	NODE_ENV=development cnpm install

debug:
	webpack-dev-server --devtool eval --progress --colors --content-base build