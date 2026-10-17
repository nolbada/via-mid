document.head.insertAdjacentHTML('beforeend','<style>'+"\n:root{--bg:#f6f7fb;--c:#fff;--ink:#222;--sub:#667;--pri:#3b5bdb;--ok:#e8590c;--line:#e3e6ef}\n*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,\"Malgun Gothic\",sans-serif;line-height:1.55}\n.w{max-width:720px;margin:0 auto;padding:12px 12px 80px}\nh1{font-size:19px;margin:6px 0 2px}.sub{color:var(--sub);font-size:13px;margin-bottom:10px}\n.bar{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}\n.bar button,.chip{border:1px solid var(--line);background:var(--c);border-radius:20px;padding:7px 13px;font-size:14px;color:var(--ink)}\n.bar button.on{background:var(--pri);color:#fff;border-color:var(--pri)}\n.sel{width:100%;padding:10px;border-radius:10px;border:1px solid var(--line);font-size:15px;background:#fff;margin-bottom:6px}\n.it{background:var(--c);border:1px solid var(--line);border-radius:12px;margin:8px 0;overflow:hidden}\n.hd{display:flex;gap:10px;padding:12px;align-items:flex-start;cursor:pointer}\n.no{flex:none;min-width:30px;height:30px;border-radius:15px;background:#edf0ff;color:var(--pri);font-weight:700;text-align:center;line-height:30px;font-size:14px;padding:0 6px}\n.seen .no{background:var(--pri);color:#fff}\n.tx{flex:1;font-size:16px}.tx .ko{color:var(--sub);font-size:13px;margin-top:3px}\n.bl{display:inline-block;border-bottom:2px solid #999;min-width:42px;text-align:center;color:#888;font-size:14px;margin:0 2px}\n.st{flex:none;font-size:24px;background:none;border:0;color:#bbb;padding:0 4px}.st.on{color:#f59f00}\n.dt{display:none;border-top:1px dashed var(--line);padding:12px;background:#fbfcff}\n.open .dt{display:block}\n.ans b{color:var(--ok)}.ans{font-size:17px;margin-bottom:8px}\n.why{font-size:14px;margin:6px 0;color:#444}.why li{margin:2px 0}.why b{color:var(--ok)}\n.sec{font-size:12px;color:var(--sub);margin:10px 0 3px;font-weight:700}\ntable{border-collapse:collapse;width:100%;font-size:14px}td{border:1px solid var(--line);padding:5px 7px;vertical-align:top}td:first-child{width:50%;background:#fff}td:last-child{background:#fffaf0;color:#444}\n.stat{background:var(--c);border:1px solid var(--line);border-radius:12px;padding:12px;margin:8px 0;font-size:14px}\n.stat h3{margin:0 0 6px;font-size:15px}\n.hint{font-size:13px;color:var(--sub)}\nbody.exam{background:#2b2d42}body.exam h1,body.exam .sub{color:#fff}body.exam .sub{display:none}\n.exam .it{background:#fffbe6;border:2px solid #ffd43b}.exam .no{background:#ffd43b;color:#222}.exam .hd{cursor:default}.exam .tx{font-size:17px}.exam .tx .ko{color:#444;font-size:14px}\n.mode{display:flex;gap:8px;margin:8px 0}.mode button{flex:1;padding:11px;border-radius:12px;border:2px solid var(--line);background:#fff;font-size:15px;font-weight:700}.mode button.on{background:var(--pri);color:#fff;border-color:var(--pri)}.exam .mode button{border-color:#555}.exam .mode button.on{background:#ffd43b;color:#222;border-color:#ffd43b}\n.exbar{background:#ffd43b;color:#222;border-radius:10px;padding:10px 12px;font-size:14px;font-weight:700;margin:8px 0}\n.exfoot{position:sticky;bottom:0;background:#2b2d42;padding:10px 0;display:flex;gap:8px;align-items:center;justify-content:space-between;color:#fff;font-size:14px}\n.b2{border:0;border-radius:10px;background:#ffd43b;color:#222;font-weight:700;padding:11px 16px;font-size:15px}\n.xb{flex:none;border:2px solid #e03131;background:#fff;color:#e03131;border-radius:10px;padding:8px 12px;font-size:14px;font-weight:700}.xb.on{background:#e03131;color:#fff}\n.it.wrong{border:2px solid #e03131}.it.mk{background:#ffc078;border:3px solid #e8590c;color:#222}.wr{border:0;background:#ffe3e3;color:#e03131;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:700;margin-top:4px}\nbutton.lnk{background:none;border:0;color:var(--pri);font-size:13px;text-decoration:underline;padding:4px}\n"+'</style>');
document.body.innerHTML="<div class=\"w\">\n<h1></h1>\n<div class=\"sub\"></div>\n<div class=\"mode\" id=\"mode\"></div>\n<select id=\"ls\" class=\"sel\"></select>\n<div class=\"bar\" id=\"bar\"></div>\n<div id=\"list\"></div>\n<div id=\"stat\"></div>\n</div>";
(function(){var d=VERBDATA[VID];document.querySelector('h1').textContent=d.grade+' '+d.pub+' 동사형 연습';
document.querySelector('.sub').textContent=d.school+' · '+d.term+' · 번호를 눌러 아무 문장이나 연습하세요. 먼저 괄호를 머릿속으로(또는 소리 내어) 채운 뒤, 눌러서 정답을 확인!';document.title=d.grade+' '+d.pub+' 동사형 연습'})();

var SCH=VERBDATA[VID],LS=SCH.lessons;
var KEY=VID==='m2-donga-2mid'?'verb_study_v1':'verb_study_'+VID+'_v1',S;
function load(){try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}S=S||{};S.views=S.views||{};S.stars=S.stars||{};S.wrong=S.wrong||{};S.secs=S.secs||{};S.first=S.first||Date.now()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
load();
var cur=0,onlyStar=false,showStat=false,hideKo=false;
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
// 사용시간: 화면이 보이고 최근 60초 안에 터치가 있었던 시간만 집계
var lastAct=Date.now();
['touchstart','click','scroll','keydown'].forEach(function(e){addEventListener(e,function(){lastAct=Date.now()},{passive:true})});
setInterval(function(){if(document.hidden)return;if(Date.now()-lastAct>60000)return;var t=today();S.secs[t]=(S.secs[t]||0)+5;if(exam){S.esecs=S.esecs||{};S.esecs[t]=(S.esecs[t]||0)+5}save()},5000);
function fmt(s){var m=Math.round(s/60);return m<60?m+'분':Math.floor(m/60)+'시간 '+(m%60)+'분'}
var sel=document.getElementById('ls');
LS.forEach(function(L,i){var o=document.createElement('option');o.value=i;o.textContent=SCH.grade+' '+SCH.pub+' · '+L.name+' ('+L.items.length+'문장)';sel.appendChild(o)});
sel.onchange=function(){cur=+sel.value;EX={};done=false;render()};
var exam=false,done=false,EX={},onlyWrong=false,rpi=0,showAll=false;
function key(li,i){return LS[li].name+':'+(i+1)}
function blankHTML(it){return esc(it.en).replace(/___\[([^\]]*)\]/g,function(m,b){return '<span class="bl">'+esc(b)+'</span>'})}
function ansHTML(it){var k=0;return esc(it.en).replace(/___\[[^\]]*\]/g,function(){return '<b>'+esc(it.ans[k++])+'</b>'})}
function jjHTML(it){var h='<table>';(it.jj||[]).forEach(function(s){s.e.forEach(function(c,i){h+='<tr><td>'+esc(c)+'</td><td>'+esc(s.k[i]||'')+'</td></tr>'})});return h+'</table>'}
function render(){
  document.body.className=(exam&&!done)?'exam':'';
  var md=document.getElementById('mode');
  md.innerHTML='<button id="m1" class="'+(exam?'':'on')+'">📘 연습모드</button><button id="m2" class="'+(exam?'on':'')+'">📝 시험모드</button>';
  document.getElementById('m1').onclick=function(){exam=false;done=false;render()};
  document.getElementById('m2').onclick=function(){exam=true;done=false;EX={};showStat=false;render();scrollTo(0,0)};
  if(exam){if(done)renderResult();else renderExam();return}
  var bar=document.getElementById('bar');
  bar.innerHTML='<button id="bs" class="'+(onlyStar?'on':'')+'">☆ 별표만 보기</button><button id="bw" class="'+(onlyWrong?'on':'')+'">❌ 틀린 문장만</button><button id="bk" class="'+(hideKo?'on':'')+'">한글 숨기기</button><button id="bt" class="'+(showStat?'on':'')+'">📊 내 기록</button>';
  document.getElementById('bs').onclick=function(){onlyStar=!onlyStar;render()};
  document.getElementById('bw').onclick=function(){onlyWrong=!onlyWrong;render()};
  document.getElementById('bk').onclick=function(){hideKo=!hideKo;render()};
  document.getElementById('bt').onclick=function(){showStat=!showStat;render();if(showStat)scrollTo(0,document.body.scrollHeight)};
  var box=document.getElementById('list');box.innerHTML='';
  var idx=[+cur],n=0;
  idx.forEach(function(li){
    LS[li].items.forEach(function(it,i){
      var k=key(li,i);if(onlyStar&&!S.stars[k])return;if(onlyWrong&&!S.wrong[k])return;n++;
      var d=document.createElement('div');d.className='it'+(S.views[k]?' seen':'');
      d.innerHTML='<div class="hd"><div class="no">'+(i+1)+'</div><div class="tx">'+blankHTML(it)+(hideKo?'':'<div class="ko">'+esc(it.ko)+'</div>')+(S.wrong[k]?'<button class="wr">❌ 틀렸던 문장 (눌러서 해제)</button>':'')+'</div><button class="st'+(S.stars[k]?' on':'')+'">'+(S.stars[k]?'★':'☆')+'</button></div>'
       +'<div class="dt"><div class="sec">정답</div><div class="ans">'+ansHTML(it)+'</div><div class="sec">해석</div><div>'+esc(it.ko)+'</div>'
       +(it.why?'<div class="sec">왜 이 형태?</div><ul class="why">'+it.ans.map(function(a,j){return '<li><b>'+esc(a)+'</b> — '+esc(it.why[j]||'')+'</li>'}).join('')+'</ul>':'')
       +'<div class="sec">직독직해 (끊어 읽기)</div>'+jjHTML(it)+'</div>';
      d.querySelector('.hd').onclick=function(e){
        if(e.target.classList.contains('st'))return;
        if(e.target.classList.contains('wr')){delete S.wrong[k];save();if(onlyWrong)d.style.display='none';else e.target.remove();return}
        var o=d.classList.toggle('open');
        if(o){S.views[k]=(S.views[k]||0)+1;d.classList.add('seen');save()}
      };
      d.querySelector('.st').onclick=function(e){
        e.stopPropagation();if(S.stars[k])delete S.stars[k];else S.stars[k]=1;save();
        e.target.className='st'+(S.stars[k]?' on':'');e.target.textContent=S.stars[k]?'★':'☆';
        if(onlyStar&&!S.stars[k])d.style.display='none';
      };
      box.appendChild(d);
    });
  });
  [['wrong',onlyWrong,'❌ 이 단원 틀린 문장 모두 해제'],['stars',onlyStar,'☆ 이 단원 별표 모두 해제']].forEach(function(c){if(!n||!c[1])return;var cb=document.createElement('button');cb.textContent=c[2];cb.style.cssText='margin:8px 8px 8px 0;padding:8px 12px;border:1px solid #bbb;background:#fff;border-radius:10px;font-size:14px';cb.onclick=function(){if(!confirm('이 단원의 '+(c[0]=='wrong'?'틀린 문장 표시':'별표')+'를 모두 해제할까요?'))return;var pre=LS[cur].name+':';Object.keys(S[c[0]]).forEach(function(k){if(k.indexOf(pre)===0)delete S[c[0]][k]});save();render()};box.insertBefore(cb,box.firstChild)});
if(!n)box.innerHTML='<div class="stat hint">'+(onlyWrong?'기록된 틀린 문장이 없어요. 👏':onlyStar?'아직 ★ 별표한 문장이 없어요. 어려운 문장 오른쪽 ☆를 눌러 보세요.':'문장이 없습니다.')+'</div>';
  var st=document.getElementById('stat');st.innerHTML='';
  if(showStat){
    var tot=0,td=S.secs[today()]||0;for(var d2 in S.secs)tot+=S.secs[d2];
    var vc=Object.keys(S.views),stars=Object.keys(S.stars);
    var top=vc.sort(function(a,b){return S.views[b]-S.views[a]}).slice(0,5).map(function(k){return k+'번('+S.views[k]+'회)'}).join(', ');
    st.innerHTML='<div class="stat"><h3>📊 내 학습 기록 (이 폰에만 저장)</h3>오늘 사용: '+fmt(td)+' · 전체: '+fmt(tot)+'<br>시험모드 사용: '+fmt(Object.keys(S.esecs||{}).reduce(function(a,k){return a+S.esecs[k]},0))+'<br>살펴본 문장: '+vc.length+'개 · 별표: '+stars.length+'개 · 틀림: '+Object.keys(S.wrong||{}).length+'개'
     +'<br>자주 연 문장: '+(top||'-')+'<br>★ 문장: '+(stars.length?stars.join(', '):'-')
     +'<div class="hint" style="margin-top:6px">사용시간은 화면을 켜고 만지고 있는 시간만 셉니다. 카톡 앱 안에서 연 것과 크롬에서 연 것은 기록이 따로 저장돼요.</div>'
     +'<button class="lnk" id="rs">기록 지우기</button></div>';
    document.getElementById('rs').onclick=function(){if(confirm('기록을 모두 지울까요?')){S={};try{localStorage.removeItem(KEY)}catch(e){}load();render()}};
  }
}
function renderExam(){
  document.getElementById('bar').innerHTML='';document.getElementById('stat').innerHTML='';
  var box=document.getElementById('list');box.innerHTML='<div class="exbar">📝 시험모드 — '+LS[cur].name+' · 틀린 문장은 문장을 눌러 표시하세요. 시험을 끝내면 "❌ 틀린 문장만"에 모여요.</div>';
  LS[cur].items.forEach(function(it,i){
    var d=document.createElement('div');d.className='it';
    d.innerHTML='<div class="hd"><div class="no">'+(i+1)+'</div><div class="tx">'+blankHTML(it)+'</div></div>';d.className=EX[i]?'it mk':'it';
    d.onclick=function(){if(EX[i])delete EX[i];else EX[i]=1;d.className=EX[i]?'it mk':'it';cnt()};
    box.appendChild(d)});
  var f=document.createElement('div');f.className='exfoot';f.innerHTML='<span id="xc"></span><button class="b2" id="xe">시험 종료</button>';box.appendChild(f);
  function cnt(){document.getElementById('xc').textContent='표시한 문장 '+Object.keys(EX).length+'개'}cnt();
  document.getElementById('xe').onclick=function(){if(!confirm('시험을 끝낼까요? 표시한 문장은 "틀린 문장만"에 저장돼요.'))return;
    Object.keys(EX).forEach(function(i){S.wrong[key(+cur,+i)]=1});save();var n=Object.keys(EX).length;EX={};exam=false;done=false;onlyWrong=false;onlyStar=false;render();scrollTo(0,0);document.getElementById('list').insertAdjacentHTML('afterbegin','<div class="stat hint">'+(n?'✅ 시험 종료! 표시한 '+n+'문장은 위쪽 "❌ 틀린 문장만"에 모였어요.':'✅ 시험 종료! 모두 맞았어요 👏')+'</div>')};
}
function renderResult(){
  document.getElementById('bar').innerHTML='';document.getElementById('stat').innerHTML='';
  var ws=Object.keys(EX).map(Number).sort(function(a,b){return a-b});
  if(rpi>=ws.length)rpi=0;
  function whyH(it){return it.why?'<ul class="why">'+it.ans.map(function(a,j){return '<li><b>'+esc(a)+'</b> — '+esc(it.why[j]||'')+'</li>'}).join('')+'</ul>':''}
  var h='<div class="stat"><h3>📝 시험 결과 · '+esc(LS[cur].name)+'</h3>❌ 틀린 문장 '+ws.length+'개 (총 '+LS[cur].items.length+'문장)<br><b>틀린 번호:</b> '+(ws.length?ws.map(function(i){return (i+1)+'번'}).join(' '):'없음 👏')+'</div>'
   +'<div class="bar"><button id="rr">다시 시험 보기</button><button id="rp">❌ 틀린 문장만 연습하기</button><button id="ra">'+(showAll?'오답노트 보기':'전체 해설 보기')+'</button></div>';
  if(showAll){
    LS[cur].items.forEach(function(it,i){
      h+='<div class="it open'+(EX[i]?' wrong':'')+'"><div class="hd"><div class="no">'+(i+1)+'</div><div class="tx">'+ansHTML(it)+'<div class="ko">'+esc(it.ko)+'</div>'+(EX[i]?'<div class="wr">❌ 틀림</div>':'')+'</div></div><div class="dt">'
       +whyH(it)+'<div class="sec">직독직해 (끊어 읽기)</div>'+jjHTML(it)+'</div></div>'});
  }else if(ws.length){
    var k=ws[rpi],it=LS[cur].items[k];
    h+='<div class="bar" style="justify-content:space-between;align-items:center"><button id="pp"'+(rpi?'':' disabled')+'>◀ 이전</button><b>오답노트 '+(rpi+1)+' / '+ws.length+'</b><button id="pn"'+(rpi<ws.length-1?'':' disabled')+'>다음 ▶</button></div>'
     +'<div class="it open wrong"><div class="hd"><div class="no">'+(k+1)+'</div><div class="tx" style="font-size:19px">'+ansHTML(it)+'<div class="ko" style="font-size:15px">'+esc(it.ko)+'</div></div></div><div class="dt">'
     +whyH(it)+'<div class="sec">직독직해 (끊어 읽기)</div>'+jjHTML(it)+'</div></div>';
  }else{h+='<div class="stat">틀린 문장이 없어요. 👏</div>'}
  document.getElementById('list').innerHTML=h;
  document.getElementById('rr').onclick=function(){EX={};done=false;rpi=0;showAll=false;render();scrollTo(0,0)};
  document.getElementById('rp').onclick=function(){exam=false;done=false;onlyWrong=true;onlyStar=false;render();scrollTo(0,0)};
  document.getElementById('ra').onclick=function(){showAll=!showAll;render();scrollTo(0,0)};
  if(document.getElementById('pp')){document.getElementById('pp').onclick=function(){if(rpi>0){rpi--;render();scrollTo(0,0)}};document.getElementById('pn').onclick=function(){if(rpi<ws.length-1){rpi++;render();scrollTo(0,0)}}}
}
render();
