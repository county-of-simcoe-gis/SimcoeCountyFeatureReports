export function getJSON(url, callback) {
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      // CALLBACK WITH RESULT
      if (callback !== undefined) callback(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}
