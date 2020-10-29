import http from "./httpService";

const url = "/api/submitPhoto/";

function getSubmissions() {
  return http.get(url);
}

function submitPhoto(obj) {
  return http.post(url, obj);
}

export { getSubmissions, submitPhoto }