import { extractSearch } from "../utils/extractSearch";
import HttpClient from "./HttpClient";

class SearchService extends HttpClient {
  async getSearch(word: string) {
    const response = await this.axiosInstance.get(`/sick?q=${word}`);

    if (response.status === 200)
      return { sickName: extractSearch(response.data, word) };
  }
}

export default SearchService;
