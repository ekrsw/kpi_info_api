const digit = 2;

// APIからデータを取得する関数
async function callApi() {
  const host = "127.0.0.1";
  const port = "8000";
  const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA";
  const headers = {
    'x-api-key': api_key
  };
  try {
    const response = await fetch(`http://${host}:${port}/api/kpi/`, {headers: headers});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error: ', error);
  };
};

// HTML描画関数
function renderDataToHTML (data) {
  // floatデータを％にフォーマットする関数
  function formatPercentage (value) {
    return Math.round(value * 100 * Math.pow(10, digit)) / 100;
  }

  // created_atのフォーマット
  const dateString = data.created_at;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  // 最終取得日時
  const created_at = document.getElementById("created-at");
  created_at.textContent = formattedDate + " 現在";
  
  // 応答率
  const responseRate = document.getElementById("response-rate");
  const responses = document.getElementById("responses");
  const totalCallsResponse = document.getElementById("total-calls-response");
  responseRate.textContent = formatPercentage(data.response_rate);
  responses.textContent = data.responses;
  totalCallsResponse.textContent = data.total_calls;

  // 直受け率
  
  // 20分以内折返し率

  // 30分以内折返し率

  // 40分以内折返し率

  // 総着信数
  totalCalls.textContent = data.total_calls;

  // 放棄呼数

  // 留守電数

  // 電話問い合わせ件数

  // 滞留案件
}

async function init() {
  const data = await callApi();
  console.log(data);
  if (data) {
    renderDataToHTML(data);
  }
}

init();