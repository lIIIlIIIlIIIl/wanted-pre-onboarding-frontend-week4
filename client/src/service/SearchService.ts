// instance
// getSerach() => Promise<>

import HttpClient from "./HttpClient";

class SearchService extends HttpClient {
  async getSearch(word: string) {
    const response = await this.axiosInstance.get(`/sick?q=${word}`);
    console.log(response);
    if (response.status === 200) return response.data;
  }
}

export default SearchService;
