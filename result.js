fetch('data/descriptions.json').then(r=>r.json()).then(d=>{
  const params = new URLSearchParams(location.search);
  const type = params.get('type') || '';
  document.getElementById('typeCode').textContent = type;
  document.getElementById('typeDesc').textContent = d[type] || '暂无解释';
});