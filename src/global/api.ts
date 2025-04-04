import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://cms.klanlogistics.com:8443/api/wylon-apis/protected?passcode=wylon2025accessNPM",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

// Fetch data api request
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// post data api request
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response;
  } catch (error: any) {
    throw error.message;
  }
};

// update data api request
export const putData = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// delete data api request
export const deleteData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};
