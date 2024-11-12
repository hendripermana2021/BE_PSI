export function responseJson(code, data, status, msg) {
  return res.status(code).json({
    code,
    status,
    msg,
    data,
  });
}

export function ifGetEmptyResponse(data, msg) {
  if (data.length === 0 || data === "") {
    return responseJson(404, data, false, msg);
  }
}

export function ifDataDuplicated(data, msg) {
  if (data.length > 0) {
    return responseJson(400, data, false, msg);
  }
}

export function errorResponse(code, data, status, msg) {
  return {
    code,
    status,
    msg,
    data,
  };
}
