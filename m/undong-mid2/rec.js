/* REC 중등: 학생 기록을 기기 간에 잇는 스크립트(고등 rec.js의 중등판). 이름+6900.
   고등과 같은 구글 시트 서버를 쓰되 id가 RECM 으로 시작해 고등(REC)·허브 기록과 섞이지 않는다.
   저장 키(recm_*)와 연동 대상 키(mid7:*)도 고등과 겹치지 않는다. 공폰 모드(?shared=1)에서는 아무것도 하지 않는다. */
(function(){
  var W=window,D=document,P=location.pathname;
  var m=/\/via-mid\/m\/(yonga-mid2|geumcheon-mid2|yongseong-mid2|undong-mid2)\//.exec(P);
  if(!m||W.__recm)return;
  W.__recm=1;
  var URL_=W.REC_URL||'https://script.google.com/macros/s/AKfycbw1YQfKsgAXNk8NYoxOfz4bsCSy66fiim7HoFAUk162ksxrEbmspMs2UifNZ-93sdf05A/exec';
  var SCH=m[1],NUM='6900',PFX=({'yonga-mid2':'mid7:','geumcheon-mid2':'gcm2:','yongseong-mid2':'ysm2:','undong-mid2':'udm2:'})[SCH],SFX=(SCH==='yonga-mid2'?'':'_'+SCH);
  var UK='recm_uid'+SFX,MK='recm_meta'+SFX,NK='recm_name'+SFX,AK='recm_at'+SFX,LTK='recm_lt'+SFX,MAXV=45000;
  /* 261116: 공폰 모드 확인. 예전에는 PFX 가 정해지기 전에 확인해서 공폰 모드의 안쪽 화면에서 걸러지지 않았다 */
  try{if(!/[?&]shared=0/.test(location.search)&&(sessionStorage.getItem(PFX+'shared')==='1'||/[?&]shared=1/.test(location.search)))return}catch(e){}
  var LS=null;try{LS=W.localStorage;LS.getItem('x')}catch(e){return}
  function g(k){try{return LS.getItem(k)}catch(e){return null}}
  /* 261116d: 이 스크립트가 직접 쓰는 것(inS)과 앱이 쓰는 것을 구분한다 */
  var inS=0;
  function s(k,v){inS++;try{LS.setItem(k,v)}catch(e){}inS--}
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
    if(Array.isArray(a)&&Array.isArray(b)){
      /* 261116: 같은 값을 지우지 않는다. 한쪽이 다른 쪽의 앞부분이면 긴 쪽, 낱개 목록(글자·묶음)이면 이 기기 것에 저쪽에만 있는 것을 붙인다.
         순서가 뜻인 숫자 배열(문제 번호·풀이 상태)이 서로 다르면 합칠 수 없으므로 NOMERGE 로 알린다(merge 가 이 기기 값을 그대로 둔다) */
      var ja=a.map(function(x){return JSON.stringify(x)}),jb=b.map(function(x){return JSON.stringify(x)}),i,n=Math.min(ja.length,jb.length),pre=true;
      for(i=0;i<n;i++){if(ja[i]!==jb[i]){pre=false;break}}
      if(pre)return ja.length>=jb.length?a:b;
      var prim=function(x){return x===null||typeof x==='number'||typeof x==='boolean'};
      if(a.some(prim)||b.some(prim))throw NOMERGE;
      var cnt={};o=a.slice();ja.forEach(function(t){cnt[t]=(cnt[t]||0)+1});b.forEach(function(x,j){var t=jb[j];if(cnt[t]>0)cnt[t]--;else o.push(x)});return o}
    if(a&&b&&ta==='object'&&tb==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
      o={};for(k in a)o[k]=(k in b)?dm(a[k],b[k]):a[k];for(k in b)if(!(k in a))o[k]=b[k];return o}
    return b;
  }
  var NOMERGE={nomerge:1};
  /* 261116: 두 값이 통째로 찍은 기록(맨 위에 시각 t 가 있음)이면 더 나중 것을 쓴다. 합칠 수 없는 값은 지금 쓰는 이 기기 값을 둔다 */
  function merge(loc,rem){var a,b;try{a=JSON.parse(loc);b=JSON.parse(rem)}catch(e){return rem}
    try{if(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)&&typeof a.t==='number'&&typeof b.t==='number'&&a.t!==b.t)return a.t>b.t?loc:rem;
      return JSON.stringify(dm(a,b))}catch(e){return loc}}
  /* 서버가 "명단에 없는 이름"이라고 하면 이 기기의 이름 등록을 풀어 잠금 화면으로 돌린다 */
  /* 261116: 서버 답 한 번으로는 이름을 풀지 않는다. 8초 뒤 다시 물어서 또 "명단에 없음"일 때만 푼다(서버가 잠깐 잘못 답해도 이름이 풀리지 않게) */
  var dn=0;
  function deny(){
    if(!g(NK)||dn)return;dn=1;var id=ident();
    setTimeout(function(){
      chkSrv(id).then(function(r){dn=0;if(r&&!r.ok&&r.err==='noname'&&ident()===id){d(NK);d(UK);d(MK);reloadOnce(true)}},function(){dn=0});
    },8000);
  }
  /* 저장 상태 표시: 두 번 이상 연속 실패하면 카드에 빨간 안내를 띄운다 */
  var bad=0;
  function stat(ok){
    var e=D.getElementById('rec-st');
    if(ok){bad=0;if(e){e.textContent='기록 저장 중';e.style.color=''}return}
    bad++;
    if(e&&bad>=2){e.textContent='저장이 안 되고 있어요. 인터넷을 확인해 주세요';e.style.color='#dc2626'}
  }
  function post(body,keep){
    return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body),keepalive:!!keep})
      .then(function(r){return r.json()}).then(function(r){if(!r||!r.ok){var e=new Error('rec');e.code=r&&r.err;if(e.code==='noname')deny();throw e}return r})
      .then(function(r){stat(true);return r},function(e){if(!e||e.code!=='noname')stat(false);throw e});
  }
  /* 이름 등록 전 확인(기존 등록을 건드리지 않는다) */
  function chkSrv(id){
    return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({act:'put',id:id,data:{}})})
      .then(function(r){return r.json()}).then(function(r){if(!r)throw new Error('rec');return r});
  }
  /* 261117f: 기록 받기는 Firebase 에서 바로 한다(서버를 거치지 않는다). 한 사람 기록은 8조각이라 한 번에 받는다.
     조각이 하나도 없거나(처음 온 학생 - 명단 확인이 필요) 실패하거나 2.5초를 넘기면 null 을 돌려주고, 그때는 예전처럼 서버에 묻는다 */
  function fsRead(id){
    try{
      var smp=/(^|[|:])샘플\d*([|:]|$)/.test(id),base='projects/h-roadmap/databases/(default)/documents/'+(smp?'rec_s':'rec')+'/'+String(id).replace(/%/g,'%25').replace(/\//g,'%2F')+'~',names=[],i;
      for(i=0;i<8;i++)names.push(base+i);
      var ac=W.AbortController?new AbortController():null,tm=ac?setTimeout(function(){ac.abort()},2500):0;
      return fetch('https://firestore.googleapis.com/v1/projects/h-roadmap/databases/(default)/documents:batchGet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({documents:names}),signal:ac?ac.signal:undefined})
        .then(function(r){clearTimeout(tm);return r.ok?r.json():null})
        .then(function(a){
          if(!Array.isArray(a)||a.length!==8)return null;
          var data={},found=0,j,o,k,x;
          for(j=0;j<a.length;j++){
            x=a[j];if(x.missing)continue;if(!x.found)return null;found++;
            o=x.found.fields&&x.found.fields.j&&x.found.fields.j.stringValue;if(!o)continue;o=JSON.parse(o);
            for(k in o){try{data[k]={v:JSON.parse(String(o[k][0])),t:Number(o[k][1])}}catch(e){}}
          }
          return found?{ok:1,data:data,fs:1}:null;
        }).catch(function(){clearTimeout(tm);return null});
    }catch(e){return Promise.resolve(null)}
  }
  function chk(id){return fsRead(id).then(function(r){return r||chkSrv(id)})}
  function unwrap(v){return(v&&typeof v==='object'&&typeof v.s==='string')?v.s:null}
  var busy=false,again=false,recent={};
  /* 261116d: 기록마다 '이 기기에서 마지막으로 바뀐 시각'을 적어 둔다. 서버에서 받은 값이 그보다 옛것이면 받지 않는다(옛 값이 새 값을 덮어쓰지 못하게) */
  function stamp(k){var o=jg(LTK)||{};o[k]=Date.now();s(LTK,JSON.stringify(o))}
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
    var k0;for(k0 in c.sent)recent[k0]=Date.now();
    /* 261116e: 올리기만 할 때는 서버가 기록을 돌려주지 않게 한다(nr:1) */
    return post({act:'put',id:id,nr:1,data:c.ch},keep).then(function(){
      var meta=jg(MK)||{},k;for(k in c.sent)meta[k]=c.sent[k];s(MK,JSON.stringify(meta));return true});
  }
  function sync(id,apply,pre){
    if(busy){again=true;return Promise.resolve(false)}busy=true;
    var t0=Date.now();
    return (pre?Promise.resolve(pre):fsRead(id).then(function(r){return r||post({act:'put',id:id,data:{}})})).then(function(r){
      var rem=r.data||{},meta=jg(MK)||{},rl=false,skip={},k,lt=jg(LTK)||{};
      for(k in rem){
        if(!mirrored(k))continue;
        var rs=unwrap(rem[k].v);if(rs===null)continue;
        var lv=g(k);
        if(lv===rs){meta[k]=rs;continue}
        if(lv===null){if(apply){s(k,rs);meta[k]=rs;rl=true}continue}
        var lchg=meta[k]!==lv;
        /* 261116: 이 받기를 보내기 직전(15초 안)이나 기다리는 동안 이 기기가 올린 키는, 서버의 옛 값으로 되돌리지 않는다 */
        if(!lchg){
          var rt=Number(rem[k].t||0);
          /* 261116c: 서버 값이 이 기기에서 바꾼 시각보다 옛것이면 받지 않고, 이 기기 값을 다시 올린다 */
          if(lt[k]&&rt&&rt<lt[k]){delete meta[k]}
          else if(apply&&!(recent[k]&&recent[k]>t0-15000)){s(k,rs);meta[k]=rs;if(rt)lt[k]=rt;rl=true}
        }
        else if(meta[k]!==rs){
          var mg=merge(lv,rs);if(mg!==lv){s(k,mg);rl=true}
        }
      }
      for(k in lt){if(g(k)===null)delete lt[k]}
      s(LTK,JSON.stringify(lt));
      s(MK,JSON.stringify(meta));s(AK,String(Date.now()));
      return push(id,false,skip).then(function(){busy=false;if(again){again=false;sched()}return rl},function(){busy=false;return rl});
    },function(e){busy=false;throw e});
  }
  function wipe(){keys().forEach(d);d(MK);d(LTK)}
  var TCH=0;try{['click','touchstart','keydown'].forEach(function(ev){W.addEventListener(ev,function(){TCH=1},true)})}catch(e){}
  function reloadOnce(force){if(!force&&TCH)return;
    try{var t=Number(sessionStorage.getItem('recm_rl'+SFX)||0);if(Date.now()-t>20000){sessionStorage.setItem('recm_rl'+SFX,String(Date.now()));location.reload()}}catch(e){}
  }
  /* 261116: 저장이 일어날 때마다 서버와 맞추지 않는다. 마지막 저장 뒤 5초 조용하면(계속 풀고 있으면 늦어도 15초마다) 바뀐 것만 한 번 올린다.
     받기는 화면을 열 때·돌아올 때 한다. 서버가 한 번에 한 요청씩만 처리하므로 요청 수를 줄이는 것이 곧 속도다 */
  var timer=null,firstAt=0;
  function pushNow(){
    var id=ident();if(!id||id!==g(UK))return;
    if(busy){again=true;return}
    busy=true;push(id,false).catch(function(){}).then(function(){busy=false;if(again){again=false;sched()}});
  }
  function sched(){
    var now=Date.now();if(!firstAt)firstAt=now;
    if(timer)clearTimeout(timer);
    timer=setTimeout(function(){timer=null;firstAt=0;pushNow()},Math.max(0,Math.min(5000,firstAt+15000-now)));
  }
  try{
    var sp=W.Storage.prototype,os=sp.setItem;
    /* 261116: 이용 시간(tm:)은 5초마다 저장되므로 그때마다 서버에 올리지 않는다. 다른 기록이 올라갈 때·1분마다·화면을 나갈 때 함께 올라간다 */
    /* 261116c: 앱이 값을 실제로 바꿨을 때만 시각을 적는다(같은 값을 다시 저장한 것은 바뀐 것이 아니다) */
    sp.setItem=function(k,v){
      var mine=this===LS&&!inS&&mirrored(k),old;
      if(mine){try{old=LS.getItem(k)}catch(e){}}
      os.apply(this,arguments);
      if(mine){if(old!==String(v))stamp(k);if(String(k).indexOf(PFX+'tm:')!==0)sched()}
    };
  }catch(e){}
  function start(){
    var id=ident();if(!id)return;
    var prev=g(UK);
    var first=function(){
      s(UK,id);d(MK);
      return sync(id,true).then(function(rl){if(rl)reloadOnce(true)}).catch(function(){});
    };
    if(prev&&prev!==id){
      /* 이전 학생 기록을 올리는 데 성공했을 때만 지운다. 실패하면 기록을 그대로 둔다 */
      push(prev,false).then(function(){wipe();return first()}).then(function(){reloadOnce(true)},function(){});
      return;
    }
    if(!prev){first();return}
    var last=Number(g(AK)||0);
    /* 261116: 45초 안에 이미 맞췄으면(이름 넣고 들어온 직후·앱 안에서 화면을 옮길 때) 다시 받지 않고, 올릴 것이 있을 때만 올린다 */
    if(Date.now()-last>45000)sync(id,true).then(function(rl){if(rl)reloadOnce()}).catch(function(){});
    else if(pending().n)sched();
    setInterval(function(){if(!D.hidden&&pending().n)pushNow()},60000);
    var hid=0;
    D.addEventListener('visibilitychange',function(){
      if(D.hidden){hid=Date.now();push(id,true).catch(function(){})}
      else if(hid&&Date.now()-hid>30000){sync(id,true).then(function(rl){if(rl)reloadOnce()}).catch(function(){})}
    });
    W.addEventListener('pagehide',function(){push(id,true).catch(function(){})});
  }
  /* 나가기 보관함: 서버에 올라간 것이 확인될 때까지 이 기기에 남겨 두고 자동으로 다시 보낸다 */
  var OK_='recm_out'+SFX,fl=false;
  function outq(){try{var a=JSON.parse(g(OK_)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
  function tpost(body){
    var ac=W.AbortController?new AbortController():null,t=ac?setTimeout(function(){ac.abort()},25000):0;
    return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body),signal:ac?ac.signal:undefined})
      .then(function(r){clearTimeout(t);return r.json()},function(e){clearTimeout(t);throw e});
  }
  function flushOut(){
    if(fl)return;
    var q=outq().filter(function(x){return !x.dead});if(!q.length)return;
    fl=true;var x=q[0];
    tpost({act:'put',id:x.id,nr:1,data:x.ch||{}}).then(function(r){
      if(!r||!r.ok){var e=new Error('out');e.code=r&&r.err;throw e}
      return tpost({act:'put',id:x.id,data:{}});
    }).then(function(r){
      if(!r||!r.ok)throw new Error('out');
      var rem=r.data||{},miss=0;
      (x.keys||[]).forEach(function(k){var e=rem[k];if(!e||unwrap(e.v)===null)miss++});
      if(miss)throw new Error('miss');
      s(OK_,JSON.stringify(outq().filter(function(y){return y.t!==x.t})));
      fl=false;flushOut();
    }).catch(function(e){
      fl=false;
      if(e&&e.code==='noname'){s(OK_,JSON.stringify(outq().map(function(y){if(y.t===x.t)y.dead=1;return y})))}
    });
  }
  W.addEventListener('online',flushOut);
  setInterval(flushOut,45000);
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
      try{fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({act:'put',id:'RECM|'+SCH+'|__warm|'+NUM,data:{}})}).catch(function(){})}catch(e){}
      D.getElementById('rec-b').onclick=function(){
        var v=(D.getElementById('rec-n').value||'').replace(/\s+/g,'');
        if(!v){D.getElementById('rec-m').textContent='이름을 적어 주세요.';return}
        var b=this;b.disabled=true;D.getElementById('rec-m').textContent='확인하는 중...';
        var prevId=g(UK),newId='RECM|'+SCH+'|'+v+'|'+NUM;
        var fail=function(t){b.disabled=false;D.getElementById('rec-m').textContent=t};
        var net='연결이 안 됐어요. 인터넷을 확인하고 다시 눌러 주세요.';
        var go=function(pre){
          D.getElementById('rec-m').textContent='기록을 불러오는 중...';
          s(NK,v);var id=ident();
          if(prevId&&prevId!==id){wipe()}
          s(UK,id);d(MK);
          sync(id,true,pre).then(function(){location.reload()},function(){d(NK);d(UK);fail(net)});
        };
        chk(newId).then(function(r){
          if(!r.ok){fail(r.err==='noname'?'등록된 학생 이름이 아니에요. 이름을 다시 확인하거나 선생님께 알려 주세요.':net);return}
          if(prevId&&prevId!==newId)push(prevId,false).then(function(){go(r)},function(e){if(e&&e.code==='noname')go(r);else fail('이전 기록을 저장하지 못했어요. 인터넷을 확인하고 다시 눌러 주세요.')});
          else go(r);
        },function(){fail(net)});
      };
    }else{
      box.innerHTML='<span style="flex:1"><b>'+name.replace(/[<>&"]/g,'')+'</b> <span id="rec-st">기록 저장 중</span></span><button id="rec-x" type="button" style="font-size:11.5px;padding:4px 9px;border:1px solid var(--line,#dbe4e1);border-radius:8px;background:transparent;color:inherit">저장하고 나가기</button>';
      host.insertBefore(box,host.firstChild);
      D.getElementById('rec-x').onclick=function(){
        if(!W.confirm('이름이 풀립니다. 학원 기기에서 다 풀고 나갈 때만 누르세요. 저장하고 나갈까요?'))return;
        var b=this,id=g(UK);
        if(!id){wipe();d(NK);d(UK);location.reload();return}
        var ch=pending().ch,ks=[],big=0;
        keys().forEach(function(k){var v=g(k);if(v===null)return;if(v.length>MAXV){big++;return}ks.push(k)});
        if(big&&!W.confirm('너무 커서 저장되지 않는 기록이 '+big+'개 있어요. 그래도 나갈까요?\n(나가면 이 기록은 사라져요)'))return;
        /* 기록은 이 기기의 보관함에 먼저 담고, 바로 이름 화면으로 넘어간다. 서버 저장은 뒤에서 확인될 때까지 자동 재시도 */
        var item={id:id,ch:ch,keys:ks,t:Date.now()},q=outq();q.push(item);
        s(OK_,JSON.stringify(q));
        var okw=false;try{okw=outq().some(function(y){return y.t===item.t})}catch(e){}
        if(!okw){W.alert('이 기기에 임시 보관을 하지 못했어요. 나가지 말고 선생님께 알려 주세요.');return}
        b.disabled=true;b.textContent='나가는 중...';
        wipe();d(NK);d(UK);location.reload();
      };
    }
  }
  W.RECM={id:ident,sync:function(){var id=ident();return id?sync(id,true):Promise.resolve(false)}};
  function ready(){flushOut();start();mountCard()}
  if(D.readyState==='complete')ready();else W.addEventListener('load',ready);
})();
/* recm 261117f */
