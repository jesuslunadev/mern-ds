import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';


/**
 * Calls the API using the specified endpoint and method, with optional payload and user authentication.
 * @async
 * @function callApi
 * @param {object} user - The user object containing authentication token (optional)
 * @param {string} endpoint - The API endpoint to call
 * @param {string} method - The HTTP method to use (optional, default is empty string)
 * @param {object} payload - The data to be sent in the request body (optional, default is empty object)
 * @returns {Promise<object>} A promise that resolves to the JSON response from the API
 * @throws {object} An error object with server message, client message, and status code if the API call fails
 */
export const callApi = async (user, endpoint, method = "", payload = {}) => {

  const headers = {'Content-Type': 'application/json'};
  if (user && user.token) {
    headers['Authorization'] = `Bearer ${user.token}`;
  }

  const options = {headers, method: method.toUpperCase()};

  if (method !== "get") {
    options.body = JSON.stringify(payload)
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`,
      options,
  );
  const responseJSON = await response.json();
  if (response.ok) {
    return responseJSON;
  } else {

    throw {
      serverMessage: responseJSON.message,
      message: `An error has occurred: ${response.statusText}`,
      status: response.status
    };
  }

};

/**
 * Fetches data from the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param method
 * @param payload
 * @returns {Object} - An object containing the fetched data, loading status, and error.
 */
const useApi = (endpoint, method = "get", payload = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user, logout} = useContext(AuthContext);


  useEffect(() => {
    const execute = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await callApi(
            user,
            endpoint,
            method,
            payload
        );
        setData(response);
      } catch (error) {
        if (error.status === 401) {
          logout()
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    execute()
  }, []);

  return {data, loading, error};
};

export default useApi;
