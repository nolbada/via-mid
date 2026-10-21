(function(){
'use strict';
var CFG=window.CFG,D=window.D,Q=D.Q,PFX=CFG.pfx,TY=CFG.types,TN={};
TY.forEach(function(t){TN[t.k]=t.n});
var LAB=['①','②','③','④','⑤','⑥','⑦'];
var mem={};
function sg(k){var v=null;try{v=localStorage.getItem(PFX+k)}catch(e){}if(v==null&&mem[k]!=null)v=mem[k];return v}
function ss(k,v){mem[k]=v;try{localStorage.setItem(PFX+k,v)}catch(e){}}
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
function doneR(r){return TY.every(function(t){return !(D.R[r][t.k]||[]).length||doneT(r,t.k)})}
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

function foot(){return el('div','foot','비타민 영어클리닉 · 용아중2')}
function wrongCount(){return listGet('w').length}

/* hub */
var WD=['일','월','화','수','목','금','토'];
function unitOf(r){var u=null;CFG.units.forEach(function(x){if(r>=x.from&&r<=x.to)u=x.u});return u}
function fmtMD(d,wd){return(d.getMonth()+1)+'/'+d.getDate()+(wd?'('+WD[d.getDay()]+')':'')}
function mondayOf(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function addDays(d,n){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()+n);return x}
function svgChev(){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'}
function pageIndex(app){
 app.classList.add('hubw');
 var now=new Date(),today=new Date(now.getFullYear(),now.getMonth(),now.getDate()),todayS=ymd(today);
 var exS=pYmd(CFG.exam.start),exE=pYmd(CFG.exam.end),exStr={};
 for(var d=new Date(exS);d<=exE;d=addDays(d,1))exStr[ymd(d)]=1;
 var dd=Math.round((exS-today)/86400000),dtxt=dd>0?'D-'+dd:(dd===0?'D-day':'D+'+(-dd));
 var recs=records(),byDate={};recs.forEach(function(e){byDate[e.d]=(byDate[e.d]||0)+1});
 var M=0;for(var r=1;r<=CFG.rounds;r++)if(doneR(r))M++;
 var PLAN=22;var N=PLAN;

 /* 1. badge card */
 var bc=el('details','bc');
 var sm=el('summary',null,'<div class="bdg"><b>'+CFG.school+'</b><span>기말 '+fmtMD(exS,1)+'</span><strong>'+dtxt+'</strong></div><div class="bq"><div class="bqt">'+CFG.quote+'</div></div><span class="cv">'+svgChev()+'</span>');
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
 var lo=el('a','lc or','<div><b>오답 노트</b><small>1차 오답은 자동 저장, 2차 오답은 별표(★) 표시</small></div><span>열기</span>');lo.href='wrong.html';app.appendChild(lo);
 var lb=el('a','lc bl','<div><b>랜덤 문제 풀기</b><small>범위와 유형을 골라서 풀어요</small></div><span>시작</span>');lb.href='mix.html';app.appendChild(lb);

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

 /* 7. below the calendar: 유형 풀코스 */
 var g=el('div','grid');
 /* one 회차 at a time (calendar-like): opens on the first unfinished one; arrows go back to finished ones, forward stops at the unfinished one */
 var curR=PLAN;for(var q2=1;q2<=PLAN;q2++){if(q2>CFG.rounds||!doneR(q2)){curR=q2;break}}
 var viewR=curR;try{var sv=+localStorage.getItem('mid7:view');if(sv>=1&&sv<=curR)viewR=sv}catch(e){}
 function drawRound(){
  g.innerHTML='';
  var r2=viewR;
  var built=r2<=CFG.rounds,card=el('div','rc'+(built&&doneR(r2)?' all':''));
  card.appendChild(el('div','rh rhn','<button type="button" class="ar" data-d="-1" aria-label="이전 회차"'+(r2<=1?' disabled':'')+'>&lsaquo;</button><div class="rht"><h3>유형 풀코스 '+r2+'회'+(built&&doneR(r2)?'<span class="tg t">완료</span>':'')+'</h3><small class="rng">'+(built?unitOf(r2)+'과':(r2<=20?'8과':(r2===21?'7과 최종점검':'8과 최종점검')))+'</small></div><button type="button" class="ar" data-d="1" aria-label="다음 회차"'+(r2>=curR?' disabled':'')+'>&rsaquo;</button>'));
  var k2=0;
      if(!built){card.appendChild(el('div','empty','준비 중'))}
  CFG.types.forEach(function(t){var n=((D.R[r2]||{})[t.k]||[]).length;if(!n)return;k2++;
   var dn=doneT(r2,t.k);
   card.appendChild(el('div','arow','<b>'+k2+'. '+t.n+'<span class="cn">'+n+'문제</span></b><i class="vr o">1회성</i><a class="cell'+(dn?' on':'')+'" href="test.html?r='+r2+'&t='+t.k+'">'+(dn?'했어요':'풀기')+'</a>'));
  });
  [].forEach.call(card.querySelectorAll('.ar'),function(bt){bt.onclick=function(){if(bt.disabled)return;viewR=Math.max(1,Math.min(curR,viewR+(+bt.dataset.d)));try{localStorage.setItem('mid7:view',viewR)}catch(e){}drawRound()}});
  g.appendChild(card);
 }
 drawRound();
 app.appendChild(g);
 if(D.VX.length){
  app.appendChild(el('h2',null,'어휘 확장 (선택)'));
  var e3=el('div','ent');var a3=el('a',null,'어휘 확장<small>선택 코너</small>');a3.href='vocabx.html';e3.appendChild(a3);app.appendChild(e3);
 }
 app.appendChild(foot());
 /* fixed tabs */
 var tabs=el('nav','tabs');
 var t1=el('a',null,'원문');t1.href=(CFG.tabs&&CFG.tabs.won)||'#';
 var t2=el('a',null,'답안지');t2.href=(CFG.tabs&&CFG.tabs.ans)||'#';
 var t3=el('a','on','유형 풀코스');t3.href='index.html';
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
function pageTest(app){
 var p=qs(),r=+p.r,t=p.t,ids=(D.R[r]||{})[t];
 if(!ids||!ids.length){app.appendChild(el('div','empty','문제를 찾을 수 없습니다.'));var b=el('a','pill','처음 화면');b.href='index.html';app.appendChild(b);return}
 var st=jg('st:'+r+':'+t,{});
 var bar=el('div','bar');var home=el('a','pill','‹ 처음');home.href='index.html';bar.appendChild(home);
 TY.forEach(function(x){if(!(D.R[r][x.k]||[]).length)return;var a=el('a','pill'+(x.k===t?' on':(doneT(r,x.k)?' dn':'')),x.n);a.href='test.html?r='+r+'&t='+x.k;bar.appendChild(a)});
 app.appendChild(bar);
 app.appendChild(el('h1',null,r+'회차 · '+TN[t]));
 app.appendChild(el('p','sub',unitOf(r)+'과 · '+ids.length+'문항'));
 var cnt=0,wr=0,sum=el('div','sum');sum.style.display='none';
 function check(){
  if(cnt<ids.length)return;
  markDone(r,t);
  var w=ids.filter(function(id){return st[id]&&!st[id][1]}).length;
  var nx=nextLoc(r,t);
  sum.innerHTML='<p>'+TN[t]+' 마침 · 틀린 문제 '+w+'개</p><div class="lk">'+(w?'<a href="answer.html?r='+r+'&t='+t+'">해설 보기</a>':'')+'<a class="pr" href="'+nx.h+'">'+nx.l+'</a></div>';
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
  if(q.e&&q.e.length){c.appendChild(el('span','lbl','해설'));q.e.forEach(function(l){c.appendChild(el('div','ln',l))})}
  if(q.x&&q.x.length){c.appendChild(el('div','exb','<span class="et">쉬운 예</span>'+q.x[0]+(q.x[1]?'<span class="k">'+q.x[1]+'</span>':'')))}
  if(q.x2)q.x2.forEach(function(pr){c.appendChild(el('div','exb','<span class="et">쉬운 예</span>'+pr[0]+(pr[1]?'<span class="k">'+pr[1]+'</span>':'')))});
  app.appendChild(c);
 });
 app.appendChild(foot());
}

var pg=document.body.getAttribute('data-page'),app=document.getElementById('app');
({index:pageIndex,test:pageTest,wrong:pageWrong,vocabx:pageVx,answer:pageAnswer,mix:pageMix})[pg](app);
if(location.hash){var h=document.getElementById(location.hash.slice(1));if(h)h.scrollIntoView()}
})();
