fetch('data/questions_40.json').then(r=>r.json()).then(q=>{
  const form = document.getElementById('paper');
  form.innerHTML = q.map((it,i)=>`
    <div style="margin:16px 0">
      <p><strong>第 ${i+1} 题</strong> · ${it.text}</p>
      ${[1,2,3,4].map(v=>`
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" style="margin-right:12px">
          <input type="radio" class="mdl-radio__button" name="q${i}" value="${v}">
          <span class="mdl-radio__label">${['完全不符合','不太符合','比较符合','完全符合'][v-1]}</span>
        </label>`).join('')}
    </div>`).join('');
  form.addEventListener('change',()=>{
    document.getElementById('submitBtn').disabled = document.querySelectorAll('[name^=q]:checked').length !== q.length;
  });
  document.getElementById('submitBtn').onclick = ()=>{
    const score = {I:0,E:0,S:0,M:0,T:0,G:0,C:0,H:0};
    q.forEach((it,i)=>{
      const v = +document.querySelector(`[name=q${i}]:checked`).value;
      const [l,r] = it.dimension.split('');
      const delta = (v - 2.5) * (it.reverse ? -1 : 1);
      const add = delta * 4/3;
      if(delta > 0) score[l] += add; else score[r] += Math.abs(add);
    });
    const code = (score.I>score.E?'I':'E') + (score.S>score.M?'S':'M') +
                 (score.T>score.G?'T':'G') + (score.C>score.H?'C':'H');
    location.href = `result.html?type=${code}`;
  };
});