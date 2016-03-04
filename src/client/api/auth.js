
export const authenticateFromSession = () => {
  const config = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  };

  fetch('http://fruks.app/ajax/webtoken', config)
    .then(response => response.json())
    .then(key => authenticateWithToken(key))
    .then(response => response.json())
    .then(data => {
      if (data.err) {
        throw new Error(data.err);
      } else {
        return data;
      }
    })
    .then(user => {
      console.log(user);
    })
    .catch((err) => {
      console.error("authenticateFromSession error - ", err);
    });
}

function authenticateWithToken(token: string) {
  return fetch(`/api/token-auth/${token}`, {
    method: 'post'
  });
}
