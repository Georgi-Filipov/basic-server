const addError = (obj, key, msg) => {
  if (obj[key]) {
    obj[key].push(msg);
  } else {
    obj[key] = [msg];
  }
}

module.exports = addError;