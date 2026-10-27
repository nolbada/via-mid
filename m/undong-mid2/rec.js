/* REC 중등: 학생 기록을 기기 간에 잇는 스크립트(고등 rec.js의 중등판). 이름+6900.
   고등과 같은 구글 시트 서버를 쓰되 id가 RECM 으로 시작해 고등(REC)·허브 기록과 섞이지 않는다.
   저장 키(recm_*)와 연동 대상 키(mid7:*)도 고등과 겹치지 않는다. 공폰 모드(?shared=1)에서는 아무것도 하지 않는다. */
(function(){
  var W=window,D=document,P=location.pathname;
  var m=/\/via-mid\/m\/(yonga-mid2|geumcheon-mid2|yongseong-mid2|undong-mid2)\//.exec(P);
  if(!m||W.__recm)return;
  W.__recm=1;
  try{if(sessionStorage.getItem(PFX+'shared')==='1'||/[?&]shared=1/.test(location.search))return}catch(e){}
  var URL_=W.REC_URL||'https://script.google.com/macros/s/AKfycbw1YQfKsgAXNk8NYoxOfz4bsCSy66fiim7HoFAUk162ksxrEbmspMs2UifNZ-93sdf05A/exec';
  var SCH=m[1],NUM='6900',PFX=({'yonga-mid2':'mid7:','geumcheon-mid2':'gcm2:','yongseong-mid2':'ysm2:','undong-mid2':'udm2:'})[SCH],SFX=(SCH==='yonga-mid2'?'':'_'+SCH);
  var UK='recm_uid'+SFX,MK='recm_meta'+SFX,NK='recm_name'+SFX,AK='recm_at'+SFX,MAXV=45000;
  var LS=null;try{LS=W.localStorage;LS.getItem('x')}catch(e){return}
  function g(k){try{return LS.getItem(k)}catch(e){return null}}
  function s(k,v){try{LS.setItem(k,v)}catch(e){}}
  function d(k){try{LS.removeItem(k)}catch(e){}}
  function jg(k){try{return JSON.parse(g(k)||'null')}catch(e){return null}}
  function mirrored(k){
    if(!k||typeof k!=='string')return false;
    if(k.indexOf(PFX)!==0)return false;
    if(k===PFX+'shared'||k===PFX+'view')return false;
    return true;
  }
  function keys(){var o=[],i,k;for(i=0;i<LS.length;i++){k=LS.key(i);if(mirrored(k))o.push(k)}return o}
  function ident(){
    var n=(g(NK)||'').replace(/\s+/g,'');return n?'RECM|'+SCH+'|'+n+'|'+NUM:'';
  }
  function dm(a,b){
    if(a===b)return a;
    var ta=typeof a,tb=typeof b,o,k;
    if(ta==='number'&&tb==='number')return Math.max(a,b);
    if(ta==='boolean'&&tb==='boolean')return a||b;
    if(Array.isArray(a)&&Array.isArray(b)){var seen={};o=[];a.concat(b).forEach(function(x){var t=JSON.stringify(x);if(!seen[t]){seen[t]=1;o.push(x)}});return o}
    if(a&&b&&ta==='object'&&tb==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
      o={};for(k in a)o[k]=(k in b)?dm(a[k],b[k]):a[k];for(k in b)if(!(k in a))o[k]=b[k];return o}
    return b;
  }
  function merge(loc,rem){try{return JSON.stringify(dm(JSON.parse(loc),JSON.parse(rem)))}catch(e){return rem}}
  /* 서버가 "명단에 없는 이름"이라고 하면 이 기기의 이름 등록을 풀어 잠금 화면으로 돌린다 */
  function deny(){if(!g(NK))return;d(NK);d(UK);d(MK);reloadOnce()}
  function post(body,keep){
    return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body),keepalive:!!keep})
      .then(function(r){return r.json()}).then(function(r){if(!r||!r.ok){var e=new Error('rec');e.code=r&&r.err;if(e.code==='noname')deny();throw e}return r});
  }
  /* 이름 등록 전 확인(기존 등록을 건드리지 않는다) */
  function chk(id){
    return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({act:'put',id:id,data:{}})})
      .then(function(r){return r.json()}).then(function(r){if(!r)throw new Error('rec');return r});
  }
  function unwrap(v){return(v&&typeof v==='object'&&typeof v.s==='string')?v.s:null}
  var busy=false,again=false;
  function pending(skip){
    var meta=jg(MK)||{},ch={},sent={};
    keys().forEach(function(k){
      var v=g(k);if(v===null||v.length>MAXV||(skip&&skip[k]))return;
      if(meta[k]!==v){ch[k]={v:{s:v},t:Date.now()};sent[k]=v}
    });
    return {ch:ch,sent:sent,n:Object.keys(sent).length};
  }
  function push(id,keep,skip){
    var c=pending(skip);if(!c.n)return Promise.resolve(false);
    return post({act:'put',id:id,data:c.ch},keep).then(function(){
      var meta=jg(MK)||{},k;for(k in c.sent)meta[k]=c.sent[k];s(MK,JSON.stringify(meta));return true});
  }
  function sync(id,apply){
    if(busy){again=true;return Promise.resolve(false)}busy=true;
    return post({act:'put',id:id,data:{}}).then(function(r){
      var rem=r.data||{},meta=jg(MK)||{},rl=false,skip={},k;
      for(k in rem){
        if(!mirrored(k))continue;
        var rs=unwrap(rem[k].v);if(rs===null)continue;
        var lv=g(k);
        if(lv===rs){meta[k]=rs;continue}
        if(lv===null){if(apply){s(k,rs);meta[k]=rs;rl=true}continue}
        var lchg=meta[k]!==lv;
        if(!lchg){if(apply){s(k,rs);meta[k]=rs;rl=true}}
        else if(meta[k]!==rs){
          s(k,merge(lv,rs));rl=true;
        }
      }
      s(MK,JSON.stringify(meta));s(AK,String(Date.now()));
      return push(id,false,skip).then(function(){busy=false;if(again){again=false;sched()}return rl},function(){busy=false;return rl});
    },function(e){busy=false;throw e});
  }
  function wipe(){keys().forEach(d);d(MK)}
  function reloadOnce(){
    try{var t=Number(sessionStorage.getItem('recm_rl'+SFX)||0);if(Date.now()-t>20000){sessionStorage.setItem('recm_rl'+SFX,String(Date.now()));location.reload()}}catch(e){}
  }
  var timer=null;
  function sched(){
    if(timer)return;
    timer=setTimeout(function(){timer=null;var id=ident();if(id&&id===g(UK))sync(id,false).then(function(rl){if(rl)reloadOnce()}).catch(function(){})},4000);
  }
  try{
    var sp=W.Storage.prototype,os=sp.setItem;
    sp.setItem=function(k){os.apply(this,arguments);if(this===LS&&mirrored(k))sched()};
  }catch(e){}
  function start(){
    var id=ident();if(!id)return;
    var prev=g(UK);
    var first=function(){
      s(UK,id);d(MK);
      return sync(id,true).then(function(rl){if(rl)reloadOnce()}).catch(function(){});
    };
    if(prev&&prev!==id){
      /* 이전 학생 기록을 올리는 데 성공했을 때만 지운다. 실패하면 기록을 그대로 둔다 */
      push(prev,false).then(function(){wipe();return first()}).then(function(){reloadOnce()},function(){});
      return;
    }
    if(!prev){first();return}
    var last=Number(g(AK)||0);
    if(Date.now()-last>45000)sync(id,true).then(function(rl){if(rl)reloadOnce()}).catch(function(){});
    else sync(id,false).then(function(rl){if(rl)reloadOnce()}).catch(function(){});
    setInterval(function(){if(!D.hidden)sync(id,false).then(function(rl){if(rl)reloadOnce()}).catch(function(){})},60000);
    var hid=0;
    D.addEventListener('visibilitychange',function(){
      if(D.hidden){hid=Date.now();push(id,true).catch(function(){})}
      else if(hid&&Date.now()-hid>30000){sync(id,true).then(function(rl){if(rl)reloadOnce()}).catch(function(){})}
    });
    W.addEventListener('pagehide',function(){push(id,true).catch(function(){})});
  }
  /* 이름 입력 카드 (첫 화면에서만) */
  function mountCard(){
    if(!new RegExp('/'+SCH+'/(index\\.html|won\\.html|ans\\.html)?$').test(P))return;
    var host=D.querySelector('.wrap')||D.body;if(!host)return;
    var name=g(NK),box=D.createElement('div');
    if(!name)box.style.cssText='margin:12px 0;padding:14px;border:2px solid #e0a800;border-radius:12px;background:#fff4c2;color:#3a2e00;font-size:15px;display:flex;gap:8px;align-items:center;flex-wrap:wrap';
    else box.style.cssText='margin:6px 0;padding:5px 10px;border:0;border-radius:8px;background:transparent;color:var(--mute,#7a8683);font-size:12px;display:flex;gap:8px;align-items:center;justify-content:space-between';
    if(!name){
      box.innerHTML='<b style="flex:1 1 100%">이름을 등록해야 시작할 수 있어요</b><input id="rec-n" type="text" autocomplete="off" placeholder="이름" style="flex:1;min-width:120px;font-size:16px;padding:9px 10px;border:1px solid var(--line,#dbe4e1);border-radius:8px;background:transparent;color:inherit"><button id="rec-b" type="button" style="font-size:15px;font-weight:700;padding:9px 16px;border:0;border-radius:8px;background:var(--pri,#1d4ed8);color:var(--onpri,#fff)">시작</button><div id="rec-m" style="flex:1 1 100%;font-size:13px;color:var(--sub,#5a6b67)"></div>';
      host.insertBefore(box,host.firstChild);
      D.getElementById('rec-b').onclick=function(){
        var v=(D.getElementById('rec-n').value||'').replace(/\s+/g,'');
        if(!v){D.getElementById('rec-m').textContent='이름을 적어 주세요.';return}
        var b=this;b.disabled=true;D.getElementById('rec-m').textContent='확인하는 중...';
        var prevId=g(UK),newId='RECM|'+SCH+'|'+v+'|'+NUM;
        var fail=function(t){b.disabled=false;D.getElementById('rec-m').textContent=t};
        var net='연결이 안 됐어요. 인터넷을 확인하고 다시 눌러 주세요.';
        var go=function(){
          D.getElementById('rec-m').textContent='기록을 불러오는 중...';
          s(NK,v);var id=ident();
          if(prevId&&prevId!==id){wipe()}
          s(UK,id);d(MK);
          sync(id,true).then(function(){location.reload()},function(){d(NK);d(UK);fail(net)});
        };
        chk(newId).then(function(r){
          if(!r.ok){fail(r.err==='noname'?'등록된 학생 이름이 아니에요. 이름을 다시 확인하거나 선생님께 알려 주세요.':net);return}
          if(prevId&&prevId!==newId)push(prevId,false).then(go,function(e){if(e&&e.code==='noname')go();else fail('이전 기록을 저장하지 못했어요. 인터넷을 확인하고 다시 눌러 주세요.')});
          else go();
        },function(){fail(net)});
      };
    }else{
      box.innerHTML='<span style="flex:1"><b>'+name.replace(/[<>&"]/g,'')+'</b> 기록 저장 중</span><button id="rec-x" type="button" style="font-size:11.5px;padding:4px 9px;border:1px solid var(--line,#dbe4e1);border-radius:8px;background:transparent;color:inherit">저장하고 나가기</button>';
      host.insertBefore(box,host.firstChild);
      D.getElementById('rec-x').onclick=function(){
        if(!W.confirm('이름이 풀립니다. 학원 기기에서 다 풀고 나갈 때만 누르세요. 저장하고 나갈까요?'))return;
        var b=this,id=g(UK);b.disabled=true;b.textContent='저장하는 중...';
        (id?push(id,false):Promise.resolve()).then(function(){wipe();d(NK);d(UK);location.reload()},function(){b.disabled=false;b.textContent='저장이 안 됐어요. 다시 눌러 주세요'});
      };
    }
  }
  W.RECM={id:ident,sync:function(){var id=ident();return id?sync(id,true):Promise.resolve(false)}};
  function ready(){start();mountCard()}
  if(D.readyState==='complete')ready();else W.addEventListener('load',ready);
})();
