const TALENTS = [
  { id: 'minato', name: '蒼唯みなと' },
  { id: 'hotaru', name: '姫守ほたる' },
  { id: 'rinne',  name: '迷宮りんね' },
  { id: 'miro',   name: '堕天みろ'   },
  { id: 'ria',    name: '恋宵りあ'   },
  { id: 'hibiki', name: '霞翠ひびき' },
];

// サイドバーボタンとセクションを生成
const nav  = document.getElementById('nav');
const main = document.getElementById('main');

TALENTS.forEach(t => {
  const btn = document.createElement('button');
  btn.className = 'nav-btn';
  btn.dataset.section = t.id;
  btn.textContent = t.name;
  nav.appendChild(btn);

  const sec = document.createElement('section');
  sec.id = 'section-' + t.id;
  sec.className = 'section';
  sec.innerHTML = `
    <h2>${t.name}</h2>
    <div class="stream-table-wrap" id="streams-${t.id}">
      <p class="empty">読み込み中...</p>
    </div>
  `;
  main.appendChild(sec);
});

// セクション切り替え
document.getElementById('nav').addEventListener('click', e => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  const target = btn.dataset.section;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('section-' + target).classList.add('active');
});

// データ読み込み
Promise.all(
  TALENTS.map(t => fetch(`data/talents/${t.id}.json`).then(r => r.json()))
).then(results => {
  // Dashboardカード
  const cards = TALENTS.map((t, i) => {
    const count = results[i].streams.length;
    const latest = results[i].streams.at(-1);
    return `
      <div class="talent-card">
        <div class="talent-card-name">${t.name}</div>
        <div class="talent-card-stat">配信数: ${count}</div>
        <div class="talent-card-latest">${latest ? '最終: ' + latest.date + ' ' + latest.title : '配信データなし'}</div>
      </div>
    `;
  }).join('');
  document.getElementById('dashboard-cards').innerHTML = cards;

  // 各タレントの配信一覧
  TALENTS.forEach((t, i) => {
    const streams = results[i].streams;
    const wrap = document.getElementById('streams-' + t.id);
    if (!streams.length) {
      wrap.innerHTML = '<p class="empty">配信データがありません。</p>';
      return;
    }
    const rows = streams.slice().reverse().map(s => `
      <tr>
        <td class="col-date">${s.date}</td>
        <td class="col-title">${s.title}</td>
      </tr>
    `).join('');
    wrap.innerHTML = `
      <table class="stream-table">
        <thead><tr><th>日付</th><th>タイトル</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  });
});
