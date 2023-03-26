import { useState, useEffect } from 'react'
import axios from "axios";

const useFetch = (endpoint, query) => {
  // Define state variables to manage data, loading, and errors.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define the options for the API request including the endpoint, headers, and query parameters.
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '5f817fd5d2msh114f5fa347e41bep1e51ffjsn2e95e23c205d',
      "X-RapidAPI-Host": 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  // Define a function to make the API request and handle errors.
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    }
    finally {
      setIsLoading(false);
    }
  }

  // Call the fetchData function when the component is first mounted to fetch data from the API endpoint.
  useEffect(() => {
    fetchData();
  }, []);

  // Define a function to refetch data from the API endpoint when necessary.
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  // Return the state variables and the refetch function.
  return { data, isLoading, error, refetch };
}

export default useFetch;
