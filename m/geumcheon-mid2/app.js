(function(){
'use strict';
var CFG=window.CFG,D=window.D,Q=D.Q,PFX=CFG.pfx,TY=CFG.types,TN={};
TY.forEach(function(t){TN[t.k]=t.n});
var LAB=['①','②','③','④','⑤','⑥','⑦'];
var mem={};
var SH=false;try{var _u=new URLSearchParams(location.search);if(_u.get('shared')==='1')sessionStorage.setItem('mid7:shared','1');if(_u.get('shared')==='0')sessionStorage.removeItem('mid7:shared');SH=sessionStorage.getItem('mid7:shared')==='1'}catch(e){}
var ST=null;try{ST=SH?sessionStorage:localStorage}catch(e){}
function sg(k){var v=null;try{v=ST.getItem(PFX+k)}catch(e){}if(v==null&&mem[k]!=null)v=mem[k];return v}
function ss(k,v){mem[k]=v;try{ST.setItem(PFX+k,v)}catch(e){}}
function jg(k,d){try{var v=sg(k);return v==null?d:JSON.parse(v)}catch(e){return d}}
function js(k,v){ss(k,JSON.stringify(v))}
function $(s,e){return(e||document).querySelector(s)}
function el(tag,cls,h){var e=document.createElement(tag);if(cls)e.className=cls;if(h!=null)e.innerHTML=h;return e}
function qs(){var o={},s=location.search.replace(/^\?/,'');s.split('&').forEach(function(p){if(!p)return;var a=p.split('=');o[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||'')});return o}
function strip(s){return String(s).replace(/<[^>]+>/g,'')}
function nl(s){return s}

/* index of ids */
var IDX={};
Object.keys(D.R).forEach(function(r){TY.forEach(function(t){(D.R[r][t.k]||[]).forEach(function(id,i){IDX[id]={r:+r,t:t.k,n:i+1}})})});
D.VX.forEach(function(v){v.ids.forEach(function(id,i){IDX[id]={x:v.s,t:'X',n:i+1}})});
function ansHref(id){var o=IDX[id];if(!o)return'#';return o.x!=null?'answer.html?x='+o.x+'#q'+o.n:'answer.html?r='+o.r+'&t='+o.t+'#q'+o.n}
function testHref(id){var o=IDX[id];if(!o)return'#';return o.x!=null?'vocabx.html?s='+o.x+'#q'+o.n:'test.html?r='+o.r+'&t='+o.t+'#q'+o.n}

/* state */
function doneT(r,t){return sg('done:'+r+':'+t)==='1'}
function doneR(r){return TY.every(function(t){return !((D.R[r]||{})[t.k]||[]).length||doneT(r,t.k)})}
function pad(n){return(n<10?'0':'')+n}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function pYmd(s){var a=s.split('-');return new Date(+a[0],+a[1]-1,+a[2])}
function logGet(){var a=jg('log',[]);return Array.isArray(a)?a:[]}
function markDone(r,t){var now=new Date();ss('done:'+r+':'+t,'1');ss('doneAt:'+r+':'+t,now.toISOString());
 if(doneR(r)&&sg('roundAt:'+r)==null){ss('roundAt:'+r,now.toISOString());var l=logGet();if(!l.some(function(e){return e.r===r})){l.push({r:r,d:ymd(now)});js('log',l)}}}
/* completion records (round, local date): log first, roundAt as fallback for rounds finished before the log existed */
function records(){var out=[],seen={};logGet().forEach(function(e){if(e&&e.r&&e.d&&!seen[e.r]){seen[e.r]=1;out.push({r:e.r,d:e.d})}});
 for(var r=1;r<=CFG.rounds;r++){if(seen[r])continue;var at=sg('roundAt:'+r);if(at&&doneR(r)){var d=new Date(at);if(!isNaN(d))out.push({r:r,d:ymd(d)})}}
 return out}
window.MID7_DONE={prefix:PFX,type:doneT,round:doneR,roundDate:function(r){return sg('roundAt:'+r)},
 rounds:function(){var a=[];for(var r=1;r<=CFG.rounds;r++)if(doneR(r))a.push(r);return a}};
function listGet(k){var a=jg(k,[]);return Array.isArray(a)?a:[]}
function listAdd(k,id){var a=listGet(k);if(a.indexOf(id)<0){a.push(id);js(k,a)}}
function wcGet(){var o=jg('wc',{});return(o&&typeof o==='object'&&!Array.isArray(o))?o:{}}
function recWrong(id){var o=wcGet();o[id]=(o[id]||0)+1;js('wc',o);listAdd('w',id);if(o[id]>=2)listAdd('ws',id)}
function recRight(id){}
function isStar(id){return listGet('ws').indexOf(id)>=0}
function listDel(k,id){var a=listGet(k),i=a.indexOf(id);if(i>=0){a.splice(i,1);js(k,a)}}

/* cards */
function isLab(q){return q.c&&q.c.every(function(c){return /^[ⓐ-ⓔ]$/.test(c)})}
function sameSet(a,b){if(a.length!==b.length)return false;var x=a.slice().sort(),y=b.slice().sort();return x.every(function(v,i){return v===y[i]})}
function buildCard(q,no,o){
 o=o||{};
 var c=el('section','tq');c.id='q'+no;c.dataset.id=q.id;
 var th=el('div','th');th.appendChild(el('span','tn',no));th.appendChild(el('div','ask',(o.tag?'<span class="srt">'+o.tag+'</span>':'')+q.a));
 c.appendChild(th);
 if(q.g)c.appendChild(el('div','gv','<span>주어진 문장</span>'+q.g));
 var done=false,btns=[],bsel=[],msel=[];
 function bkHtml(p){return p.replace(/\[\[(\d+)\]\]/g,function(m,i){i=+i;var h='<span class="bk" data-b="'+i+'"><i>(</i>';q.b[i].forEach(function(op,j){if(j)h+='<i>/</i>';h+='<button type="button" data-b="'+i+'" data-o="'+j+'">'+op+'</button>'});return h+'<i>)</i></span>'})}
 var fb=el('div','fb');
 function finish(sel,ok,silent){
  done=true;c.classList.add('done');
  fb.innerHTML='<span class="res '+(ok?'o':'x')+'">'+(ok?'정답':'오답')+'</span><a href="'+(o.ansHref||ansHref(q.id))+'">해설</a>';
  if(o.onDone)o.onDone(q,sel,ok,!!silent);
 }
 if(q.k==='bk'){
  var ps=el('div','ps',bkHtml(q.p));c.appendChild(ps);
  var all=[].slice.call(ps.querySelectorAll('button'));
  var nb=q.b.length;bsel=new Array(nb);
  var judgeBk=function(sel,silent){
   var ok=true;
   all.forEach(function(b){var i=+b.dataset.b,j=+b.dataset.o;b.classList.remove('sel');
    if(j===q.n[i])b.classList.add('ok');else if(sel[i]===j){b.classList.add('ng')}});
   for(var i=0;i<nb;i++)if(sel[i]!==q.n[i])ok=false;
   finish(sel,ok,silent)};
  all.forEach(function(b){b.onclick=function(){if(done)return;var i=+b.dataset.b,j=+b.dataset.o;bsel[i]=j;
   all.forEach(function(x){if(+x.dataset.b===i)x.classList.toggle('sel',+x.dataset.o===j)});
   var full=true;for(var k=0;k<nb;k++)if(bsel[k]==null)full=false;
   if(full)judgeBk(bsel.slice())}});
  c.apply=function(sel){bsel=sel.slice();judgeBk(sel,true)};
 }else{
  if(q.p)c.appendChild(el('div','ps',q.p));
  var wrap=el('div','ch');
  if(q.k==='tf'){
   wrap.className='ch row';
   [[true,'T (일치)'],[false,'F (불일치)']].forEach(function(a){var b=el('button',null,a[1]);b.type='button';b._v=a[0];btns.push(b);wrap.appendChild(b)});
   var judgeTf=function(v,silent){btns.forEach(function(b){if(b._v===q.n)b.classList.add('ok');else if(b._v===v)b.classList.add('ng')});finish(v,v===q.n,silent)};
   btns.forEach(function(b){b.onclick=function(){if(!done)judgeTf(b._v)}});
   c.apply=function(v){judgeTf(v,true)};
  }else{
   var lb=isLab(q);if(lb)wrap.className='ch lab';
   q.c.forEach(function(t,i){var b=el('button',null,(lb?'':'<i>'+LAB[i]+'</i>')+'<span>'+t+'</span>');b.type='button';b._v=i;btns.push(b);wrap.appendChild(b)});
   if(q.k==='ms'){
    var go=el('button','go','확인');go.type='button';go.disabled=true;
    var judgeMs=function(sel,silent){btns.forEach(function(b){var corr=q.n.indexOf(b._v)>=0,s=sel.indexOf(b._v)>=0;b.classList.remove('sel');if(corr){b.classList.add('ok');if(!s)b.classList.add('miss')}else if(s)b.classList.add('ng')});finish(sel,sameSet(sel,q.n),silent)};
    btns.forEach(function(b){b.onclick=function(){if(done)return;var i=msel.indexOf(b._v);if(i>=0){msel.splice(i,1);b.classList.remove('sel')}else{msel.push(b._v);b.classList.add('sel')}go.disabled=!msel.length}});
    go.onclick=function(){if(!done&&msel.length)judgeMs(msel.slice())};
    c.appendChild(wrap);c.appendChild(go);
    c.apply=function(sel){msel=sel.slice();judgeMs(sel,true)};
   }else{
    var judgeMc=function(i,silent){btns.forEach(function(b){if(b._v===q.n)b.classList.add('ok');else if(b._v===i)b.classList.add('ng')});finish(i,i===q.n,silent)};
    btns.forEach(function(b){b.onclick=function(){if(!done)judgeMc(b._v)}});
    c.apply=function(i){judgeMc(i,true)};
   }
  }
  if(q.k!=='ms')c.appendChild(wrap);
 }
 c.appendChild(fb);
 return c;
}

function foot(){return el('div','foot','비타민 영어클리닉 · '+CFG.school)}
function wrongCount(){return listGet('w').length}

/* hub */
var WD=['일','월','화','수','목','금','토'];
function unitLabel(r){var u=unitOf(r);return typeof u==='number'?u+'과':String(u)}
function unitOf(r){var u=null;CFG.units.forEach(function(x){if(r>=x.from&&r<=x.to)u=x.u});return u}
function fmtMD(d,wd){return(d.getMonth()+1)+'/'+d.getDate()+(wd?'('+WD[d.getDay()]+')':'')}
function mondayOf(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function addDays(d,n){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()+n);return x}
function svgChev(){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'}
function proofView(app){
 var now=new Date(),rows=[],tc=0,tn=0;
 for(var r=1;r<=CFG.rounds;r++){var parts=[];TY.forEach(function(t){if(!doneT(r,t.k))return;var ids=(D.R[r][t.k]||[]),st=jg('st:'+r+':'+t.k,{}),ok=0;ids.forEach(function(id){if(st[id]&&st[id][1])ok++});tc+=ok;tn+=ids.length;parts.push('<div class="pu"><span>'+t.n+'</span><b>'+ok+' / '+ids.length+'</b></div>')});
  if(parts.length)rows.push('<div class="pr2"><h4>'+r+'회 <small>'+unitLabel(r)+'</small></h4>'+parts.join('')+'</div>')}
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);app.appendChild(bar);
 var card=el('div','pcard','<div class="pk">학습 인증</div><h1>'+CFG.school+' 유형 풀코스</h1><div class="pd">'+fmtMD(now,1)+' '+pad(now.getHours())+':'+pad(now.getMinutes())+'</div>'+(rows.length?rows.join('')+'<div class="ptot"><span>오늘 푼 문제</span><b>'+tn+'문제 · 정답 '+tc+'</b></div>':'<div class="empty">아직 푼 문제가 없습니다</div>'));
 app.appendChild(card);
}
function tmSum(){var o={q:0,w:0,h:0,tq:0,tw:0,th:0},t0=PFX+'tm:'+ymd(new Date())+':';
 try{for(var i=0;i<ST.length;i++){var k=ST.key(i);if(!k||k.indexOf(PFX+'tm:')!==0)continue;var m=/^[^:]*:tm:[\d-]+:[^:]+:([qwh])$/.exec(k);if(!m)continue;var v=+ST.getItem(k)||0;o[m[1]]+=v;if(k.indexOf(t0)===0)o['t'+m[1]]+=v}}catch(e){}
 return o}
function pageIndex(app){
 if(qs().proof==='1'){proofView(app);return}
 app.classList.add('hubw');
 var now=new Date(),today=new Date(now.getFullYear(),now.getMonth(),now.getDate()),todayS=ymd(today);
 var exS=pYmd(CFG.exam.start),exE=pYmd(CFG.exam.end),exStr={};
 for(var d=new Date(exS);d<=exE;d=addDays(d,1))exStr[ymd(d)]=1;
 var dd=Math.round((exS-today)/86400000),dtxt=dd>0?'D-'+dd:(dd===0?'D-day':'D+'+(-dd));
 var recs=records(),byDate={};recs.forEach(function(e){byDate[e.d]=(byDate[e.d]||0)+1});
 var M=0;for(var r=1;r<=CFG.rounds;r++)if(doneR(r))M++;
 var PLAN=CFG.plan||22;var N=PLAN;

 var n0=app.children.length;
 /* 1. badge card */
 var bc=el('details','bc');
 var sm=el('summary',null,'<div class="bdg"><b>'+CFG.school+'</b><span>기말 '+fmtMD(exS,1)+'</span><strong>'+dtxt+'</strong></div><div class="bq"><div class="bqt">'+CFG.quote.replace('반복된 작은','반복된<br>작은')+'<em class="bqe">비타민영어클리닉 학원</em></div></div><span class="cv">'+svgChev()+'</span>');
 bc.appendChild(sm);
 var sl=el('div','sl');
 var slides=[['기말고사',fmtMD(exS,1)+' ~ '+fmtMD(exE,1)],['유형 풀코스',N+'회 · '+CFG.types.length+'개 유형'],['주간 목표',CFG.goal+'회']];
 slides.forEach(function(x){sl.appendChild(el('div','sd','<small>'+x[0]+'</small><b>'+x[1]+'</b>'))});
 bc.appendChild(sl);app.appendChild(bc);

 /* 2. overall progress */
 function solvedHtml(){
  var per={},tot=0;
  CFG.types.forEach(function(t){per[t.k]=0});
  for(var r3=1;r3<=CFG.rounds;r3++)CFG.types.forEach(function(t){if(doneT(r3,t.k)){var n=(D.R[r3][t.k]||[]).length;per[t.k]+=n;tot+=n}});
  if(!tot)return '';
  var chips=CFG.types.filter(function(t){return per[t.k]}).map(function(t){return '<span><small>'+t.n+'</small><b>'+per[t.k]+'</b></span>'}).join('');
  return '<div class="sv">'+chips+'</div><div class="st2"><small>지금까지 푼 문제</small><b>'+tot+'문제</b></div>';
 }

 var all=M>=N&&N>0;
 app.appendChild(el('div','pc','<div class="pt"><b>전체 진행</b><span>'+(all?'전체 완료':N+'회 중 '+M+'회')+'</span></div><div class="pb"><i style="width:'+(N?Math.round(M/N*1000)/10:0)+'%"></i></div>'+solvedHtml()));

 /* 3,4. link cards */
 var rsm=null;try{var q0=JSON.parse(ST.getItem('midq:q')||'null');if(q0&&q0.l&&Date.now()-(q0.t||0)<43200000){q0.l.forEach(function(x){if(!rsm&&!doneT(x.r,x.k.split(':')[1]))rsm=x})}}catch(e){}
 if(rsm){var ra=el('a','rsm','<span><b>이어서 풀기</b><small>'+rsm.r+'회 ('+unitLabel(rsm.r)+') · '+rsm.n+'</small></span><span class="rgo">\u203a</span>');ra.href=rsm.u;app.appendChild(ra)}
 var lo=el('a','lc or','<div><b>오답 노트</b><small>1차 오답은 자동 저장, 2차 오답은 별표(★) 표시</small></div><span>열기</span>');lo.href='wrong.html';if(CFG.rounds)app.appendChild(lo);
 if(SH){var lp=el('a','lc','<div><b>학습 인증</b><small>오늘 푼 내용 확인 화면</small></div><span>열기</span>');lp.href='index.html?proof=1';app.appendChild(lp)}
 var lb=el('a','lc bl','<div><b>전체 랜덤 20문항</b><small>전체에서 20문항씩, 또는 원하는 유형만 골라 풀어요</small></div><span>시작</span>');lb.href='mix.html';if(CFG.rounds)app.appendChild(lb);

 /* 5. exam title row */
 var wk0=mondayOf(today),wk1=addDays(wk0,6),wcnt=0;
 recs.forEach(function(e){var d=pYmd(e.d);if(d>=wk0&&d<=wk1)wcnt++});
 var wtxt=wcnt>=CFG.goal?'이번 주 목표 완료 · '+wcnt+'회':'이번 주 '+CFG.goal+'회 중 '+wcnt+'회';
 app.appendChild(el('div','et2','<b>기말고사 ('+fmtMD(exS)+'~'+fmtMD(exE)+')</b><span>'+wtxt+'</span>'));

 /* 6. calendar */
 var firstRec=today;recs.forEach(function(e){var d=pYmd(e.d);if(d<firstRec)firstRec=d});
 var minM=new Date(firstRec.getFullYear(),firstRec.getMonth(),1);
 var lastD=exE>today?exE:today,maxM=new Date(lastD.getFullYear(),lastD.getMonth(),1);
 var minW=mondayOf(firstRec),maxW=mondayOf(lastD);
 var view='month',curM=new Date(today.getFullYear(),today.getMonth(),1),curW=mondayOf(today);
 var cal=el('div','cal');app.appendChild(cal);
 function cell(d){
  var s=ymd(d),n=byDate[s]||0,cls='cd'+(d.getDay()===0?' sun':'')+(n?' done':'')+(s===todayS?' today':'')+(exStr[s]?' exam':'');
  return '<div class="'+cls+'"><span class="rg"><span class="fl">'+(exStr[s]?'<i>시험</i>':'')+'<em>'+d.getDate()+'</em></span></span>'+(n>1?'<span class="bd">'+n+'</span>':'')+'</div>'}
 function draw(){
  var h='<div class="ch2">',title,canP,canN;
  if(view==='month'){title=curM.getFullYear()+'년 '+(curM.getMonth()+1)+'월';canP=curM>minM;canN=curM<maxM}
  else{title=fmtMD(curW,1)+' ~ '+fmtMD(addDays(curW,6),1);canP=curW>minW;canN=curW<maxW}
  h+='<button type="button" class="ar" data-d="-1"'+(canP?'':' disabled')+'>‹</button><b>'+title+'</b><button type="button" class="ar" data-d="1"'+(canN?'':' disabled')+'>›</button></div>';
  h+='<div class="wk">'+['월','화','수','목','금','토','일'].map(function(w,i){return'<span'+(i===6?' class="sun"':'')+'>'+w+'</span>'}).join('')+'</div><div class="gr">';
  if(view==='month'){
   var f=new Date(curM.getFullYear(),curM.getMonth(),1),lead=(f.getDay()+6)%7,days=new Date(curM.getFullYear(),curM.getMonth()+1,0).getDate();
   for(var i=0;i<lead;i++)h+='<div class="cd"></div>';
   for(var k=1;k<=days;k++)h+=cell(new Date(curM.getFullYear(),curM.getMonth(),k));
  }else{for(var j=0;j<7;j++)h+=cell(addDays(curW,j))}
  h+='</div><div class="lg"><span><i class="g1"></i>오늘</span><span><i class="g2"></i>완료한 날</span><span><i class="g3"></i>시험</span></div>';
  h+='<button type="button" class="fold">'+(view==='month'?'주간으로 접기':'월간 달력 펼치기')+'</button>';
  cal.innerHTML=h;
  [].forEach.call(cal.querySelectorAll('.ar'),function(b){b.onclick=function(){if(b.disabled)return;var s=+b.dataset.d;if(view==='month')curM=new Date(curM.getFullYear(),curM.getMonth()+s,1);else curW=addDays(curW,7*s);draw()}});
  cal.querySelector('.fold').onclick=function(){
   if(view==='month'){view='week';curW=(curM.getFullYear()===today.getFullYear()&&curM.getMonth()===today.getMonth())?mondayOf(today):mondayOf(new Date(curM.getFullYear(),curM.getMonth(),1))}
   else{view='month';var m=addDays(curW,3);curM=new Date(m.getFullYear(),m.getMonth(),1)}
   draw()};
 }
 draw();

 var drop=[].slice.call(app.children,n0);
 /* 7. below the calendar: 유형 풀코스 */
 var g=el('div','grid');
 /* one 회차 at a time (calendar-like): opens on the first unfinished one; arrows go back to finished ones, forward stops at the unfinished one */
 var curR=PLAN;for(var q2=1;q2<=PLAN;q2++){if(q2>CFG.rounds||!doneR(q2)){curR=q2;break}}
 var viewR=0;
 var QS={};
 function drawRound(){
  g.innerHTML='';
  function bOf(r){var u=unitOf(r);return typeof u==='number'?u+'과':'최종'}
  function nOf(r){return r}
  function stOf(r){if(r>CFG.rounds)return 'lock';if(doneR(r))return 'done';if(!SH)for(var j=1;j<r;j++)if(!doneR(j))return 'lock';return 'now'}
  g.appendChild(el('div','sgh','<b>유형 풀코스</b><span>'+PLAN+'회 중 '+M+'회</span>'));
  var sg2=el('div','sgrid');
  for(var rb=1;rb<=PLAN;rb++)sg2.appendChild(el('button','stb '+stOf(rb)+(rb===viewR?' sel':''),'<span class="sbd">'+bOf(rb)+'</span><span class="sno">'+nOf(rb)+'회</span>')).setAttribute('data-stage',rb);
  [].forEach.call(sg2.querySelectorAll('.stb'),function(b){b.type='button';b.onclick=function(){var x=+b.getAttribute('data-stage');viewR=(viewR===x)?0:x;drawRound()}});
  g.appendChild(sg2);
  if(!viewR)return;
  var r2=viewR,stt=stOf(r2),need=0;
  if(stt==='lock')for(var j2=1;j2<r2;j2++)if(!doneR(j2)){need=j2;break}
  var built=r2<=CFG.rounds,card=el('div','rc');
  card.appendChild(el('h3','rt',r2+'회 ('+bOf(r2)+')'));
  if(stt==='lock')card.appendChild(el('div','slk',need?need+'회 먼저 끝내요':'준비 중이에요'));
  var k2=0;
  CFG.types.forEach(function(t){if(stt==='lock')return;var n=((D.R[r2]||{})[t.k]||[]).length;if(!n)return;k2++;
   var dn=doneT(r2,t.k),qk=r2+':'+t.k,chk=QS[qk]!==undefined?QS[qk]:!dn;
   card.appendChild(el('div','arow'+(dn?' dn':''),(dn?'<span class="ck"><i class="okb">\u2713</i></span>':'<label class="ck"><input type="checkbox" data-q="'+qk+'"'+(chk?' checked':'')+'></label>')+'<a class="at" href="test.html?r='+r2+'&t='+t.k+'"><b>'+k2+'. '+t.n+'</b><span class="cn">'+n+'문제</span><i class="vr o">'+(sg('imp:'+r2+':'+t.k)==='1'?'타기기':'1회성')+'</i></a>'));
  });
  var qOpen=0,qSum=0;
  CFG.types.forEach(function(t){var n=((D.R[r2]||{})[t.k]||[]).length;if(!n)return;qSum+=n;if(!doneT(r2,t.k))qOpen++});
  if(built&&qOpen&&stt!=='lock'){
   card.appendChild(el('div','qsel','<button type="button" data-qall="1">전체 선택</button><button type="button" data-qall="0">전체 해제</button>'));
   card.appendChild(el('button','qgo','체크한 유형 이어서 풀기 (<span id="qn">0</span>)')).setAttribute('type','button');
  }
  if(built&&qSum&&stt!=='lock')card.appendChild(el('div','qtot','<span>합계</span><b>약 '+qSum+'문제</b>'));
  function qCount(){var n=0;[].forEach.call(card.querySelectorAll('input[data-q]'),function(c){if(c.checked)n++});var s=card.querySelector('#qn');if(s)s.textContent=n;var b=card.querySelector('.qgo');if(b)b.disabled=!n}
  [].forEach.call(card.querySelectorAll('input[data-q]'),function(c){c.onchange=function(){QS[c.getAttribute('data-q')]=c.checked;qCount()}});
  [].forEach.call(card.querySelectorAll('[data-qall]'),function(b){b.onclick=function(){var on=b.getAttribute('data-qall')==='1';[].forEach.call(card.querySelectorAll('input[data-q]'),function(c){c.checked=on;QS[c.getAttribute('data-q')]=on});qCount()}});
  var qg=card.querySelector('.qgo');
  if(qg)qg.onclick=function(){var items=[];CFG.types.forEach(function(t){var cb=card.querySelector('input[data-q="'+r2+':'+t.k+'"]');if(cb&&cb.checked)items.push({u:'test.html?r='+r2+'&t='+t.k,k:r2+':'+t.k,n:t.n,r:r2})});if(!items.length)return;try{ST.setItem('midq:q',JSON.stringify({l:items,t:Date.now()}))}catch(e){}location.href=items[0].u};
  qCount();
  if(built&&!SH&&!doneR(r2)&&stt!=='lock'){
   var ob=el('div','ot','<button type="button" class="otb">타기기에서 했어요</button>');
   ob.querySelector('.otb').onclick=function(){
    ob.innerHTML='<input type="password" inputmode="numeric" maxlength="4" class="opw" placeholder="선생님 번호" autocomplete="off"><button type="button" class="oty">확인</button><button type="button" class="otn">취소</button><span class="oer"></span>';
    ob.querySelector('.otn').onclick=drawRound;
    ob.querySelector('.oty').onclick=function(){
     var pv=ob.querySelector('.opw').value,hx=2166136261,ps='vit|'+pv+'|mid7';for(var pi=0;pi<ps.length;pi++){hx^=ps.charCodeAt(pi);hx=Math.imul(hx,16777619)>>>0}
     if(hx.toString(36)!=='11szxpf'){ob.querySelector('.oer').textContent='번호가 달라요';ob.querySelector('.opw').value='';return}CFG.types.forEach(function(t){if((D.R[r2][t.k]||[]).length&&!doneT(r2,t.k)){markDone(r2,t.k);ss('imp:'+r2+':'+t.k,'1')}});location.reload()}};
   card.appendChild(ob)}
  g.appendChild(card);
 }
 drawRound();
 app.appendChild(g);
 if(!SH){
  var dsT=ymd(today),solved=0,days={};
  function fmtDur(s){return s>=3600?Math.floor(s/3600)+'시간 '+Math.round(s%3600/60)+'분':s>=60?Math.round(s/60)+'분':s+'초'}
  for(var rr=1;rr<=CFG.rounds;rr++){
   CFG.types.forEach(function(t){var n=((D.R[rr]||{})[t.k]||[]).length;if(!n)return;var at=sg('doneAt:'+rr+':'+t.k);
    if(doneT(rr,t.k))solved+=n;
    if(at)days[ymd(new Date(at))]=1})}
  var TS=tmSum(),tot=TS.q+TS.w+TS.h,tt=TS.tq+TS.tw+TS.th;
  var CNK={},qg=0,qd=0;Object.keys(CNK).forEach(function(k){var at=sg('ans:'+k);if(at){qg+=CNK[k];if(ymd(new Date(+at))===dsT)qd+=CNK[k]}});
  function trio(x){var o='<div class="lrv">';for(var i=0;i<x.length;i+=2)o+='<div><small>'+x[i]+'</small><b>'+x[i+1]+'</b></div>';return o+'</div>'}
  function lsub(p){return '<span class="lrd">문제 풀이 '+fmtDur(TS[p+'q'])+' · 오답 복습 '+fmtDur(TS[p+'w'])+' · 그 외 '+fmtDur(TS[p+'h'])+'</span>'}
  app.appendChild(el('div','lrc','<div class="lrh"><b>나의 학습 기록</b></div><div class="lrs"><div><em>누적 채점 문항</em><b>'+qg+'<small>문제</small></b></div><div><em>누적 유형 풀코스</em><b>'+solved+'<small>문제</small></b></div></div><div class="lrr"><em>누적 이용 시간</em><b>'+(tot?fmtDur(tot):'-')+'</b>'+lsub('')+'</div><div class="lrr"><em>오늘 · '+fmtMD(today,1)+'</em>'+trio(['이용 시간',tt?fmtDur(tt):'-','완료 회차',M+' / '+N+'회','채점 문항',qd+'문제'])+lsub('t')+'</div>'));
 }
 
 var ROAD=[["10/26","11/1","1~3회 (5과)"],["11/2","11/8","4회 (5과) → 5~6회 (6과)"],["11/9","11/15","7~8회 (6과) → 9회 (7과)"],["11/16","11/22","10~12회 (7과)"],["11/23","11/29","13~15회 (8과)"],["11/30","12/6","16~17회 (8과) → 18회 (최종점검)"],["12/7","12/13","19~21회 (최종점검) · 틀린 문제, 약한 유형 골라 풀기"]];
 (function(){var yy=today.getFullYear(),pd=function(s){var p=s.split('/');return new Date(yy,p[0]-1,+p[1])},cw=ROAD.length;ROAD.forEach(function(w,i){if(cw===ROAD.length&&today<=pd(w[1]))cw=i});if(today<pd(ROAD[0][0]))cw=-1;
  var rh='<div class="rh"><b>시험까지 큰 흐름</b><span>기말고사 ('+fmtMD(exS)+'~'+fmtMD(exE)+')</span></div>';
  ROAD.forEach(function(w,i){rh+='<div class="wr'+(i===cw?' cur':'')+(cw>=0&&i<cw?' past':'')+'"><span class="wn">'+(i+1)+'주</span><span class="wd2">'+fmtMD(pd(w[0]),1)+'~'+fmtMD(pd(w[1]),1)+'</span><span class="wm">'+w[2]+'</span></div>'});
  if(!document.getElementById('roadcss')){var cs=document.createElement('style');cs.id='roadcss';cs.textContent='.road{border:1px solid var(--line);border-radius:12px;padding:10px;margin:14px 0;background:var(--card)}.road .rh{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:14px;margin-bottom:6px}.road .rh b{font-size:15px}.road .rh span{color:var(--blue);font-weight:700;font-size:13px}.road .wr{display:flex;gap:6px;align-items:baseline;font-size:13px;padding:6px 7px;border-radius:8px;word-break:keep-all;line-height:1.5}.road .wr.cur{background:var(--pri);color:#fff}.road .wr.past{opacity:.5}.road .wn{font-weight:800;min-width:26px}.road .wd2{white-space:nowrap}.road .wm{flex:1 1 150px;min-width:0}';document.head.appendChild(cs)}
  app.appendChild(el('div','road',rh))})();
 app.appendChild(el('div','note','내 진도는 내가 정해요. 활동을 누르면 바로 열리고, 풀던 곳부터 이어서 할 수 있어요. 기록은 이 폰에만 저장돼요.'));app.appendChild(foot());
 /* fixed tabs */
 var tabs=el('nav','tabs');
 var SV0='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
 var t1=el('a',null,SV0+'<path d="M6 3h9l4 4v14H6z"></path><path d="M14 3v5h5"></path><path d="M9 13h7M9 17h7"></path></svg>원문');t1.href=(CFG.tabs&&CFG.tabs.won)||'#';
 var t2=el('a',null,SV0+'<rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 12l3 3 5-6"></path></svg>답안지');t2.href=(CFG.tabs&&CFG.tabs.ans)||'#';
 var t3=el('a','on',SV0+'<rect x="3" y="5" width="18" height="16" rx="3"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>유형 풀코스');t3.href='index.html';
 tabs.appendChild(t1);tabs.appendChild(t2);tabs.appendChild(t3);document.body.appendChild(tabs);
}

/* mix: finite rotation. mode 'all' = 20 from everything; mode 't' = 10 from the chosen types */
function pageMix(app){
 var pools={all:[]};TY.forEach(function(t){pools[t.k]=[]});
 for(var r=1;r<=CFG.rounds;r++)TY.forEach(function(t){(D.R[r][t.k]||[]).forEach(function(id){pools.all.push(id);pools[t.k].push(id)})});
 function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
 function scopeKey(m,types){return m==='all'?'all':types.slice().sort().join('+')}
 function poolOf(m,types){if(m==='all')return pools.all;var o=[];TY.forEach(function(t){if(types.indexOf(t.k)>=0)o=o.concat(pools[t.k])});return o}
 function sig(a){return a.join(',')}
 function ssig(a){return a.slice().sort().join(',')}
 function draw(m,types){
  var key=scopeKey(m,types),pool=poolOf(m,types),size=m==='all'?20:10;
  var used=listGet('mix:used:'+key).filter(function(id){return pool.indexOf(id)>=0});
  var left=pool.filter(function(id){return used.indexOf(id)<0});
  var o=jg('mix:sigs:'+key,{a:[],b:[]});if(!o||!Array.isArray(o.a)||!Array.isArray(o.b))o={a:[],b:[]};
  var pick;
  if(left.length>=size){pick=shuffle(left).slice(0,size);used=used.concat(pick)}
  else{
   /* lap used up: leftovers first, then a freshly shuffled mix; bundle/order must not repeat an earlier one */
   var best=null;
   for(var n=0;n<300;n++){
    var rest=shuffle(pool.filter(function(id){return left.indexOf(id)<0}));
    var c=shuffle(left).concat(rest).slice(0,Math.min(size,pool.length));
    if(o.b.indexOf(ssig(c))<0){best=c;break}
    if(!best&&o.a.indexOf(sig(c))<0)best=c;
   }
   pick=best||shuffle(pool).slice(0,Math.min(size,pool.length));
   used=pick.slice();
  }
  o.a.push(sig(pick));o.b.push(ssig(pick));if(o.a.length>300){o.a.shift();o.b.shift()}
  js('mix:sigs:'+key,o);js('mix:used:'+key,used);
  var cur={m:m,types:types,ids:pick,st:{},fin:0};js('mix:cur',cur);return cur}
 var p=qs(),cur=jg('mix:cur',null);
 var nv=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0])||{},isReload=nv.type==='reload'||(!nv.type&&performance.navigation&&performance.navigation.type===1);
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);app.appendChild(bar);
 var req=null;
 if(p.next==='1'){
  if(p.m==='all')req={m:'all',types:[]};
  else if(p.m==='t'){var ty=(p.t||'').split(',').filter(function(x){return pools[x]&&x!=='all'});if(ty.length)req={m:'t',types:ty}}
  else if(cur&&cur.ids)req={m:cur.m||'all',types:cur.types||[]};
 }
 if(req){cur=draw(req.m,req.types);if(history.replaceState)history.replaceState(null,'','mix.html')}
 else if(p.pick==='1'||!cur||!Array.isArray(cur.ids)||(cur.fin&&!isReload)){chooser(app);return}
 var isAll=cur.m!=='t';
 app.appendChild(el('h1',null,'랜덤 문제 풀기'));
 app.appendChild(el('p','sub',(isAll?'':cur.types.map(function(k){return TN[k]}).join(' · ')+' · ')+cur.ids.length+'문항'));
 var cnt=0,sum=el('div','sum');sum.style.display='none';var cards=[];
 var nextHref='mix.html?next=1&m='+(isAll?'all':'t&t='+cur.types.join(','));
 cur.ids.forEach(function(id,i){
  var q=Q[id],o=IDX[id];
  var c=buildCard(q,i+1,{tag:o?(o.r+'회차 · '+TN[o.t]):'',onDone:function(q,sel,ok,silent){
   cnt++;
   if(!silent){cur.st[id]=[sel,ok?1:0];if(!ok)recWrong(id);js('mix:cur',cur)}
   if(cnt===cur.ids.length){
    var w=cur.ids.filter(function(x){return cur.st[x]&&!cur.st[x][1]}).length;
    cur.fin=1;js('mix:cur',cur);
    sum.innerHTML='<p>'+cur.ids.length+'문항 마침 · 틀린 문제 '+w+'개</p><div class="lk"><a class="pr" href="'+nextHref+'">다음 '+(isAll?20:10)+'문항</a><a href="mix.html?pick=1">방식 다시 고르기</a><a href="index.html">처음 화면</a></div>';sum.style.display='block'}
  }});
  app.appendChild(c);cards.push(c)});
 app.appendChild(sum);
 cur.ids.forEach(function(id,i){if(cur.st[id]!=null&&cards[i].apply)cards[i].apply(cur.st[id][0])});
 app.appendChild(foot());
}
function chooser(app){
 app.appendChild(el('h1',null,'랜덤 문제 풀기'));
 var a=el('a','mode pr','<b>전체에서 20문항</b><small>모든 회차에서 섞어서 20문항</small>');a.href='mix.html?next=1&m=all';app.appendChild(a);
 app.appendChild(el('h2',null,'유형 골라서 10문항'));
 var sel=[],ch=el('div','chips');
 TY.forEach(function(t){var b=el('button',null,t.n);b.type='button';b.onclick=function(){var i=sel.indexOf(t.k);if(i>=0){sel.splice(i,1);b.classList.remove('on')}else{sel.push(t.k);b.classList.add('on')}go.classList.toggle('off',!sel.length);go.setAttribute('aria-disabled',sel.length?'false':'true')};ch.appendChild(b)});
 app.appendChild(ch);
 var go=el('a','mode off','<b>고른 유형으로 시작</b><small>10문항씩</small>');go.href='#';go.setAttribute('aria-disabled','true');
 go.onclick=function(e){e.preventDefault();if(!sel.length)return;location.href='mix.html?next=1&m=t&t='+TY.map(function(t){return t.k}).filter(function(k){return sel.indexOf(k)>=0}).join(',')};
 app.appendChild(go);app.appendChild(foot());
}

/* test */
function nextLoc(r,t){
 var ti=-1;TY.forEach(function(x,i){if(x.k===t)ti=i});
 for(var i=ti+1;i<TY.length;i++){if((D.R[r][TY[i].k]||[]).length)return{h:'test.html?r='+r+'&t='+TY[i].k,l:TY[i].n+' 풀기'}}
 if(r<CFG.rounds){for(var j=0;j<TY.length;j++)if((D.R[r+1][TY[j].k]||[]).length)return{h:'test.html?r='+(r+1)+'&t='+TY[j].k,l:(r+1)+'회차 시작'}}
 return{h:'index.html',l:'처음 화면'}}
function qNext(r,t){var q=null;try{q=JSON.parse(ST.getItem('midq:q')||'null')}catch(e){}if(!q||!q.l)return null;var k=r+':'+t,ix=-1;q.l.forEach(function(x,i){if(x.k===k)ix=i});if(ix<0)return null;
 for(var i=ix+1;i<q.l.length;i++){var x=q.l[i];if(!doneT(x.r,x.k.split(':')[1]))return{h:x.u,l:x.n+' 풀기'}}
 try{ST.removeItem('midq:q')}catch(e){}return{h:'index.html',l:'처음 화면'}}
function pageTest(app){
 var p=qs(),r=+p.r,t=p.t,ids=(D.R[r]||{})[t];
 if(!ids||!ids.length){app.appendChild(el('div','empty','문제를 찾을 수 없습니다.'));var b=el('a','pill','처음 화면');b.href='index.html';app.appendChild(b);return}
 var st=jg('st:'+r+':'+t,{}),T0=Date.now();
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);
 TY.forEach(function(x){if(!(D.R[r][x.k]||[]).length)return;var a=el('a','pill'+(x.k===t?' on':(doneT(r,x.k)?' dn':'')),x.n);a.href='test.html?r='+r+'&t='+x.k;bar.appendChild(a)});
 app.appendChild(bar);
 app.appendChild(el('h1',null,r+'회차 · '+TN[t]));
 app.appendChild(el('p','sub',unitLabel(r)+' · '+ids.length+'문항'));
 var cnt=0,wr=0,sum=el('div','sum');sum.style.display='none';
 function check(){
  if(cnt<ids.length)return;
  var first0=!doneT(r,t);markDone(r,t);if(first0)ss('dur:'+r+':'+t,String(Math.min(1800,Math.max(5,Math.round((Date.now()-T0)/1000)))));
  var w=ids.filter(function(id){return st[id]&&!st[id][1]}).length;
  var nx=qNext(r,t)||nextLoc(r,t);
  sum.innerHTML='<p>'+TN[t]+' 마침 · 틀린 문제 '+w+'개</p><div class="lk">'+(w?'<a href="answer.html?r='+r+'&t='+t+'">해설 보기</a>':'')+(SH?'<a href="index.html?proof=1">학습 인증</a>':'')+'<a class="pr" href="'+nx.h+'">'+nx.l+'</a></div>';
  sum.style.display='block';
  var pills=bar.querySelectorAll('.pill');for(var i=0;i<pills.length;i++){if(pills[i].textContent===TN[t]&&!pills[i].classList.contains('on')){}}
 }
 var cards=[];
 ids.forEach(function(id,i){
  var q=Q[id];
  var c=buildCard(q,i+1,{onDone:function(q,sel,ok,silent){
    if(!silent){cnt++;st[id]=[sel,ok?1:0];js('st:'+r+':'+t,st);if(!ok)recWrong(id)}else{cnt++}
    check()}});
  app.appendChild(c);cards.push(c);
 });
 app.appendChild(sum);
 ids.forEach(function(id,i){if(st[id]!=null&&cards[i].apply){cards[i].apply(st[id][0])}});
 app.appendChild(foot());
}

/* wrong */
function pageWrong(app){
 var p=qs(),only=p.s==='1';
 var all=listGet('w').filter(function(id){return Q[id]&&IDX[id]});
 all.sort(function(a,b){var x=IDX[a],y=IDX[b];var xr=x.r||99,yr=y.r||99;if(xr!==yr)return xr-yr;var xt=TY.map(function(z){return z.k}).indexOf(x.t),yt=TY.map(function(z){return z.k}).indexOf(y.t);if(xt!==yt)return xt-yt;return x.n-y.n});
 var stars=all.filter(isStar),list=only?stars:all;
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);app.appendChild(bar);
 app.appendChild(el('h1',null,'오답 노트'));
 app.appendChild(el('p','sub',(only?'별표 ':'')+list.length+'문항'));
 app.appendChild(el('div','rule','<b>이렇게 쌓여요</b>1차 오답은 자동 저장돼요.<br>2차 오답은 별표(★)로 표시돼요.<br>맞혀도 노트에서 빠지지 않아요. 별표만 직접 지울 수 있어요.'));
 if(all.length){
  var m1=el('a','mode'+(only?'':' pr'),'<b>담긴 오답 전체 풀기</b><small>'+all.length+'문항</small>');m1.href='wrong.html';app.appendChild(m1);
  var m2=el('a','mode'+(only?' pr':'')+(stars.length?'':' off'),'<b>별표만 풀기</b><small>'+stars.length+'문항</small>');m2.href=stars.length?'wrong.html?s=1':'#';if(!stars.length)m2.onclick=function(e){e.preventDefault()};app.appendChild(m2);
 }
 if(!list.length){app.appendChild(el('div','empty',only?'별표가 없습니다.':'담긴 오답이 없습니다.'));app.appendChild(foot());return}
 var cnt=0,left=0,sum=el('div','sum');sum.style.display='none';
 list.forEach(function(id,i){
  var q=Q[id],o=IDX[id];
  var c=buildCard(q,i+1,{tag:(isStar(id)?'<b class="stm">별표</b> ':'')+o.r+'회차 · '+TN[o.t],onDone:function(q,sel,ok,silent){
   cnt++;
   if(!silent){if(!ok){recWrong(id);left++}}
   if(cnt===list.length){sum.innerHTML='<p>다시 틀린 문제 '+left+'개</p><div class="lk"><a href="index.html">처음 화면</a></div>';sum.style.display='block'}
  }});
  if(isStar(id)){
   c.classList.add('starred');
   var cl=el('button','stclr','별표 지우기');cl.type='button';
   cl.onclick=function(){listDel('ws',id);c.classList.remove('starred');var b=c.querySelector('.stm');if(b)b.remove();cl.remove()};
   c.appendChild(cl);
  }
  app.appendChild(c);
 });
 app.appendChild(sum);app.appendChild(foot());
}

/* vocabx */
function pageVx(app){
 var p=qs(),s=p.s;
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);
 if(s){var back=el('a','pill','세트 목록');back.href='vocabx.html';bar.appendChild(back)}
 app.appendChild(bar);
 if(!s){
  app.appendChild(el('h1',null,'어휘 확장'));
  var ch=el('div','chips');
  D.VX.forEach(function(v){var a=el('a',sg('xdone:'+v.s)==='1'?'on':'','세트 '+v.s+'<small>'+v.ids.length+'문항</small>');a.href='vocabx.html?s='+v.s;ch.appendChild(a)});
  app.appendChild(ch);app.appendChild(foot());return}
 var set=null;D.VX.forEach(function(v){if(String(v.s)===s)set=v});
 if(!set){app.appendChild(el('div','empty','세트를 찾을 수 없습니다.'));return}
 app.appendChild(el('h1',null,'어휘 확장 · 세트 '+set.s));
 var st=jg('xst:'+set.s,{}),cnt=0,sum=el('div','sum');sum.style.display='none';var cards=[];
 set.ids.forEach(function(id,i){
  var c=buildCard(Q[id],i+1,{onDone:function(q,sel,ok,silent){
   cnt++;if(!silent){st[id]=[sel,ok?1:0];js('xst:'+set.s,st)}
   if(cnt===set.ids.length){ss('xdone:'+set.s,'1');var w=set.ids.filter(function(x){return st[x]&&!st[x][1]}).length;
    var nx=null;D.VX.forEach(function(v){if(v.s>set.s&&!nx)nx=v});
    sum.innerHTML='<p>세트 '+set.s+' 마침 · 틀린 문제 '+w+'개</p><div class="lk">'+(w?'<a href="answer.html?x='+set.s+'">해설 보기</a>':'')+'<a class="pr" href="'+(nx?'vocabx.html?s='+nx.s:'vocabx.html')+'">'+(nx?'세트 '+nx.s:'세트 목록')+'</a></div>';sum.style.display='block'}
  }});
  app.appendChild(c);cards.push(c)});
 app.appendChild(sum);
 set.ids.forEach(function(id,i){if(st[id]!=null&&cards[i].apply)cards[i].apply(st[id][0])});
 app.appendChild(foot());
}

/* answer */
function ansText(q){
 if(q.k==='tf')return q.n?'T (일치)':'F (일치하지 않음)';
 if(q.k==='bk')return q.n.map(function(j,i){return strip(q.b[i][j])}).join(', ');
 if(q.k==='ms')return q.n.slice().sort().map(function(i){return LAB[i]+' '+strip(q.c[i])}).join(' / ');
 if(isLab(q))return q.c[q.n];
 var ct=strip(q.c[q.n]);return LAB[q.n]+(/^\(/.test(ct)?' '+ct:' ('+ct+')');
}
function renderRich(c,q){
 var r=q.r;
 if(r.cm&&q.c){var ml=el('div','cm');r.cm.forEach(function(m,j){if(m)ml.appendChild(el('div','cml','<b>'+(isLab(q)?'':LAB[j]+' ')+'</b>'+m))});c.appendChild(el('span','lbl','보기 해석'));c.appendChild(ml)}
 c.appendChild(el('span','lbl','해설'));
 (r.w||[]).forEach(function(p){
  var b=el('div','part');
  if(p.h)b.appendChild(el('div','ph',p.h));
  (p.l||[]).forEach(function(l){b.appendChild(el('div','ln',l))});
  if(p.o&&p.o.length){var wr=el('div','wr');wr.appendChild(el('b',null,'다른 보기'));p.o.forEach(function(l){wr.appendChild(el('div','wl',l))});b.appendChild(wr)}
  if(p.p){var pit=el('div','pit');pit.appendChild(el('span','pt',p.p.k||'쉬운 문법'));pit.appendChild(el('div','tt',p.p.t));
   if(p.p.l&&p.p.l.length){var ul=el('ul');p.p.l.forEach(function(l){ul.appendChild(el('li',null,l))});pit.appendChild(ul)}
   if(p.p.e){pit.appendChild(el('div','pex','<div>'+p.p.e[0]+'<span>'+(p.p.e[1]||'')+'</span></div>'))}
   b.appendChild(pit)}
  c.appendChild(b)});
}
function pageAnswer(app){
 var p=qs(),ids,title,back;
 if(p.x){var set=null;D.VX.forEach(function(v){if(String(v.s)===p.x)set=v});ids=set&&set.ids;title='어휘 확장 · 세트 '+p.x+' 해설';back='vocabx.html?s='+p.x}
 else{ids=(D.R[+p.r]||{})[p.t];title=p.r+'회차 · '+TN[p.t]+' 해설';back='test.html?r='+p.r+'&t='+p.t}
 if(!ids||!ids.length){app.appendChild(el('div','empty','해설을 찾을 수 없습니다.'));return}
 var top=el('div','top');var a1=el('a','pill','‹ 문제로');a1.href=back;top.appendChild(a1);var a2=el('a','pill','처음 화면');a2.href='index.html';top.appendChild(a2);app.appendChild(top);
 app.appendChild(el('h1',null,title));
 app.appendChild(el('h2',null,'빠른정답')).id='quick';
 var qk=el('div','quick');
 ids.forEach(function(id,i){var q=Q[id];var a=el('a',null,'<span class="qn">'+(i+1)+')</span> 정답: <span class="qa">'+ansText(q)+'</span>');a.href='#q'+(i+1);qk.appendChild(a)});
 app.appendChild(qk);
 app.appendChild(el('h2',null,'해설'));
 ids.forEach(function(id,i){
  var q=Q[id],no=i+1,c=el('article','q');c.id='q'+no;
  var qh=el('div','qh','<span class="no">'+no+'</span>');
  var tq=el('a','toq','↑ 빠른정답');tq.href='#quick';qh.appendChild(tq);
  var tt=el('a',null,'문제 보기');tt.href=back+'#q'+no;qh.appendChild(tt);c.appendChild(qh);
  c.appendChild(el('div','ask2',q.a));
  if(q.g)c.appendChild(el('div','gv','<span>주어진 문장</span>'+q.g));
  if(q.p){var ph=q.p;if(q.k==='bk')ph=ph.replace(/\[\[(\d+)\]\]/g,function(m,i){return '<b>'+q.b[+i][q.n[+i]]+'</b>'});c.appendChild(el('div','ps',ph))}
  if(q.c){var ol=el('ol');q.c.forEach(function(t,j){var on=(q.k==='ms')?q.n.indexOf(j)>=0:j===q.n;ol.appendChild(el('li',on?'c':'',(isLab(q)?'':LAB[j]+' ')+t+(on?'  (정답)':'')))});c.appendChild(ol)}
  c.appendChild(el('div','answ','정답: '+ansText(q)));
  if(q.pk)c.appendChild(el('div','ko',q.pk));
  if(q.gk)c.appendChild(el('div','ko',q.gk));
  if(q.r){renderRich(c,q)}else{
  if(q.e&&q.e.length){c.appendChild(el('span','lbl','해설'));q.e.forEach(function(l){c.appendChild(el('div','ln',l))})}
  }
  if(!q.r&&q.x&&q.x.length){c.appendChild(el('div','exb','<span class="et">쉬운 예</span>'+q.x[0]+(q.x[1]?'<span class="k">'+q.x[1]+'</span>':'')))}
  if(!q.r&&q.x2)q.x2.forEach(function(pr){c.appendChild(el('div','exb','<span class="et">쉬운 예</span>'+pr[0]+(pr[1]?'<span class="k">'+pr[1]+'</span>':'')))});
  app.appendChild(c);
 });
 app.appendChild(foot());
}


/* teacher exam (선생님 TEST) */
function pageExam(app){
 var K_SET='midex:set',K_CUR='midex:cur',K_USED='midex:used';
 function lg(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
 function ls(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
 function ld(k){try{localStorage.removeItem(k)}catch(e){}}
 function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
 var COUNTS=[5,7,15],built=[];
 for(var r=1;r<=CFG.rounds;r++)built.push(r);
 var S=lg(K_SET)||{};S.r=S.r||[];S.t=S.t||TY.map(function(t){return t.k});S.n=S.n||7;
 var EX=null;
 function head(){return '<h1>'+CFG.school+' TEST</h1><p class="lede">선생님 확인용 · 유형 풀코스 문제에서 섞어 출제</p>'}
 function chip(on,act,attr,txt){return '<button type="button" class="ch2'+(on?' pk':'')+'" data-act="'+act+'" '+attr+'>'+txt+'</button>'}
 function setup(){
  var h='<a href="https://nolbada.github.io/via-high/h/exit/" style="display:inline-block;margin:2px 0 6px;padding:9px 16px;border:1.5px solid var(--pri);border-radius:999px;background:var(--card);color:var(--pri);font-size:15px;font-weight:800;text-decoration:none">← TEST 링크 모음</a>'+head()+'<div class="exs"><div class="sh">범위 (회차)</div><div class="chips">';
  var allR=built.every(function(r){return S.r.indexOf(r)>=0});
  h+=chip(allR,'rall','','전체');
  if(!document.getElementById('rgcss')){var rs=document.createElement('style');rs.id='rgcss';rs.textContent='.rgh{margin:14px 0 6px}.rgb{border:0;background:transparent;color:var(--sub);font:inherit;font-weight:800;font-size:14px;padding:2px 2px}.rgb.pk{color:var(--pri)}.rgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.rgrid .ch2{width:100%;padding:10px 0;text-align:center;border-radius:12px}';document.head.appendChild(rs)}
  var gs=[];built.forEach(function(r){var lb=unitLabel(r);if(/최종점검/.test(lb))lb='최종점검';var g=gs[gs.length-1];if(!g||g.l!==lb){g={l:lb,r:[]};gs.push(g)}g.r.push(r)});
  h+='</div>';
  gs.forEach(function(g){var on=g.r.every(function(x){return S.r.indexOf(x)>=0});h+='<div class="rgh"><button type="button" class="rgb'+(on?' pk':'')+'" data-act="rg" data-v="'+g.r.join(',')+'">'+g.l+'</button></div><div class="rgrid">';g.r.forEach(function(r){h+=chip(S.r.indexOf(r)>=0,'r','data-v="'+r+'"',r+'회')});h+='</div>'});
  h+='<div>';
  h+='</div><div class="sh">유형</div><div class="chips">';
  var allT=TY.every(function(t){return S.t.indexOf(t.k)>=0});
  h+=chip(allT,'tall','','전체');
  TY.forEach(function(t){h+=chip(S.t.indexOf(t.k)>=0,'t','data-v="'+t.k+'"',t.n)});
  h+='</div><div class="sh">문항 수</div><div class="chips">';
  COUNTS.forEach(function(n){h+=chip(S.n===n,'n','data-v="'+n+'"',n+'문항')});
  var pool=poolOf();
  h+='</div><button type="button" class="go" data-act="start"'+(pool.length?'':' disabled')+'>시험 시작</button>';
  h+='<p class="mut">'+(pool.length?'출제 가능한 문제 '+pool.length+'개':'회차와 유형을 하나 이상 고르세요')+'</p></div>';
  var cur=lg(K_CUR);
  if(cur&&cur.q&&!cur.done)h+='<div class="resume">진행 중이던 시험이 있어요 ('+cur.q.length+'문항)<button type="button" class="go2" data-act="resume">이어서 풀기</button></div>';
  h+='<div class="foot">비타민 영어클리닉 · '+CFG.school+'</div>';
  app.innerHTML=h;
 }
 function poolOf(){var o=[];S.r.forEach(function(r){TY.forEach(function(t){if(S.t.indexOf(t.k)<0)return;((D.R[r]||{})[t.k]||[]).forEach(function(id){if(Q[id])o.push({id:id,r:r,t:t.k})})})});return o}
 function pick(){
  var used=lg(K_USED)||{},pool=poolOf(),by={};
  pool.forEach(function(c){(by[c.t]=by[c.t]||[]).push(c)});
  Object.keys(by).forEach(function(t){var f=shuffle(by[t].filter(function(c){return !used[c.id]})),o=shuffle(by[t].filter(function(c){return used[c.id]}));by[t]=f.concat(o)});
  var types=shuffle(Object.keys(by)),out=[],i=0;
  while(out.length<S.n&&types.some(function(t){return by[t].length})){var t=types[i%types.length];i++;if(by[t].length)out.push(by[t].shift())}
  out.forEach(function(c){used[c.id]=1});ls(K_USED,used);
  return shuffle(out);
 }
 function init(q){return q.k==='bk'?q.n.map(function(){return -1}):q.k==='ms'?[]:q.k==='tf'?null:-1}
 function ansd(q,st){if(q.k==='bk')return st.every(function(v){return v>=0});if(q.k==='ms')return st.length>0;if(q.k==='tf')return st!==null;return st>=0}
 function ok(q,st){if(q.k==='bk')return q.n.every(function(a,i){return st[i]===a});if(q.k==='ms')return sameSet(st,q.n);return st===q.n}
 function nAns(){var n=0;EX.q.forEach(function(c,i){if(ansd(Q[c.id],EX.a[i]))n++});return n}
 function card(i){
  var c=EX.q[i],q=Q[c.id],st=EX.a[i];
  var h='<div class="th"><span class="tn">'+(i+1)+'</span><div class="ask">'+q.a+'</div></div>';
  if(q.g)h+='<div class="gv"><span>주어진 문장</span>'+q.g+'</div>';
  if(q.k==='bk'){
   h+='<div class="ps">'+q.p.replace(/\[\[(\d+)\]\]/g,function(m,b){b=+b;var s='<span class="bk"><i>(</i>';q.b[b].forEach(function(op,j){if(j)s+='<i>/</i>';s+='<button type="button" class="'+(st[b]===j?'sel':'')+'" data-b="'+b+'" data-o="'+j+'">'+op+'</button>'});return s+'<i>)</i></span>'})+'</div>';
  }else{
   if(q.p)h+='<div class="ps">'+q.p+'</div>';
   var lb=isLab(q);
   if(q.k==='tf')h+='<div class="ch row">'+[[true,'T (일치)'],[false,'F (불일치)']].map(function(a){return '<button type="button" class="'+(st===a[0]?'sel':'')+'" data-v="'+a[0]+'">'+a[1]+'</button>'}).join('')+'</div>';
   else h+='<div class="ch'+(lb?' lab':'')+'">'+q.c.map(function(t,j){var on=q.k==='ms'?st.indexOf(j)>=0:st===j;return '<button type="button" class="'+(on?'sel':'')+'" data-v="'+j+'">'+(lb?'':'<i>'+LAB[j]+'</i>')+'<span>'+t+'</span></button>'}).join('')+'</div>';
  }
  document.getElementById('q'+i).innerHTML=h;
 }
 function save(){ls(K_CUR,EX)}
 function upd(){var n=nAns(),c=document.getElementById('cnt');if(c)c.innerHTML='답한 문제 <b>'+n+'</b> / '+EX.q.length;[].forEach.call(app.querySelectorAll('[data-act=submit]'),function(b){b.textContent=EX.confirm?'안 푼 문제 '+(EX.q.length-n)+'개 · 그래도 제출':'제출하기'})}
 function test(){
  var h=head()+'<div class="exbar"><span id="cnt"></span><button type="button" class="sub" data-act="submit">제출하기</button></div>';
  EX.q.forEach(function(c,i){h+='<section class="tq" id="q'+i+'"></section>'});
  h+='<button type="button" class="go" data-act="submit">제출하기</button>';
  app.innerHTML=h;EX.q.forEach(function(c,i){card(i)});upd();
 }
 function result(){
  var N=EX.q.length,wrong=[],sc=0;
  EX.q.forEach(function(c,i){if(ok(Q[c.id],EX.a[i]))sc++;else wrong.push(i)});
  var need=Math.ceil(N*0.8),pass=sc>=need,d=new Date(EX.done),p2=function(n){return(n<10?'0':'')+n};
  var h=head()+'<div class="exr '+(pass?'pass':'fail')+'"><div class="vd">'+(pass?'합격':'불합격')+'</div><div class="sc"><b>'+sc+'</b> / '+N+'</div><div class="meta">합격 기준 '+need+'문항 이상 · '+(d.getMonth()+1)+'/'+d.getDate()+'('+WD[d.getDay()]+') '+p2(d.getHours())+':'+p2(d.getMinutes())+'</div></div>';
  if(wrong.length){
   h+='<div class="sh">틀린 문제 '+wrong.length+'개</div>';
   wrong.forEach(function(i){var c=EX.q[i],q=Q[c.id];
    h+='<div class="wq"><div class="wh"><span class="tn">'+(i+1)+'</span><span class="tg">'+TN[c.t]+'</span><span class="tg">'+c.r+'회</span></div><div class="wa">정답 '+ansText(q)+'</div><a class="wl" href="'+ansHref(c.id)+'">해설 보기</a></div>'});
  }else h+='<p class="lede" style="text-align:center">전부 맞았어요.</p>';
  h+='<button type="button" class="go" data-act="again">새 시험</button><a href="https://nolbada.github.io/via-high/h/exit/" style="display:block;box-sizing:border-box;width:100%;margin:12px 0 0;padding:14px;border:1.5px solid var(--pri);border-radius:12px;background:var(--card);color:var(--pri);font-size:16px;font-weight:800;text-align:center;text-decoration:none">메인으로 (TEST 링크 모음)</a><div class="foot">비타민 영어클리닉 · '+CFG.school+'</div>';
  app.innerHTML=h;window.scrollTo(0,0);
 }
 function tog(arr,v){var i=arr.indexOf(v);if(i>=0)arr.splice(i,1);else arr.push(v)}
 app.addEventListener('click',function(e){
  var t=e.target.closest('button');if(!t)return;
  var a=t.getAttribute('data-act');
  if(!EX||EX.done){
   if(!a)return;
   var v=t.getAttribute('data-v');
   if(a==='r'){tog(S.r,+v);S.r.sort(function(x,y){return x-y})}
   else if(a==='rg'){var ids=v.split(',').map(Number),allOn=ids.every(function(x){return S.r.indexOf(x)>=0});ids.forEach(function(x){var i=S.r.indexOf(x);if(allOn){if(i>=0)S.r.splice(i,1)}else if(i<0)S.r.push(x)});S.r.sort(function(x,y){return x-y})}
   else if(a==='rall'){S.r=built.every(function(r){return S.r.indexOf(r)>=0})?[]:built.slice()}
   else if(a==='t'){tog(S.t,v)}
   else if(a==='tall'){S.t=TY.every(function(x){return S.t.indexOf(x.k)>=0})?[]:TY.map(function(x){return x.k})}
   else if(a==='n'){S.n=+v}
   else if(a==='start'){var q=pick();if(!q.length)return;ls(K_SET,S);EX={q:q,a:q.map(function(c){return init(Q[c.id])}),n:S.n,done:0,confirm:0};save();test();window.scrollTo(0,0);return}
   else if(a==='resume'){var c=lg(K_CUR);if(c&&c.q&&!c.done){EX=c;test()}return}
   else if(a==='again'){EX=null;ld(K_CUR)}
   else return;
   ls(K_SET,S);setup();return;
  }
  if(a==='submit'){if(nAns()<EX.q.length&&!EX.confirm){EX.confirm=1;upd();return}EX.done=Date.now();EX.confirm=0;save();result();return}
  var cardEl=t.closest('.tq');if(!cardEl)return;
  var i=+cardEl.id.slice(1),q=Q[EX.q[i].id];EX.confirm=0;
  if(q.k==='bk'){EX.a[i][+t.dataset.b]=+t.dataset.o}
  else if(q.k==='tf'){EX.a[i]=t.dataset.v==='true'}
  else if(q.k==='ms'){tog(EX.a[i],+t.dataset.v)}
  else EX.a[i]=+t.dataset.v;
  card(i);upd();save();
 });
 var cur=lg(K_CUR);if(cur&&cur.done)ld(K_CUR);
 setup();
}

var pg=document.body.getAttribute('data-page'),app=document.getElementById('app');
/* time on screen: q=problems, w=wrong-note review, h=other; counted only while visible and active */
var TMB={test:'q',mix:'q',vocabx:'q',exam:'q',wrong:'w'};
function devId(){var v='x';try{v=localStorage.getItem('midq:dev');if(!v){v=Math.random().toString(36).slice(2,6);localStorage.setItem('midq:dev',v)}}catch(e){}return v}
function tmKey(b){return 'tm:'+ymd(new Date())+':'+devId()+':'+b}
(function(){var b=TMB[pg]||'h',acc=0,last=Date.now(),act=Date.now();
 function bump(){act=Date.now()}['touchstart','click','scroll','keydown','pointerdown'].forEach(function(e){addEventListener(e,bump,{passive:true,capture:true})});
 function flush(){if(!acc)return;var k=tmKey(b);ss(k,String((+sg(k)||0)+acc));acc=0}
 setInterval(function(){var n=Date.now();if(document.visibilityState==='visible'&&n-act<60000&&n-last<5000)acc+=Math.round((n-last)/1000);last=n;if(acc>=5)flush()},1000);
 document.addEventListener('visibilitychange',function(){if(document.visibilityState!=='visible')flush();else{last=Date.now();act=Date.now()}});
 addEventListener('pagehide',flush)})();

({index:pageIndex,test:pageTest,wrong:pageWrong,vocabx:pageVx,answer:pageAnswer,mix:pageMix,exam:pageExam})[pg](app);
if(location.hash){var h=document.getElementById(location.hash.slice(1));if(h)h.scrollIntoView()}
})();
