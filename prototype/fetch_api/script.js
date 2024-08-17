async function callAPI() {
  const host = "127.0.0.1";
  const port = "8000";
  const api_key = "hAUw8qqH.Wf6QhMyHLyzpce8AaKUmphaL2oTlVvbs";

  let headers = {
      "x-api-key": api_key,
      "Content-Type": "application/json",
  };

  try {
      const response = await fetch(
        `http://${host}:${port}/api/kpi/20240817`,
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
