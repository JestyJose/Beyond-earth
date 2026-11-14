const API_BASE = '/api/v1';

async function fetchJSON(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Destinations
  getDestinations: () => fetchJSON('/destinations'),
  getDestination: (slug) => fetchJSON(`/destinations/${slug}`),

  // Hardware
  getHardware: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    const queryString = query.toString();
    return fetchJSON(`/hardware${queryString ? `?${queryString}` : ''}`);
  },
  getHardwareBySlug: (slug) => fetchJSON(`/hardware/${slug}`),
  getFeaturedHardware: () => fetchJSON('/hardware/featured'),

  // Timeline
  getTimeline: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    const queryString = query.toString();
    return fetchJSON(`/timeline${queryString ? `?${queryString}` : ''}`);
  },

  // Science
  getConcepts: () => fetchJSON('/science/concepts'),
  getConceptBySlug: (slug) => fetchJSON(`/science/concepts/${slug}`),
  getDiscoveries: (domain) => fetchJSON(`/science/discoveries${domain ? `?domain=${domain}` : ''}`),

  // Status
  getStatusSummary: () => fetchJSON('/status/summary'),
  getStatusRadar: () => fetchJSON('/status/radar'),

  // Academy / Quizzes
  getQuizzes: (difficulty) => fetchJSON(`/academy/quizzes${difficulty ? `?difficulty=${difficulty}` : ''}`),
  getQuiz: (slug) => fetchJSON(`/academy/quizzes/${slug}`),
  getSimulations: () => fetchJSON('/academy/quizzes/simulations'),
  getSimulation: (slug) => fetchJSON(`/academy/quizzes/simulations/${slug}`),
  getDailyChallenge: () => fetchJSON('/academy/quizzes/daily')
};
