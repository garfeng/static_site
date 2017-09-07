import Marked from 'marked';

import hightlight from 'highlight.js';

import $ from 'jquery';

const renderer = new Marked.Renderer();

renderer.blockquote = (text) => {
	return `<blockquote class="blockquote">${text}</blockquote>`;
};

renderer.code = (code, lang) => {
	//return code;
	code = hightlight.highlightAuto(code).value;
	return `<pre class="code">${code}</pre>`;
};

const markdown = (src) => Marked(src, {
	renderer: renderer
});

const fillWithMarkdown = (obj) => {
	console.log(obj);
	for (let key in obj) {
		const node = $(`#${key}`);
		if (node.length > 0 && typeof obj[key] == "string") {
			node.html(markdown(obj[key]));
		}
	}
}

export default markdown;

export {
	fillWithMarkdown
};