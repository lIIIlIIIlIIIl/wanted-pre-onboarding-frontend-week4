import { extractSearch } from "../utils/extractSearch";
import HttpClient from "./HttpClient";

class SearchService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async getSearch(word: string) {
    const response = await this.httpClient.axiosInstance.get(`/sick?q=${word}`);

    if (response.status === 200)
      return { sickName: extractSearch(response.data, word) };
  }
}

export default SearchService;
