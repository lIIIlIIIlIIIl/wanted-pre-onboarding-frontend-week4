import axios from "axios";

class HttpClient {
  private BASE_URL = "http://localhost:4000";

  public axiosInstance = axios.create({
    baseURL: this.BASE_URL,
  });
}

export default HttpClient;
