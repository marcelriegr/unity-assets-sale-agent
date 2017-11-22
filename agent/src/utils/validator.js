module.exports = {
  isNotAnEmptyString(string) {
    return typeof string === 'string' && string !== '';
  },
  allElementsExist(request, array) {
    if (array) {
      for (let i = array.length - 1; i >= 0; i--) {
        if (typeof request[array[i]] === 'undefined') return false;
      }
      return true;
    }
    for (let i = request.length - 1; i >= 0; i--) {
      if (typeof request[i] === 'undefined') return false;
    }
    return true;
  },
  allElementsExistAndNotNull(request, array) {
    if (array) {
      for (let i = array.length - 1; i >= 0; i--) {
        if (typeof request[array[i]] === 'undefined' || request[array[i]] === null) return false;
      }
      return true;
    }
    for (let i = request.length - 1; i >= 0; i--) {
      if (typeof request[i] === 'undefined' || request[i] === null) return false;
    }
    return true;
  },
  validateEmail(email) {
    /* eslint-disable no-useless-escape */
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* eslint-enable no-useless-escape */
    return re.test(email);
  }
};
