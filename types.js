fetch('data/descriptions.json').then(r=>r.json()).then(d=>{
  const grid = document.getElementById('grid');
  grid.innerHTML = Object.entries(d).map(([code,txt])=>`
    <div class="mdl-cell mdl-cell--3-col">
      <div class="mdl-card mdl-shadow--2dp" style="padding:16px">
        <h5>${code}</h5>
        <p style="font-size:14px">${txt.split('：')[0]}</p>
        <a href="result.html?type=${code}">查看</a>
      </div>
    </div>`).join('');
});