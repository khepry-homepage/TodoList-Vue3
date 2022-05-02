const requestSuccess = response => {
  return response.data;
}

const requestError= error => {
  console.log(error);
}

export default {
  SUCCESS: requestSuccess,
  ERROR: requestError,
}