/* 원문 탭: 목록(won) / 좌본문 우해석(jwa) / 문법 설명(gram) */
(function(){
var APP=window.APP,UN=(new URLSearchParams(location.search).get('u')||String(APP.lessons[0].u)),T=window['TX'+UN],pg=document.body.getAttribute('data-page'),app=document.getElementById('app');app.classList.add('xp');
function el(tag,cls,h){var e=document.createElement(tag);if(cls)e.className=cls;if(h!=null)e.innerHTML=h;return e}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function tabs(){}
function foot(){return el('div','foot','비타민 영어클리닉 · '+APP.school)}
function back(href,label){var d=el('div','top');var a=el('a','pill','‹ '+(label||'목록'));a.href=href||'won.html';d.appendChild(a);return d}
function secRange(s){return s.sents[0].n+'~'+s.sents[s.sents.length-1].n+'번'}

/* ---------- 목록 ---------- */
function pageWon(){
 app.appendChild(el('h1',null,APP.school+' 원문'));
 APP.lessons.forEach(function(L,i){
  var rc=el('div','rc');if(i)rc.style.marginTop='10px';
  rc.appendChild(el('div','rh','<h3>교과서 '+L.u+'과</h3><small class="rng">'+esc(APP.pub)+' · 본문 '+L.n+'개</small>'));
  [['좌본문 우해석','jwa.html?u='+L.u],['문법 설명','gram.html?u='+L.u]].forEach(function(x){
   var r=el('div','arow','<b>'+x[0]+'</b>');var a=el('a','cell','열기');a.href=x[1];r.appendChild(a);rc.appendChild(r)});
  app.appendChild(rc)});
 app.appendChild(foot())}

/* ---------- 좌본문 우해석 ---------- */
function pageJwa(){
 var cur=0,hide=false;
 try{var q=new URLSearchParams(location.search).get('s');if(q>=1&&q<=T.secs.length)cur=q-1}catch(e){}
 app.appendChild(back('won.html'));
 app.appendChild(el('h1',null,UN+'과 좌본문 우해석'));
 var chips=el('div','xchips'),tog=el('div','xtog'),list=el('div','xlist');
 app.appendChild(chips);app.appendChild(el('div','sub',''));app.appendChild(tog);app.appendChild(list);
 app.appendChild(foot());tabs();
 function draw(){
  var s=T.secs[cur];
  chips.innerHTML=T.secs.map(function(x,i){return '<button type="button" data-s="'+i+'" class="'+(i===cur?'on':'')+'">본문 '+x.sym+'</button>'}).join('');
  app.querySelector('.sub').innerHTML=esc(s.ko)+' · '+secRange(s);
  tog.innerHTML='<button type="button" data-h="0" class="'+(hide?'':'on')+'">해석 보이기</button><button type="button" data-h="1" class="'+(hide?'on':'')+'">해석 가리기</button>';
  list.className='xlist'+(hide?' hide':'');
  list.innerHTML=s.sents.map(function(x){return '<div class="xc"><div class="xno">'+x.n+'</div>'+x.rows.map(function(r){return '<div class="xpair"><div class="xen">'+esc(r[0])+'</div><div class="xko">'+esc(r[1])+'</div></div>'}).join('')+'<div class="xnat">'+esc(x.nat)+'</div></div>'}).join('')}
 app.addEventListener('click',function(e){
  var b=e.target.closest('button');
  if(b&&b.dataset.s!=null){cur=+b.dataset.s;draw();window.scrollTo(0,0);return}
  if(b&&b.dataset.h!=null){hide=b.dataset.h==='1';draw();return}
  if(hide){
   var p=e.target.closest('.xpair');if(p){p.querySelector('.xko').classList.toggle('show');return}
   var n=e.target.closest('.xnat');if(n){n.classList.toggle('show');return}}
 });
 draw()}

/* ---------- 문법 설명 ---------- */
function cc(sec,i){return T.cat[sec.items[i-1].c]}
function mark(t,sec,only,sn){
 var out='',pos=0,re=/\[(\d+)\|([^\]]*)\]/g,m;
 while((m=re.exec(t))){out+=esc(t.slice(pos,m.index));var c=cc(sec,m[1]),k=sec.items[m[1]-1].c;
  if(only){ if(k==only)out+='<span style="background:'+c.l+';border-bottom:2px solid '+c.d+';border-radius:3px;padding:0 2px;color:#17202e">'+esc(m[2])+'</span>';else out+=esc(m[2]) }
  else out+='<span class="hlk" data-i="'+m[1]+'" data-n="'+sn+'" style="background:'+c.l+';border-bottom:2px solid '+c.d+';border-radius:3px;padding:0 2px;color:#17202e;cursor:pointer">'+esc(m[2])+'</span>';
  pos=re.lastIndex}
 return out+esc(t.slice(pos))}
function noteBox(n){return '<div class="xnote"><div class="nl">노트에 이렇게 적어요</div>'+n.map(function(l){return '<div class="ln">'+esc(l)+'</div>'}).join('')+'</div>'}
function drillBar(cur){return '<div class="xdr">'+['g','b','k','o'].map(function(k){var c=T.cat[k];return '<button type="button" data-dr="'+k+'" style="border-color:'+c.d+';background:'+(cur==k?c.d:c.l)+';color:'+(cur==k?'#fff':'#17202e')+'">'+esc(c.s)+'</button>'}).join('')+'</div>'}

function pageGram(){
 var cur=0,drill=null,backN=null,backI=null;
 try{var q=new URLSearchParams(location.search).get('s');if(q>=1&&q<=T.secs.length)cur=q-1}catch(e){}
 app.appendChild(back('won.html'));
 var box=el('div');app.appendChild(box);app.appendChild(foot());tabs();
 function firstSent(i){var s=T.secs[cur];for(var k=0;k<s.sents.length;k++){if(new RegExp('\\['+i+'\\|').test(s.sents[k].mk))return s.sents[k].n}return s.sents[0].n}
 function goTo(e){if(!e)return;e.scrollIntoView({behavior:'smooth',block:'center'});e.classList.remove('flash');void e.offsetWidth;e.classList.add('flash')}
 function vMain(){
  var s=T.secs[cur],h='<h1>'+UN+'과 문법 설명</h1>';
  h+='<div class="xchips">'+T.secs.map(function(x,i){return '<button type="button" data-s="'+i+'" class="'+(i===cur?'on':'')+'">본문 '+x.sym+'</button>'}).join('')+'</div>';
  h+='<div class="sub">'+esc(s.ko)+' · '+secRange(s)+'</div>';
  h+='<div class="xlab">형광펜별 모아보기</div>'+drillBar('');
  h+='<div class="xc">'+s.sents.map(function(x){return '<div class="xps" id="ps-'+x.n+'"><i>'+x.n+'</i><span>'+mark(x.mk,s,null,x.n)+'</span></div>'}).join('')+'</div>';
  h+=s.items.map(function(it,i){var c=T.cat[it.c];return '<div class="xit" id="it-'+(i+1)+'" style="background:'+c.l+'88;border:1.5px solid '+c.d+'"><h4><span class="xph" style="background:'+c.l+';border-bottom:2px solid '+c.d+'">'+esc(it.p)+'</span><span class="xtg" style="background:'+c.d+'">'+esc(c.s)+'</span></h4><div class="xans" style="color:'+c.d+'">'+esc(it.a)+'</div>'+noteBox(it.n)+'<p>'+esc(it.x)+'</p><button type="button" class="xbk" data-back="'+(i+1)+'" style="border-color:'+c.d+';color:'+c.d+'">↑ 본문으로 돌아가기</button></div>'}).join('');
  return h}
 function vDrill(){
  var k=drill,c=T.cat[k];
  var h='<div class="top"><button type="button" class="pill" data-dr="'+k+'">‹ 문법 설명</button></div><h1>'+esc(c.s)+' 모아보기</h1>'+drillBar(k)+'<div class="xrow"><button type="button" class="xbtn" id="dclose">설명 다시 가리기</button></div>';
  T.secs.forEach(function(s){
   var cards=s.sents.filter(function(x){var re=/\[(\d+)\|/g,m,f=false;while((m=re.exec(x.mk)))if(s.items[m[1]-1].c==k)f=true;return f});
   if(!cards.length)return;
   h+='<div class="xlab">본문 '+s.sym+'</div>';
   cards.forEach(function(x){
    var seen={},rows='',re=/\[(\d+)\|/g,m;
    while((m=re.exec(x.mk))){var ix=+m[1];if(s.items[ix-1].c==k&&!seen[ix]){seen[ix]=1;var it=s.items[ix-1];
     rows+='<div class="rv"><div class="xq" style="border-color:'+c.d+'"><span style="background:'+c.l+';border-bottom:2px solid '+c.d+';border-radius:3px;padding:0 3px;font-weight:700;color:#17202e">'+esc(it.p)+'</span><div class="xqq">'+esc(it.q)+'</div></div><div class="xa" style="background:'+c.l+'88;border-color:'+c.d+'"><div class="xans" style="color:'+c.d+'">'+esc(it.a)+'</div>'+noteBox(it.n)+'<div class="xex">'+esc(it.x)+'</div></div></div>'}}
    h+='<div class="xc"><div class="xno">'+x.n+'</div><div class="xps" style="border:0;padding:0"><span>'+mark(x.mk,s,k)+'</span></div><div class="sub" style="margin:4px 0 6px">'+esc(x.nat)+'</div>'+rows+'</div>'});
  });
  return h}
 function draw(){box.innerHTML=drill?vDrill():vMain();window.scrollTo(0,0)}
 app.addEventListener('click',function(e){
  var hk=e.target.closest('.hlk');if(hk){backN=hk.dataset.n;backI=hk.dataset.i;goTo(document.getElementById('it-'+hk.dataset.i));return}
  var bk=e.target.closest('.xbk');if(bk){var i=bk.dataset.back,n=(backI==i&&backN)?backN:firstSent(i);goTo(document.getElementById('ps-'+n));return}
  var rv=e.target.closest('.rv');if(rv){rv.classList.toggle('open');return}
  var b=e.target.closest('button');if(!b)return;
  if(b.id==='dclose'){var o=document.querySelectorAll('.rv.open');for(var j=0;j<o.length;j++)o[j].classList.remove('open');return}
  if(b.dataset.dr){drill=drill===b.dataset.dr?null:b.dataset.dr;draw();return}
  if(b.dataset.s!=null){cur=+b.dataset.s;draw()}
 });
 draw()}

({won:pageWon,jwa:pageJwa,gram:pageGram})[pg]();
})();
