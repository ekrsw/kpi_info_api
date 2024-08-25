async function callApi() {
    // リソースを取得
    const host = "cti-12880310"
    const port = "8000"
    const api_key = "0MakB4JS.oxUR39iNSCdlZG8qtnDn6NlmkmBQ55lA";
    const digit = 2
    const headers = {
        'x-api-key': api_key
    };
    try {
        const response = await fetch(`http://${host}:${port}/api/kpi`, {headers: headers});
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error: ', error);
    };

    // リソースを表示
    const created_at = document.getElementById("created-at");
    /*
    const totalCalls = document.getElementById("total-calls");
    const ivrInterruptions = document.getElementById("ivr-interruptions");
    const abandonedDuringOperator = document.getElementById("abandoned-during-operator");
    const abandonedInIvr = document.getElementById("abandoned-in-ivr");
    const abandonedCalls = document.getElementById("abandoned-calls");
    const voicemails = document.getElementById("voicemails");
    const responses = document.getElementById("responses");
    const responseRate = document.getElementById("response-rate");
    const phoneInquiries = document.getElementById("phone-inquiries");
    const directHandring = document.getElementById("direct-handling");
    const directHandlingRate = document.getElementById("direct-handling-rate");
    const callbackCount0To20Min = document.getElementById("callback-count-0-to-20-min");
    const cumulativeCallbackUnder20Min = document.getElementById("cumulative-callback-under-20-min");
    const cumulativeCallbackRateUnder20Min = document.getElementById("cumulative-callback-rate-under-20-min");
    const callbackCount20To30Min = document.getElementById("callback-count-20-to-30-min");
    const cumulativeCallbackUnder30Min = document.getElementById("cumulative-callback-under-30-min");
    const cumulativeCallbackRateUnder30Min = document.getElementById("cumulative-callback-rate-under-30-min");
    const callbackCount30To40Min = document.getElementById("callback-count-30-to-40-min");
    const cumulativeCallbackUnder40Min = document.getElementById("cumulative-callback-under-40-min");
    const cumulativeCallbackRateUnder40Min = document.getElementById("cumulative-callback-rate-under-40-min");
    const callbackCount40To60Min = document.getElementById("callback-count-40-to-60-min");
    const cumulativeCallbackUnder60Min = document.getElementById("cumulative-callback-under-60-min");
    const cumulativeCallbackRateUnder60Min = document.getElementById("cumulative-callback-rate-under-60-min");
    const callbackCountOver60Min = document.getElementById("callback-count-over-60-min");
    */

    const dateString = data.created_at;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    
    created_at.textContent = formattedDate + "現在";

    /*
    totalCalls.textContent = JSON.stringify(data.total_calls);
    ivrInterruptions.textContent = JSON.stringify(data.ivr_interruptions);
    abandonedDuringOperator.textContent = JSON.stringify(data.abandoned_during_operator);
    abandonedInIvr.textContent = JSON.stringify(data.abandoned_in_ivr);
    abandonedCalls.textContent = JSON.stringify(data.abandoned_calls);
    voicemails.textContent = JSON.stringify(data.voicemails);
    responses.textContent = JSON.stringify(data.responses);
    responseRate.textContent = Math.round(data.response_rate * 100 * Math.pow(10, digit)) / 100;
    phoneInquiries.textContent = JSON.stringify(data.phone_inquiries);
    directHandring.textContent = JSON.stringify(data.direct_handling);
    directHandlingRate.textContent = Math.round(data.direct_handling_rate * 100 * Math.pow(10, digit)) / 100;
    callbackCount0To20Min.textContent = JSON.stringify(data.callback_count_0_to_20_min);
    cumulativeCallbackUnder20Min.textContent = JSON.stringify(data.cumulative_callback_under_20_min);
    cumulativeCallbackRateUnder20Min.textContent = Math.round(data.cumulative_callback_rate_under_20_min * 100 * Math.pow(10, digit)) / 100;
    callbackCount20To30Min.textContent = JSON.stringify(data.callback_count_20_to_30_min);
    cumulativeCallbackUnder30Min.textContent = JSON.stringify(data.cumulative_callback_under_30_min);
    cumulativeCallbackRateUnder30Min.textContent = Math.round(data.cumulative_callback_rate_under_30_min * 100 * Math.pow(10, digit)) / 100;
    callbackCount30To40Min.textContent = JSON.stringify(data.callback_count_30_to_40_min);
    cumulativeCallbackUnder40Min.textContent = JSON.stringify(data.cumulative_callback_under_40_min);
    cumulativeCallbackRateUnder40Min.textContent = Math.round(data.cumulative_callback_rate_under_40_min * 100 * Math.pow(10, digit)) / 100;
    callbackCount40To60Min.textContent = JSON.stringify(data.callback_count_40_to_60_min);
    cumulativeCallbackUnder60Min.textContent = JSON.stringify(data.cumulative_callback_under_60_min);
    cumulativeCallbackRateUnder60Min.textContent = Math.round(data.cumulative_callback_rate_under_60_min * 100 * Math.pow(10, digit)) / 100;
    callbackCountOver60Min.textContent = JSON.stringify(data.callback_count_over_60_min);
    */
}
callApi();
setInterval(callApi, 60000)