fetch('data/games/games.json')
  .then(r => r.json())
  .then(data => {
    const s = data.summary;
    document.getElementById('summary').innerHTML = `
      <div class="summary-item"><div class="label">総配信数</div><div class="value">${s.totalStreams}</div></div>
      <div class="summary-item"><div class="label">総時間（h）</div><div class="value">${s.totalHours}</div></div>
      <div class="summary-item"><div class="label">タイトル数</div><div class="value">${s.uniqueGames}</div></div>
    `;
  });
