all:clean
	if [ ! -d gh-pages ] ; then mkdir gh-pages ; fi
	@webpack --optimize-minimize -p 

static_file:
	cp config gh-pages/ -rf
	cp dist/* gh-pages/ -rf

clean:
	@rm dist/* -rf

dev:clean
	@webpack 
	@ls dist/static/*/* -lh
	#cp src/index.html dist/
	#cp src/electron_setup.js dist/
	#cp src/package.json dist/
	cp test_data dist/ -rf

env:
	NODE_ENV=development cnpm install

debug:
	webpack-dev-server --devtool eval --progress --colors --content-base build