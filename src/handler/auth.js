import $ from 'jquery';
import storage from './storage';

import {
	Secret
} from './sha1';

const all_auth_item = ["username", "uid", "hash", "time", "group"];

const UpdateLoginStatus = (data, callback = null) => {
	if (data.code !== 0) {
		storage.removeItems(...all_auth_item);
		if (typeof callback === "function") {
			callback();
		}
		return;
	}
	storage.setItems(data.data);
	if (typeof callback === "function") {
		callback();
	}
}

export const AuthData = () => {
	let data = storage.getItems(...all_auth_item);
	data["time"] = parseInt(data["time"]);
	return data;
}

export const AuthDataToPost = () => {
	const {
		uid,
		time,
		hash
	} = AuthData();
	return {
		uid,
		time,
		hash
	};
}

const checkAuthValid = ({
	username = null,
	uid = null,
	hash = null,
	time = null,
	group = null
}) => {
	return typeof username === "string" &&
		typeof uid === "string" && uid.length === 24 &&
		typeof hash === "string" &&
		typeof time === "number" &&
		typeof group === "string"
}

export const InitLoginStatus = (callback = null) => {
	if (!checkAuthValid(AuthData())) {
		UpdateLoginStatus({
			code: -1
		});
		return;
	}

	const url = `${Domain}/is_login.json`;
	const {
		uid,
		hash,
		time
	} = AuthData();
	const data = {
		uid,
		hash,
		time
	}

	$.post(url, {
		auth: JSON.stringify(data)
	}, data => {
		console.log(data)
		UpdateLoginStatus(data, callback);
	});
};

const kSecretKey = "vZ4ikID77suZWuqCKauXfU6onVdgOdeQKLoQzfdB59JlzeCZJny1CXYzFnT2fAXc8fk1jV6eLochHEFNu4WhggVKMuNSMALTTnISRQpoyCPKe3bzOLb0Boi7eatXf2HX";

const ParseHashFirst = ({
	username,
	password
}) => {
	return Secret(`${username}_${password}`, kSecretKey);
}

const ParseHash = ({
	username = "",
	password = "",
	time = 0
}) => {
	console.log(`${time.toString(16)}_${username}_${password}`);
	return Secret(`${time.toString(16)}_${username}_${password}`, kSecretKey);
}

const ParseLoginData = ({
	username = "",
	password = "",
	time = 0
}) => {
	if (username === "" || password === "" || time === 0) {
		return null
	};

	const pw2 = ParseHashFirst({
		username,
		password
	});
	console.log("pw2 = ", pw2, time)
	return {
		username: username,
		time: time,
		hash: ParseHash({
			username,
			password: pw2,
			time
		})
	};
}

const ParseRegisterData = ({
	username = "",
	password = ""
}) => {
	if (username === "" || password === "") {
		return null
	}
	const pw2 = ParseHashFirst({
		username,
		password
	});
	return {
		username,
		password: pw2
	}
}

/*
password:"jJjjaGRhRoTECtQeALyVM4SR2AM"
username:"admin"
*/
export const Register = ({
	username,
	password
}, onRegister, onRegisterError) => {
	const url = `${Domain}/register.json`;
	const post_data = ParseRegisterData({
		username,
		password
	});
	if (post_data === null) {
		// show empty info
		return;
	}
	const post_data2 = {
		auth: JSON.stringify(post_data)
	};
	$.post(url, post_data2, (data, status) => {
		if (data.code === 0) {
			onRegister(data.data);
		} else {
			onRegisterError(data.describe);
		}
	})
}

export const Login = ({
	username = "",
	password = ""
}, onLogin, onLoginError) => {
	const url = `${Domain}/login.json`;
	const time = Date.parse(new Date()) / 1000;
	const post_data = ParseLoginData({
		username,
		password,
		time
	});
	if (post_data === null) {
		// show empty info
		return;
	}
	const post_data2 = {
		auth: JSON.stringify(post_data)
	};
	$.post(url, post_data2, (data, status) => {
		if (data.code === 0) {
			data.data["group"] = data.data["group"] || "user";
			onLogin(data.data);
		} else {
			onLoginError(data.describe);
		}
	})
}

InitLoginStatus();


export const IsLogin = () => {
	const data = AuthData();
	return checkAuthValid(data);
}

export const Logout = (onLogout = null) => {
	UpdateLoginStatus({
		code: -1
	}, onLogout);
}

export const IsAdmin = () => {
	if (!IsLogin()) {
		return false;
	}
	const data = AuthData();
	return data.group === "admin";
}

export const UserName = () => storage.getItem("username");
export const Uid = () => storage.getItem("uid");

export const OnLogin = (props) => {
	if (IsLogin()) {
		const Comp = props.component || "div";
		const newProps = Object.assign({}, props);
		delete newProps.component;
		return <Comp {...newProps} />
	} else {
		return null;
	}
}

export const OnNotLogin = (props) => {
	if (!IsLogin()) {
		const Comp = props.component || "div";
		const newProps = Object.assign({}, props);
		delete newProps.component;
		return <Comp {...newProps} />
	} else {
		return null;
	}
}

export const RedirectOnNotLogin = (props) => {
	if (!IsLogin()) {
		location.href = "/login";
		return null;
	} else {
		const Comp = props.component || "div";
		const newProps = Object.assign({}, props);
		delete newProps.component;
		return <Comp {...newProps} />
	}
}

export const ShowButtonOnNotLogin = (props) => {
	if (!IsLogin()) {
		return <div className="center">
      <p><a className="btn btn-outline-primary" href="/login">
        登录
      </a>{' '}
      <a className="btn btn-outline-secondary" href="/register">
        注册
      </a>
      </p>
      <p>
        {"(●'◡'●)ﾉ♥ ｡◕‿◕｡"}
      </p>
    </div>
	} else {
		const Comp = props.component || "div";
		const newProps = Object.assign({}, props);
		delete newProps.component;
		return <Comp {...newProps} />
	}
}