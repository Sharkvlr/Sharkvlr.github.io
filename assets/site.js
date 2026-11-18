(function(){
  function setLang(l){
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('.lang button').forEach(function(b){ b.classList.toggle('on', b.dataset.lang === l); });
    try{ localStorage.setItem('lang', l); }catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });
  setLang(document.documentElement.getAttribute('data-lang') || 'en');

  var els = document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  document.querySelectorAll('[data-count]').forEach(function(el){
    var end = parseFloat(el.dataset.count), fmt = el.dataset.fmt || '', done = false;
    function run(){
      if(done) return; done = true;
      var t0 = performance.now(), dur = 1300;
      (function step(t){
        var p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('en-US') + fmt;
        if(p < 1) requestAnimationFrame(step);
      })(t0);
    }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es, o){ es.forEach(function(e){ if(e.isIntersecting){ run(); o.disconnect(); } }); }, {threshold:.5}).observe(el);
    } else run();
  });
})();
