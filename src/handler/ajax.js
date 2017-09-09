import $ from 'jquery';


const callbackAlias = (callback) => {
  return function(data,status) {
      if (status == "success" && typeof callback == "function") {
      if (typeof data == "string") {
        callback(JSON.parse(data));
      } else if (typeof data == "object") {
        callback(data)
      }
    } else if (typeof callback == "function") {
      callback();
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
  
  $.ajax({
    url:url,
    error:callbackAlias(callback),
    success:callbackAlias(callback)
  });
}

export const GetDetailsOfList = (model="",callback = null) => {
  if (model == "") {
    return;
  }
  const url = `${window.config.database}/details/${model}.json`;

  $.get(url,callbackAlias(callback));
}

export const GetByPath = (path="",callback=null) => {
  if (path == "") {
    return ;
  }

  const url = `${window.config.database}/${path}.json`;

  $.get(url,callbackAlias(callback));
}