/* 비타민 영어클리닉 공통 안정화 261105a
   바탕화면(홈 화면 앱)·학교 태블릿에서 쓸 때를 위한 기초 설정. 이 파일이 없어도 앱은 그대로 동작한다.
   1) 아래쪽에 떠 있는 작은 버튼(⌂ 목록 등)이 아이폰 홈 막대에 가려지면 위로 올린다.
   2) 안드로이드에서 화면을 쓸어내리다 새로고침되어 풀던 내용이 사라지는 것을 막는다.
   3) 아이폰에서 입력칸을 누르면 화면이 확대되는 것을 막는다.
   4) 오류가 나면 학생이 캡처해서 보낼 수 있게 화면 위에 짧은 문구를 띄운다(원인 파악용).
   모든 코드는 try 안에서만 돌아서, 여기서 문제가 나도 앱 본체에는 영향이 없다. 이 파일은 via-high/h/common, via-mid/m/common, via/common에 같은 내용으로 둔다. */
(function(){try{
  var V='261105a',d=document,w=window;
  if(w.__vhBase)return;w.__vhBase=V;

  /* 1~3) 스타일 */
  var css='html,body{overscroll-behavior-y:contain}html{touch-action:manipulation}'
    +'@supports(-webkit-touch-callout:none){input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]):not([type=file]),select,textarea{font-size:16px!important}}';
  var st=d.createElement('style');st.setAttribute('data-vh-base',V);st.appendChild(d.createTextNode(css));
  (d.head||d.documentElement).appendChild(st);

  /* 1) 아래쪽 작은 버튼이 홈 막대에 가려지면 그만큼만 올린다(이미 여백을 처리한 바 형태의 탭줄은 건드리지 않는다) */
  var probe=null;
  function inset(){
    try{
      if(!probe){probe=d.createElement('div');probe.style.cssText='position:fixed;left:0;bottom:0;width:0;height:env(safe-area-inset-bottom,0px);visibility:hidden;pointer-events:none';(d.body||d.documentElement).appendChild(probe)}
      return probe.getBoundingClientRect().height||0;
    }catch(e){return 0}
  }
  function lift(el,ins,ih,iw){
    var cs=w.getComputedStyle(el);
    if(cs.position!=='fixed'||cs.bottom==='auto'||cs.display==='none'||cs.visibility==='hidden')return;
    var r=el.getBoundingClientRect();
    if(!r.width||!r.height||r.width>iw*0.6)return;
    if((parseFloat(cs.paddingBottom)||0)>=ins-1)return;
    var cur=parseFloat(el.style.marginBottom)||0;
    var gap0=ih-r.bottom-cur;
    var need=Math.max(0,ins-gap0);
    if(Math.abs(need-cur)>0.5)el.style.marginBottom=need+'px';
  }
  function pass(){
    try{
      if(d.hidden)return;
      var ins=inset();if(!(ins>0))return;
      var ih=w.innerHeight,iw=w.innerWidth,
          list=d.querySelectorAll('a.fab,a.homefab,.homefab,.topfab,.fq,[style*="position:fixed"],[style*="position: fixed"]');
      for(var i=0;i<list.length&&i<40;i++)lift(list[i],ins,ih,iw);
    }catch(e){}
  }
  w.__vhBasePass=pass;
  ['DOMContentLoaded','load','resize','orientationchange','pageshow','visibilitychange'].forEach(function(n){(n==='DOMContentLoaded'||n==='visibilitychange'?d:w).addEventListener(n,function(){setTimeout(pass,50)})});
  setInterval(pass,1500);

  /* 4) 오류 문구 — 한 화면에 한 번만 */
  var shown=false,IGN=/ResizeObserver|^Script error\.?$|NotAllowedError|AbortError|speech|The play\(\) request|operation was aborted|Non-Error promise rejection/i;
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function banner(msg,net){
    if(shown)return;shown=true;
    try{
      var t=d.createElement('div');t.setAttribute('role','alert');
      t.style.cssText='position:fixed;left:8px;right:8px;top:8px;top:calc(8px + env(safe-area-inset-top,0px));z-index:2147483647;background:#fff7ed;color:#7c2d12;border:1.5px solid #f59e0b;border-radius:12px;padding:10px 12px;font:600 13px/1.5 -apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25)';
      var info=esc(msg)+' · '+V+' · '+esc(location.pathname.replace(/^\/(via[^\/]*)\//,'$1/'));
      t.innerHTML=(net?'<b>일부를 불러오지 못했어요.</b> 인터넷 연결을 확인하고 아래 버튼을 눌러 주세요.':'<b>화면에 오류가 났어요.</b> 이 화면을 캡처해서 선생님께 보내 주세요.')
        +'<div style="font-size:11px;font-weight:400;color:#9a3412;word-break:break-all;margin-top:2px">'+info+'</div>'
        +'<div style="display:flex;gap:8px;margin-top:8px"></div>';
      var row=t.lastChild;
      function btn(label,fn){var b=d.createElement('button');b.type='button';b.textContent=label;b.style.cssText='border:1.5px solid #f59e0b;background:#fff;color:#7c2d12;border-radius:999px;padding:7px 14px;font:700 13px/1 inherit;cursor:pointer';b.onclick=fn;row.appendChild(b)}
      if(net)btn('다시 불러오기',function(){location.reload()});
      btn('닫기',function(){t.parentNode&&t.parentNode.removeChild(t)});
      (d.body||d.documentElement).appendChild(t);
    }catch(e){}
  }
  w.addEventListener('error',function(ev){
    try{
      var tg=ev&&ev.target;
      if(tg&&tg!==w&&tg.tagName){
        /* 우리 앱 안의 스크립트 파일이 안 불러와졌을 때만 알린다(글꼴·외부 아이콘이 막힌 것은 앱이 동작하므로 알리지 않는다) */
        if(tg.tagName==='SCRIPT'&&tg.src){var u=String(tg.src);if(u.indexOf(location.origin)===0||u.indexOf('//')<0)banner('불러오기 실패: '+u.replace(/^https?:\/\/[^\/]+/,'').replace(/\?.*$/,''),true)}
        return}
      var m=(ev&&ev.message)||'';if(!m||IGN.test(m))return;
      banner(m+(ev.lineno?' @'+String(ev.filename||'').split('/').pop().split('?')[0]+':'+ev.lineno:''),false);
    }catch(e){}
  },true);
  w.addEventListener('unhandledrejection',function(ev){
    try{
      var r=ev&&ev.reason,m=(r&&(r.message||r.name))||String(r||'');
      if(!m||IGN.test(m))return;
      if(/Failed to fetch|Load failed|NetworkError/i.test(m))return;
      banner('promise: '+m,false);
    }catch(e){}
  });
}catch(e){}})();
