// 現在の時刻を表示する関数
function displayCurrentTime() {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString('ja-JP');
}

// 指定した分数前の時刻を計算する関数
function calculateTimeAgo(minutes) {
    const currentTime = new Date();
    const timeAgo = new Date(currentTime.getTime() - minutes * 60000);
    return timeAgo.toLocaleTimeString('ja-JP');
}

// 時刻を表示する要素を更新する関数
function updateDisplayElements() {
    document.getElementById('current-time').textContent = displayCurrentTime();
    document.getElementById('twenty-minutes-ago').textContent = calculateTimeAgo(20);
    document.getElementById('forty-minutes-ago').textContent = calculateTimeAgo(40);
}

// 1秒ごとに時刻を更新するタイマーをセット
setInterval(updateDisplayElements, 1000);

// ページ読み込み時にも時刻を初期表示
updateDisplayElements();
