async function callAPI() {
  const host = "127.0.0.1";
  const port = "8000";
  const api_key = "oOMqB3XA.dx1VbY6Y3YCP9zjHJDbo4uTEYQ123dxW";

  let headers = {
      "x-api-key": api_key,
      "Content-Type": "application/json",
  };

  try {
      const response = await fetch(
        `http://${host}:${port}/api/kpi/20240803`,
        {
          headers: headers,
          credentials: 'include'
        }
      );
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

callAPI();
