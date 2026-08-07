import { useState, useEffect } from "react";


function UseFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(
        "❌ Unable to fetch the data. Please check your Internet Connection.",
      );
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchData();
  },[url])


  return{
    data,
    loading,
    error,
  };
}
export default UseFetch;
