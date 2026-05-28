// セクション切り替え
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;
    navBtns.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('section-' + target).classList.add('active');
  });
});

// データ読み込み
Promise.all([
  fetch('data/games/games.json').then(r => r.json()),
  fetch('data/singing/singing.json').then(r => r.json()),
]).then(([games, singing]) => {
  const g = games.summary;
  const s = singing.summary;

  // TOPカード
  document.getElementById('top-games-stats').innerHTML =
    `総配信数: ${g.totalStreams}<br>総時間: ${g.totalHours}h<br>タイトル数: ${g.uniqueGames}`;
  document.getElementById('top-singing-stats').innerHTML =
    `歌枠回数: ${s.totalStreams}<br>総歌唱数: ${s.totalSongs}<br>ユニーク曲数: ${s.uniqueSongs}`;

  // ゲームサマリー
  document.getElementById('games-summary').innerHTML = `
    <div class="summary-item"><div class="label">総配信数</div><div class="value">${g.totalStreams}</div></div>
    <div class="summary-item"><div class="label">総時間（h）</div><div class="value">${g.totalHours}</div></div>
    <div class="summary-item"><div class="label">タイトル数</div><div class="value">${g.uniqueGames}</div></div>
  `;

  // 歌枠サマリー
  document.getElementById('singing-summary').innerHTML = `
    <div class="summary-item"><div class="label">歌枠回数</div><div class="value">${s.totalStreams}</div></div>
    <div class="summary-item"><div class="label">総歌唱数</div><div class="value">${s.totalSongs}</div></div>
    <div class="summary-item"><div class="label">ユニーク曲数</div><div class="value">${s.uniqueSongs}</div></div>
  `;
});
