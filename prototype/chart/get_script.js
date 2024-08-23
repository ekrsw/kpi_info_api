async function callApi() {
    // リソースを取得
    const host = "cti-12880310"
    const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA"
    const headers = {
        headers: {
            'x-api-key': api_key
        }
    }

    try {
        const response = await fetch(`http://${host}/api/kpi/20240823`, headers);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
    }
}

let json_data = callApi();
console.log(json_data);
