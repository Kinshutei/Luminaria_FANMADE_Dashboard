fetch('data/singing/singing.json')
  .then(r => r.json())
  .then(data => {
    const s = data.summary;
    document.getElementById('summary').innerHTML = `
      <div class="summary-item"><div class="label">歌枠回数</div><div class="value">${s.totalStreams}</div></div>
      <div class="summary-item"><div class="label">総歌唱数</div><div class="value">${s.totalSongs}</div></div>
      <div class="summary-item"><div class="label">ユニーク曲数</div><div class="value">${s.uniqueSongs}</div></div>
    `;
  });
