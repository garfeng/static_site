import $ from 'jquery';


const callbackAlias = (callback) => {
  return function(data,status) {
      if (status == "success" && typeof callback == "function") {
      if (typeof data == "string") {
        callback(JSON.parse(data));
      } else if (typeof data == "object") {
        callback(data)
      }
    }
  }
}

export const GetOneData = (model = "", id = "", callback = null) => {
  if (model == "" || id == "") {
    return;
  }

  const url = `${window.config.database}/${model}/one/${id}.json`;

  $.get(url,callbackAlias(callback));
}

export const GetListData = (model = "", page = "", callback = null) => {
  if (model == "" || page == "") {
    return;
  }
  const url = `${window.config.database}/${model}/list/${page}.json`;

  $.get(url,callbackAlias(callback));
}