const api = {
  baseURL: 'http://localhost:8080/api/v1',

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      credentials: 'include', // обязательно для cookie
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    // Иногда может быть пустой ответ у DELETE и др.
    if (response.status === 204) return null;

    return response.json();
  },

  // Auth
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Users
  async getUserById(userId) {
    return this.request(`/users/${userId}`);
  },

  async updateUser(userId, data) {
    return this.request(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Games
  async getGames(page = 1, limit = 12) {
    return this.request(`/games/paginated?page=${page}&limit=${limit}`);
  },

  async getGame(gameId) {
    return this.request(`/games/${gameId}`);
  },

  // Cart
  async getCart(userId) {
    return this.request(`/cart/${userId}`);
  },

  async addToCart(userId, gameId) {
    return this.request(`/cart/${userId}/add/${gameId}`, { method: 'POST' });
  },

  async removeFromCart(userId, gameId) {
    return this.request(`/cart/${userId}/remove/${gameId}`, { method: 'DELETE' });
  },

  async clearCart(userId) {
    return this.request(`/cart/${userId}/clear`, { method: 'DELETE' });
  },

  // Favorites
  async getFavorites(userId) {
    return this.request(`/favorite/${userId}`);
  },

  async addToFavorites(userId, gameId) {
    return this.request(`/favorite/${userId}/add/${gameId}`, { method: 'POST' });
  },

  async removeFromFavorites(userId, gameId) {
    return this.request(`/favorite/${userId}/remove/${gameId}`, { method: 'DELETE' });
  },

  async clearFavorites(userId) {
    return this.request(`/favorite/${userId}/clear`, { method: 'DELETE' });
  },

  // Library
  async getLibrary(userId) {
    return this.request(`/library/${userId}`);
  },

  // Reviews
  async getGameReviews(gameId) {
    return this.request(`/reviews/game/${gameId}`);
  },

  async createReview(reviewData) { // пофиксить на беке
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

export default api;
