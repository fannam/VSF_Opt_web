/**
 * API Service for VSF Optimization Backend
 * Handles all HTTP requests to the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Production Plans
  async getProductionPlans() {
    return this.request('/api/production-plans');
  }

  async getProductionPlan(id) {
    return this.request(`/api/production-plans/${id}`);
  }

  async createProductionPlan(data) {
    return this.request('/api/production-plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProductionPlan(id, data) {
    return this.request(`/api/production-plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProductionPlan(id) {
    return this.request(`/api/production-plans/${id}`, {
      method: 'DELETE',
    });
  }

  // Configurations
  async getConfigurations() {
    return this.request('/api/configurations');
  }

  async getConfiguration(id) {
    return this.request(`/api/configurations/${id}`);
  }

  async createConfiguration(data) {
    return this.request('/api/configurations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateConfiguration(id, data) {
    return this.request(`/api/configurations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteConfiguration(id) {
    return this.request(`/api/configurations/${id}`, {
      method: 'DELETE',
    });
  }

  // Optimization Jobs
  async getOptimizationJobs(status = null) {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.request(`/api/optimization-jobs${query}`);
  }

  async getOptimizationJob(jobId) {
    return this.request(`/api/optimization-jobs/${jobId}`);
  }

  async createOptimizationJob(data) {
    return this.request('/api/optimization-jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOptimizationJob(jobId, data) {
    return this.request(`/api/optimization-jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async startOptimizationJob(jobId) {
    return this.request(`/api/optimization-jobs/${jobId}/start`, {
      method: 'POST',
    });
  }

  async stopOptimizationJob(jobId) {
    return this.request(`/api/optimization-jobs/${jobId}/stop`, {
      method: 'POST',
    });
  }

  async completeOptimizationJob(jobId, resultsData) {
    return this.request(`/api/optimization-jobs/${jobId}/complete`, {
      method: 'POST',
      body: JSON.stringify(resultsData),
    });
  }

  async deleteOptimizationJob(jobId) {
    return this.request(`/api/optimization-jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService(API_BASE_URL);
export default apiService;
