```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to handle API requests.
 * @param {string} url - The API endpoint.
 * @param {object} options - The options for the request (method, headers, body, etc.).
 * @returns {object} - The response data, loading state, and error state.
 */
const useAPI = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios(url, options);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useAPI;
```
