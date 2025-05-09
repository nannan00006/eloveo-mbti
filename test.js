
document.addEventListener('DOMContentLoaded',()=>{
  const q = [{"id": 1, "dimension": "IE", "reverse": false, "text": "我独处时能迅速恢复能量"}, {"id": 2, "dimension": "IE", "reverse": false, "text": "我享受一个人做事情"}, {"id": 3, "dimension": "IE", "reverse": false, "text": "长时间社交会让我感到耗电"}, {"id": 4, "dimension": "IE", "reverse": false, "text": "我更喜欢少人私密聚会"}, {"id": 5, "dimension": "IE", "reverse": false, "text": "独处让我思考更清晰"}, {"id": 6, "dimension": "IE", "reverse": true, "text": "参加热闹社交让我精力满满"}, {"id": 7, "dimension": "IE", "reverse": true, "text": "我喜欢认识新朋友"}, {"id": 8, "dimension": "IE", "reverse": true, "text": "人多的聚会让我感到兴奋"}, {"id": 9, "dimension": "IE", "reverse": true, "text": "我讨厌长时间独处"}, {"id": 10, "dimension": "IE", "reverse": true, "text": "与人交谈能让我充电"}, {"id": 11, "dimension": "SM", "reverse": false, "text": "无人推进任务时我会主动接手"}, {"id": 12, "dimension": "SM", "reverse": false, "text": "我喜欢规划日程并推动执行"}, {"id": 13, "dimension": "SM", "reverse": false, "text": "群体沉默时我常第一个发言"}, {"id": 14, "dimension": "SM", "reverse": false, "text": "我偏好掌控节奏"}, {"id": 15, "dimension": "SM", "reverse": false, "text": "我愿做组织者"}, {"id": 16, "dimension": "SM", "reverse": true, "text": "我更愿意等待别人来主导"}, {"id": 17, "dimension": "SM", "reverse": true, "text": "我喜欢跟随别人的安排"}, {"id": 18, "dimension": "SM", "reverse": true, "text": "我避免站到台前发号施令"}, {"id": 19, "dimension": "SM", "reverse": true, "text": "我通常不主动提出计划"}, {"id": 20, "dimension": "SM", "reverse": true, "text": "我倾向顺其自然"}, {"id": 21, "dimension": "TG", "reverse": false, "text": "得到帮助后我会尽快回报"}, {"id": 22, "dimension": "TG", "reverse": false, "text": "我重视关系中的等价交换"}, {"id": 23, "dimension": "TG", "reverse": false, "text": "长期付出而无回报会让我不满"}, {"id": 24, "dimension": "TG", "reverse": false, "text": "我在意是否被重视"}, {"id": 25, "dimension": "TG", "reverse": false, "text": "我会留意别人对我的反馈"}, {"id": 26, "dimension": "TG", "reverse": true, "text": "我乐于付出而不计较回报"}, {"id": 27, "dimension": "TG", "reverse": true, "text": "我不做付出与收获的比较"}, {"id": 28, "dimension": "TG", "reverse": true, "text": "帮助别人令我满足不求回报"}, {"id": 29, "dimension": "TG", "reverse": true, "text": "我愿意付出即便得不到关注"}, {"id": 30, "dimension": "TG", "reverse": true, "text": "友谊无需严格对等"}, {"id": 31, "dimension": "CH", "reverse": false, "text": "出现分歧我倾向直接沟通"}, {"id": 32, "dimension": "CH", "reverse": false, "text": "我能接受差异并求同存异"}, {"id": 33, "dimension": "CH", "reverse": false, "text": "我喜欢和对方一起找解决办法"}, {"id": 34, "dimension": "CH", "reverse": false, "text": "我冲突后能快速翻篇"}, {"id": 35, "dimension": "CH", "reverse": false, "text": "我重视统一的目标"}, {"id": 36, "dimension": "CH", "reverse": true, "text": "分歧会让我反复纠结"}, {"id": 37, "dimension": "CH", "reverse": true, "text": "我常陷入自我拉扯难决断"}, {"id": 38, "dimension": "CH", "reverse": true, "text": "冲突后我会长时间回想"}, {"id": 39, "dimension": "CH", "reverse": true, "text": "差异让我感到不安"}, {"id": 40, "dimension": "CH", "reverse": true, "text": "我在矛盾中难以释怀"}];
  const form = document.getElementById('paper');
  form.innerHTML = q.map((it,i)=>`
    <div style="margin:16px 0">
      <p><strong>第 ${i+1} 题</strong> · ${it.text}</p>
      ${([1,2,3,4].map(v=>`
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" style="margin-right:12px">
          <input type="radio" class="mdl-radio__button" name="q${i}" value="${v}">
          <span class="mdl-radio__label">${['完全不符合','不太符合','比较符合','完全符合'][v-1]}
          </span>
        </label>`).join(''))}
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
