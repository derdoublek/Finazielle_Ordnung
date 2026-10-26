(function(){
// Beispieldaten, alle erfunden. per = Monate pro Zahlung
var INCOME=3400;
var ACCS=[
 {id:'g',name:'Gläubiger',color:'#2f7d5b',t:1900,items:[['Kreditrate',1450,1],['Ratenkauf',363.56,1]]},
 {id:'v',name:'Versicherungen',color:'#b8862b',t:250,items:[['Berufsunfähigkeit',87,1],['Kfz-Versicherung',64.5,1],['Rechtsschutz',26.42,1],['Hausrat',114,12],['Privathaftpflicht',78,12]]},
 {id:'a',name:'Auto',color:'#4b6fa8',t:350,items:[['Tanken',200,1],['Werkstatt',600,12],['Kfz-Steuer',180,12],['Automobilclub',54,12]]},
 {id:'r',name:'Rücklagen',color:'#8a5a9f',t:150,items:[]},
 {id:'u',name:'Urlaub',color:'#c25a48',t:100,items:[]}
];
var CHEV='<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
function fmt(n){return n.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';}
function m(it){return it[1]/it[2];}
function need(a){return a.items.reduce(function(s,it){return s+m(it);},0);}
function cnt(a){return a.items.length===1?'1 Zahlung':a.items.length+' Zahlungen';}
var sumT=ACCS.reduce(function(s,a){return s+a.t;},0);
var state={tab:'v',open:'',filter:'all'};
var body=document.getElementById('body'),toast=document.getElementById('toast'),tt;
function say(msg){toast.textContent=msg;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on');},2200);}
function note(it){return it[2]===12?fmt(it[1]).replace(',00','')+'/Jahr':'';}

function viewV(){
 var h='<div class="hero2"><small>Frei zum Leben im Monat</small><div class="big num">'+fmt(INCOME-sumT)+'</div><div class="ln"><b>✓ Alle Konten gedeckt</b><span>Geldeingang '+fmt(INCOME)+'</span></div></div>';
 h+='<div class="sec">Deine Konten</div><div class="card">';
 ACCS.forEach(function(a){
  var has=a.items.length>0,open=state.open===a.id,d=a.t-need(a);
  h+='<button type="button" class="rw" data-acc="'+a.id+'" aria-expanded="'+open+'"><span class="bar" style="background:'+a.color+'"></span><span class="mid"><div class="t">'+a.name+'</div><div class="s num">Überweisung '+fmt(a.t)+'</div>'+(has?'<div class="s num">Bedarf '+fmt(need(a))+'</div>':'')+'</span><span class="r">'+(has?'<b class="pos num">+'+fmt(d).replace('+','')+'</b><span class="s">Puffer</span>':'<b class="num" style="color:#5f7268">Rücklage</b>')+'</span>'+CHEV+'</button>';
  if(open&&has)h+='<div class="det">'+a.items.slice().sort(function(x,y){return m(y)-m(x);}).map(function(it){return '<div><span>'+it[0]+' <small>'+note(it)+'</small></span><b class="num">'+fmt(m(it))+'</b></div>';}).join('')+'</div>';
  if(open&&!has)h+='<div class="det"><div><span>Keine Zahlungen zugeordnet.</span></div><div><small>Der Betrag sammelt sich jeden Monat an.</small></div></div>';
 });
 h+='<div class="rw" style="cursor:default"><span class="bar" style="background:#9aa89f"></span><span class="mid"><div class="t">Lebenkonto</div><div class="s">Rest nach dem Verteiler</div></span><span class="r"><b class="num">'+fmt(INCOME-sumT)+'</b><span class="s">bleiben</span></span></div></div>';
 return h;
}
function viewZ(){
 var all=ACCS.filter(function(a){return a.items.length;}),total=all.reduce(function(s,a){return s+a.items.length;},0);
 var h='<button type="button" class="addb" data-toast="1">+ Zahlung hinzufügen</button><div class="chips" role="group" aria-label="Filter"><button type="button" data-f="all" aria-pressed="'+(state.filter==='all')+'">Alle<span class="num">'+total+'</span></button>';
 all.forEach(function(a){h+='<button type="button" data-f="'+a.id+'" aria-pressed="'+(state.filter===a.id)+'">'+a.name+'<span class="num">'+a.items.length+'</span></button>';});
 h+='</div>';
 all.filter(function(a){return state.filter==='all'||state.filter===a.id;}).forEach(function(a){
  h+='<div class="gh"><i style="background:'+a.color+'"></i>'+a.name+'<span class="num">'+fmt(need(a))+' / Monat</span></div><div class="card" style="margin-bottom:16px">';
  a.items.slice().sort(function(x,y){return m(y)-m(x);}).forEach(function(it){
   h+='<button type="button" class="rw" data-toast="1"><span class="mid"><div class="t" style="font-size:16px">'+it[0]+'</div>'+(note(it)?'<div class="s">'+note(it)+'</div>':'')+'</span><span class="r"><b class="num">'+fmt(m(it))+'</b></span>'+CHEV+'</button>';
  });
  h+='</div>';
 });
 return h;
}
function viewK(){
 var h='<div class="sec" style="margin-top:6px">Geldeingang <span class="num">'+fmt(INCOME)+' / Monat</span></div><div class="card"><button type="button" class="rw" data-toast="1"><span class="mid"><div class="t">Gehalt</div></span><span class="r"><b class="num">'+fmt(INCOME)+'</b></span>'+CHEV+'</button></div><button type="button" class="addb l" data-toast="1">+ Einnahme hinzufügen</button>';
 h+='<div class="sec">Unterkonten <span class="num">'+fmt(sumT)+' / Monat</span></div><div class="card">';
 ACCS.forEach(function(a){h+='<button type="button" class="rw" data-toast="1"><span class="bar" style="background:'+a.color+'"></span><span class="mid"><div class="t">'+a.name+'</div><div class="s">'+(a.items.length?cnt(a):'Keine Zahlungen')+'</div></span><span class="r"><b class="num">'+fmt(a.t)+'</b></span>'+CHEV+'</button>';});
 h+='</div><div class="sec">Einstellungen</div><div class="card"><button type="button" class="rw" data-toast="1"><span class="mid"><div class="t">Sicherung kopieren</div><div class="s">Daten sichern, z. B. in deinen Notizen</div></span>'+CHEV+'</button><button type="button" class="rw" data-toast="1"><span class="mid"><div class="t">Sicherung einfügen</div><div class="s">Gesicherte Daten wiederherstellen</div></span>'+CHEV+'</button><button type="button" class="rw" data-toast="1"><span class="mid"><div class="t" style="color:#b13a2c">Alle Daten löschen</div></span>'+CHEV+'</button></div>';
 return h;
}
function render(){
 var top=body.scrollTop;
 body.innerHTML=state.tab==='v'?viewV():state.tab==='z'?viewZ():viewK();
 body.scrollTop=top;
 [].forEach.call(document.querySelectorAll('.tabs button'),function(b){b.setAttribute('aria-selected',b.getAttribute('data-tab')===state.tab);});
}
body.addEventListener('click',function(e){
 var t=e.target.closest('[data-acc],[data-f],[data-toast]');if(!t)return;
 if(t.hasAttribute('data-acc')){var id=t.getAttribute('data-acc');state.open=state.open===id?'':id;render();}
 else if(t.hasAttribute('data-f')){state.filter=t.getAttribute('data-f');render();}
 else say('Das geht nur in der echten App.');
});
[].forEach.call(document.querySelectorAll('.tabs button'),function(b){b.addEventListener('click',function(){state.tab=b.getAttribute('data-tab');body.scrollTop=0;render();});});
render();
})();
