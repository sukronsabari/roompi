const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  // eslint-disable-next-line no-underscore-dangle
  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const {
      status,
      message,
      data: { users },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return users;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const {
      status,
      message,
      data: { user },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return user;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { thread },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const {
      status,
      message,
      data: { threads },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return threads;
  }

  async function getDetailThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    const {
      status,
      message,
      data: { detailThread },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return detailThread;
  }

  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { comment },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return comment;
  }

  async function neutralizeVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function upVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function downVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function neutralizeVoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();
    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const {
      status,
      message,
      data: { leaderboards },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return leaderboards;
  }

  return {
    getAccessToken,
    putAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getDetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    upVoteComment,
    downVoteComment,
    neutralizeVoteThread,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;
