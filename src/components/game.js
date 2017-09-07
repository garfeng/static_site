import {
	IsLogin
} from '../handler/auth';

import {
	fillWithMarkdown
} from '../handler/markdown';

import $ from 'jquery';

import {
	Message
} from '../handler/pop';

const data = window.data.data;

const listenerStetup = () => {
	$("#follow_him").click(() => {
		console.log("dddd")
		Message("该功能还在开发中", "info");
	});

	$("#make_friends").click(() => {
		Message("该功能还在开发中", "success");
	})

	$("#listen").click(() => {
		Message("该功能还在开发中", "warning");
	})

}

const setup = function() {
	console.log(IsLogin());
	fillWithMarkdown({
		infos: data.infos,
		context: data.context,
		log: data.log
	})
	console.log("hello world");
	listenerStetup();
}

window.Message = Message;

export default setup;