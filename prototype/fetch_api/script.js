const digit = 2;

// APIからデータを取得する関数
async function callApi() {
  const host = "127.0.0.1";
  const port = "8000";
  const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA"; //会社PC
  //const api_key = "TG0XWvKy.DWmhVpgmCxZNAR7cFH8gkma5hz2nR1kQ"; // 自宅PC
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
  /*-----------------------
  各種関数:
  - formatPercentage: floatデータを％にフォーマット
  - calcBuffer: Buffer計算
  - wfc: 滞留案件のstrをオブジェクトに変換
  -----------------------*/
  // floatデータを％にフォーマットする関数
  function formatPercentage (value) {
    return Math.round(value * 100 * Math.pow(10, digit)) / 100;
  };

  // Buffer計算関数
  function calcBuffer (r, n, c) {
    /* KPIを達成するためのBufferを計算
    args:
      r: KPIの目標値
      n: 現在の達成件数
      c: 分母
    */
    // KPIを達成できている場合は単純計算、できていない場合は少し複雑
    if (c === 0) {
      return "-";
    } else if (n / c >= r) {
      let b = (n / r) - c;
      return Math.floor(b);
    } else {
      let b = (n - c * r) / (1 - r);
      return Math.floor(b);
    };
  };

  // 滞留案件のstrをオブジェクトに変換する関数
  function wfc(wfc_20, wfc_30, wfc_40, wfc_60) {
    wfc_20 = wfc_20 ? new Set(wfc_20.split(',')) : new Set();
    wfc_30 = wfc_30 ? new Set(wfc_30.split(',')) : new Set();
    wfc_40 = wfc_40 ? new Set(wfc_40.split(',')) : new Set();
    wfc_60 = wfc_60 ? new Set(wfc_60.split(',')) : new Set();

    wfc_20 = new Set([...wfc_20].filter(x => !wfc_30.has(x)));
    wfc_30 = new Set([...wfc_30].filter(x => !wfc_40.has(x)));
    wfc_40 = new Set([...wfc_40].filter(x => !wfc_60.has(x)));

    const context = {
      '60分': wfc_60,
      '40分': wfc_40,
      '30分': wfc_30,
      '20分': wfc_20
    };

    return context;
  };

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
  
  /*-----------------------
           応答率 
  -----------------------*/
  const responseRate = document.getElementById("response-rate");
  const responses = document.getElementById("responses");
  const totalCallsResponse = document.getElementById("total-calls-response");
  responseRate.textContent = formatPercentage(data.response_rate);
  responses.textContent = data.responses;
  totalCallsResponse.textContent = data.total_calls;
  /*-----------------------
          直受け率
  -----------------------*/
  const directHandlingRate = document.getElementById("direct-handling-rate");
  const directHandring = document.getElementById("direct-handling");
  const phoneInquiriesDirectRate = document.getElementById("phone-inquiries-direct-rate");
  const BufferDirectHandlingRate = document.getElementById("buffer-direct-handling-rate");
  directHandlingRate.textContent = formatPercentage(data.direct_handling_rate);
  directHandring.textContent = data.direct_handling;
  phoneInquiriesDirectRate.textContent = data.phone_inquiries;
  BufferDirectHandlingRate.textContent = calcBuffer(0.35, data.direct_handling, data.phone_inquiries);
  
  /*-----------------------
      20分以内折返し率
  -----------------------*/
  const cumulativeCallbackRateUnder20Min = document.getElementById("cumulative-callback-rate-under-20-min");
  const cumulativeCallbackUnder20Min = document.getElementById("cumulative-callback-under-20-min");
  const cumulativeCallbackUnder60MinPlusWfc20 = document.getElementById("cumulative-callback-under-60-min-plus-wfc20");
  const WaitingForCallbackOver20Min = document.getElementById("waiting-for-callback-over-20min");
  const BufferCumulativeCallbackUnder20MinRate = document.getElementById("buffer-cumulative-callback-under-20-rate");
  cumulativeCallbackRateUnder20Min.textContent = formatPercentage(data.cumulative_callback_rate_under_20_min);
  cumulativeCallbackUnder20Min.textContent = data.cumulative_callback_under_20_min;
  let cumulativeAndWfcOver20min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_20min;
  cumulativeCallbackUnder60MinPlusWfc20.textContent = cumulativeAndWfcOver20min;
  WaitingForCallbackOver20Min.textContent = data.waiting_for_callback_over_20min;
  BufferCumulativeCallbackUnder20MinRate.textContent = calcBuffer(
    0.80,
    data.cumulative_callback_under_20_min,
    cumulativeAndWfcOver20min
  );

  /*-----------------------
      30分以内折返し率
  -----------------------*/
  const cumulativeCallbackRateUnder30Min = document.getElementById("cumulative-callback-rate-under-30-min");
  const cumulativeCallbackUnder30Min = document.getElementById("cumulative-callback-under-30-min");
  const cumulativeCallbackUnder60MinPlusWfc30 = document.getElementById("cumulative-callback-under-60-min-plus-wfc30");
  const WaitingForCallbackOver30Min = document.getElementById("waiting-for-callback-over-30min");
  cumulativeCallbackRateUnder30Min.textContent = formatPercentage(data.cumulative_callback_rate_under_30_min);
  cumulativeCallbackUnder30Min.textContent = data.cumulative_callback_under_30_min;
  let cumulativeAndWfcOver30min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_30min;
  cumulativeCallbackUnder60MinPlusWfc30.textContent = cumulativeAndWfcOver30min;
  WaitingForCallbackOver30Min.textContent = data.waiting_for_callback_over_30min;

  /*-----------------------
      40分以内折返し率
  -----------------------*/
  const cumulativeCallbackRateUnder40Min = document.getElementById("cumulative-callback-rate-under-40-min");
  const cumulativeCallbackUnder40Min = document.getElementById("cumulative-callback-under-40-min");
  const cumulativeCallbackUnder60MinPlusWfc40 = document.getElementById("cumulative-callback-under-60-min-plus-wfc40");
  const WaitingForCallbackOver40Min = document.getElementById("waiting-for-callback-over-40min");
  const BufferCumulativeCallbackUnder40MinRate = document.getElementById("buffer-cumulative-callback-under-40-rate");
  cumulativeCallbackRateUnder40Min.textContent = formatPercentage(data.cumulative_callback_rate_under_40_min);
  cumulativeCallbackUnder40Min.textContent = data.cumulative_callback_under_40_min;
  let cumulativeAndWfcOver40min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_40min;
  cumulativeCallbackUnder60MinPlusWfc40.textContent = cumulativeAndWfcOver40min;
  WaitingForCallbackOver40Min.textContent = data.waiting_for_callback_over_40min;
  BufferCumulativeCallbackUnder40MinRate.textContent = calcBuffer(
    0.90,
    data.cumulative_callback_under_40_min,
    cumulativeAndWfcOver40min
  );

  /*-----------------------
      総着信数
      放棄呼数
      留守電数
      電話問い合わせ件数
  -----------------------*/
  // 総着信数
  const totalCalls = document.getElementById("total-calls");
  totalCalls.textContent = data.total_calls;

  // 放棄呼数
  const abandonedCalls = document.getElementById("abandoned-calls");
  abandonedCalls.textContent = data.abandoned_calls;

  // 留守電数
  const voicemails = document.getElementById("voicemails");
  voicemails.textContent = data.voicemails;
  
  // 電話問い合わせ件数
  const phoneInquiries = document.getElementById("phone-inquiries");
  phoneInquiries.textContent = data.phone_inquiries;

  /*-----------------------
      電話問い合わせ件数
  -----------------------*/
  // 関数を呼び出し
  const result = wfc(data.wfc_20min_list, data.wfc_30min_list, data.wfc_40min_list, data.wfc_60min_list);
  // テーブル要素を取得
  const table = document.getElementById('wfcTable');
  // ヘッダー行以外をクリア
  while (table.rows.length > 1) {
    table.deleteRow(1);  // 常に1番目の行を削除していく
  }
  // 各時間帯ごとにループ
  for (const [time, set] of Object.entries(result)) {
    for (const value of set) {
        // 新しい行とセルを作成
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        // セルにデータを設定
        cell1.textContent = value;
        cell2.textContent = time;

        // 行にセルを追加
        row.appendChild(cell1);
        row.appendChild(cell2);

        // テーブルに行を追加
        table.appendChild(row);
    }
  }
}

async function init() {
  const data = await callApi();
  console.log(data);
  if (data) {
    renderDataToHTML(data);
  };
};

init();
setInterval(init, 10000);