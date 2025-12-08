export function getJSON(url, callback) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, url: ${url}`);
      }
      return response.json();
    })
    .then((responseJson) => {
      // CALLBACK WITH RESULT
      if (callback !== undefined) callback(responseJson);
    })
    .catch((error) => {
      console.error("Fetch error for URL:", url, error);
    });
}
