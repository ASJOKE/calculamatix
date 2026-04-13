/* ═══════════════════════════════════════════════════
   suggestions.js — Calculamatix
   Footer intelligent avec suggestions contextuelles
   
   USAGE : coller en bas de chaque page avant </body>
   <script src="/suggestions.js"></script>
   <script>renderFooter('nom-de-la-page')</script>
   ═══════════════════════════════════════════════════ */

var CALCS = {
  'perte-de-poids':      { emoji:'⚖️',  title:'Perte de poids',               url:'perte-de-poids.html',                cat:'Santé' },
  'e85-ethanol':         { emoji:'⛽',  title:'E85 vs SP95',                   url:'e85-ethanol.html',                   cat:'Auto' },
  'credit-conso':        { emoji:'💳',  title:'Crédit conso — Coût réel',      url:'credit-conso.html',                  cat:'Argent' },
  'voiture-electrique':  { emoji:'⚡',  title:'Voiture électrique vs thermique',url:'voiture-electrique-vs-thermique.html',cat:'Auto' },
  'louer-vs-acheter':    { emoji:'🏠',  title:'Louer vs Acheter',              url:'louer-vs-acheter.html',              cat:'Immobilier' },
  'panneaux-solaires':   { emoji:'☀️',  title:'Panneaux solaires',             url:'panneaux-solaires.html',             cat:'Énergie' },
  'renover-ou-demenager':{ emoji:'🔨',  title:'Rénover ou Déménager',          url:'renover-ou-demenager.html',          cat:'Immobilier' },
  'roi-grande-ecole':    { emoji:'🎓',  title:'ROI Grande École',              url:'roi-grande-ecole.html',              cat:'Éducation' },
  'roi-formation':       { emoji:'📚',  title:'ROI Formation / Bootcamp',      url:'roi-formation.html',                 cat:'Éducation' },
  'cout-enfant':         { emoji:'👶',  title:'Coût d\'un enfant',             url:'cout-enfant.html',                   cat:'Famille' },
  'cout-chien':          { emoji:'🐕',  title:'Coût d\'un chien',              url:'cout-chien.html',                    cat:'Famille' },
  'cout-sommeil':        { emoji:'😴',  title:'Coût du manque de sommeil',     url:'cout-sommeil.html',                  cat:'Santé' },
  'changer-telephone':   { emoji:'📱',  title:'Changer de téléphone ?',        url:'changer-telephone.html',             cat:'Tech' },
  'test-politique':      { emoji:'🗳️', title:'Test politique (v1)',            url:'test-politique.html',                cat:'Société' },
  'test-politique-2':    { emoji:'🗳️', title:'Test politique — 80 questions', url:'test-politique-2.html',              cat:'Société' },
  'transfert-foot':      { emoji:'⚽',  title:'Vaut-il son transfert ?',       url:'transfert-foot.html',                cat:'Sport' },
  'impact-ecolo':        { emoji:'🌍',  title:'Mon impact écologique réel',    url:'impact-ecolo.html',                  cat:'Écologie' },
  'trajectoire-sociale': { emoji:'🏛️', title:'Ma trajectoire sociale',        url:'trajectoire-sociale.html',           cat:'Société' },
  'impact-voyage':       { emoji:'✈️', title:'Impact carbone de mon voyage',  url:'impact-voyage.html',                 cat:'Voyage' },
  'bilan-voyageur':      { emoji:'🌍',  title:'Mon bilan voyageur',            url:'bilan-voyageur.html',                cat:'Voyage' },
};

/* Relations contextuelles — chaque page suggère 3 calculateurs */
var SUGGESTIONS = {
  'perte-de-poids':       ['cout-sommeil', 'changer-telephone', 'cout-enfant'],
  'e85-ethanol':          ['voiture-electrique', 'louer-vs-acheter', 'impact-ecolo'],
  'credit-conso':         ['louer-vs-acheter', 'roi-formation', 'renover-ou-demenager'],
  'voiture-electrique':   ['e85-ethanol', 'impact-ecolo', 'panneaux-solaires'],
  'louer-vs-acheter':     ['credit-conso', 'renover-ou-demenager', 'panneaux-solaires'],
  'panneaux-solaires':    ['voiture-electrique', 'impact-ecolo', 'louer-vs-acheter'],
  'renover-ou-demenager': ['louer-vs-acheter', 'credit-conso', 'panneaux-solaires'],
  'roi-grande-ecole':     ['roi-formation', 'trajectoire-sociale', 'cout-enfant'],
  'roi-formation':        ['roi-grande-ecole', 'trajectoire-sociale', 'credit-conso'],
  'cout-enfant':          ['cout-chien', 'louer-vs-acheter', 'roi-grande-ecole'],
  'cout-chien':           ['cout-enfant', 'cout-sommeil', 'perte-de-poids'],
  'cout-sommeil':         ['perte-de-poids', 'changer-telephone', 'cout-chien'],
  'changer-telephone':    ['cout-sommeil', 'roi-formation', 'impact-ecolo'],
  'test-politique':       ['test-politique-2', 'trajectoire-sociale', 'impact-ecolo'],
  'test-politique-2':     ['trajectoire-sociale', 'impact-ecolo', 'test-politique'],
  'transfert-foot':       ['test-politique-2', 'changer-telephone', 'cout-sommeil'],
  'impact-ecolo':         ['impact-voyage', 'bilan-voyageur', 'voiture-electrique'],
  'trajectoire-sociale':  ['test-politique-2', 'roi-grande-ecole', 'cout-enfant'],
  'impact-voyage':        ['bilan-voyageur', 'impact-ecolo', 'voiture-electrique'],
  'bilan-voyageur':       ['impact-voyage', 'impact-ecolo', 'cout-sommeil'],
};

function renderFooter(pageKey) {
  var suggestions = SUGGESTIONS[pageKey] || [];

  /* Si pas de suggestions définies, prendre 3 au hasard */
  if (suggestions.length === 0) {
    var keys = Object.keys(CALCS).filter(function(k){ return k !== pageKey; });
    suggestions = keys.sort(function(){ return Math.random() - 0.5; }).slice(0, 3);
  }

  var cards = suggestions.map(function(key) {
    var c = CALCS[key];
    if (!c) return '';
    return '<a href="/' + c.url + '" class="sf-card">'
      + '<div class="sf-emoji">' + c.emoji + '</div>'
      + '<div class="sf-info">'
      + '<div class="sf-cat">' + c.cat + '</div>'
      + '<div class="sf-title">' + c.title + '</div>'
      + '</div>'
      + '<div class="sf-arrow">→</div>'
      + '</a>';
  }).join('');

  var html = '<footer class="sf-footer">'
    + '<div class="sf-wrap">'
    + '<div class="sf-top">'
    + '<div class="sf-label">✦ Vous aimerez aussi</div>'
    + '<a href="/index.html" class="sf-home">Voir tous les calculateurs →</a>'
    + '</div>'
    + '<div class="sf-grid">' + cards + '</div>'
    + '<div class="sf-bottom">'
    + '<div class="sf-logo">Calcula<span>matix</span></div>'
    + '<div class="sf-links">'
    + '<span>Gratuit</span>'
    + '<span>·</span>'
    + '<span>Sans pub</span>'
    + '<span>·</span>'
    + '<span>Sources citées</span>'
    + '</div>'
    + '<div class="sf-copy">© 2025 Calculamatix</div>'
    + '</div>'
    + '</div>'
    + '</footer>';

  /* Injecter les styles si pas déjà présents */
  if (!document.getElementById('sf-styles')) {
    var style = document.createElement('style');
    style.id = 'sf-styles';
    style.textContent = [
      '.sf-footer{background:#0a0a0a;border-top:1px solid #1a1a1a;margin-top:60px;padding:40px 0 32px;font-family:"DM Sans",sans-serif}',
      '.sf-wrap{max-width:1100px;margin:0 auto;padding:0 24px}',
      '.sf-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px}',
      '.sf-label{font-family:"Unbounded",sans-serif;font-size:11px;font-weight:700;color:#444;text-transform:uppercase;letter-spacing:2px}',
      '.sf-home{font-size:12px;color:#555;text-decoration:none;transition:color .15s}',
      '.sf-home:hover{color:#FFD93D}',
      '.sf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:32px}',
      '.sf-card{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#111;border:1px solid #1a1a1a;border-radius:14px;text-decoration:none;color:#E0E0E0;transition:all .15s}',
      '.sf-card:hover{background:#161616;border-color:#2a2a2a;transform:translateY(-1px)}',
      '.sf-emoji{font-size:24px;flex-shrink:0}',
      '.sf-info{flex:1;min-width:0}',
      '.sf-cat{font-size:10px;color:#555;font-family:"DM Mono",monospace;margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px}',
      '.sf-title{font-size:13px;font-weight:600;color:#E0E0E0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.sf-arrow{color:#333;font-size:16px;flex-shrink:0;transition:transform .15s}',
      '.sf-card:hover .sf-arrow{color:#FFD93D;transform:translateX(3px)}',
      '.sf-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:24px;border-top:1px solid #141414}',
      '.sf-logo{font-family:"Unbounded",sans-serif;font-size:14px;font-weight:900;color:#E0E0E0}',
      '.sf-logo span{color:#FFD93D}',
      '.sf-links{display:flex;align-items:center;gap:8px;font-size:12px;color:#333}',
      '.sf-copy{font-size:11px;color:#2a2a2a;font-family:"DM Mono",monospace}',
      '@media(max-width:640px){.sf-grid{grid-template-columns:1fr}.sf-bottom{flex-direction:column;align-items:flex-start;gap:8px}}',
    ].join('');
    document.head.appendChild(style);
  }

  /* Injecter le footer dans le body */
  document.body.insertAdjacentHTML('beforeend', html);
}
