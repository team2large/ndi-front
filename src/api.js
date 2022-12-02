const request = async (endpoint) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Promise((resolve, reject) => fetch(`https://api.team2large.fr${endpoint.resource}`, {
    method: endpoint.method,
    headers,
    body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
  }).then(async (response) => {
    const responseData = await response.json();
    if (response.status === 200)
      resolve(responseData);
    else {
      reject({
        type: 'API Error',
        message: responseData.message,
        status: response.status,
      });
    }
  }).catch((error) => {
    reject({
      type: 'API Wrapper Error',
      message: error.message,
    });
  }));
};

const get = function (resource) {
  return request({
    resource,
    method: 'GET',
  });
};

const post = function (resource, body) {
  return request({
    resource,
    method: 'POST',
    body,
  });
};

const put = function (resource, body) {
  return request({
    resource,
    method: 'PUT',
    body,
  });
};

const remove = function (resource) {
  return request({
    resource,
    method: 'DELETE',
  });
};

const api = {
  games: {
    list: () => get('/games'),
    scores: (gameId) => get(`/games/${gameId}/scores`),
    addScore: (gameId, username, score) => post(`/games/${gameId}/scores`, { username, score }),
  },
  admin: {
    login: (password) => post('/admin/login', { password }),
    listScores: () => get('/admin/scores'),
    deleteScore: (scoreId) => remove(`/admin/scores/${scoreId}`),
  },
};

export default api;
