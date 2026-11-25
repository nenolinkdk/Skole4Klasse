/* ============ FÆLLES MOTOR: status, belønninger, mastering ============ */
"use strict";

var STANDARD = {
  stjerner: 0, trofæer: 0,
  områder: {
    laesning: {niveau:1, mestrede:[], fejl:[], streaks:{}},
    stavning: {niveau:1, mestrede:[], fejl:[], streaks:{}},
    bogstaver:{niveau:1, mestrede:[], fejl:[], streaks:{}},
    synonym:  {niveau:1, mestrede:[], fejl:[], streaks:{}},
    matematik:{niveau:1, mestrede:[], fejl:[], streaks:{}},
    nyheder:  {niveau:1, mestrede:[], fejl:[], streaks:{}},
    ai:       {niveau:1, mestrede:[], fejl:[], streaks:{}}
  },
  indstillinger: { navn:"", konfetti:true, prrunde:4 },
  historier: [], tegneserier: []
};
function gem(d){ try{ localStorage.setItem("skriv-laer", JSON.stringify(d)); }catch(e){} }
function hent(){
  try{
    var d = JSON.parse(localStorage.getItem("skriv-laer"));
    if(d && d.områder){
      /* migration: tilføj nye områder til gemte fremskridt */
      Object.keys(STANDARD.områder).forEach(function(k){
        if(!d.områder[k]) d.områder[k] = {niveau:1, mestrede:[], fejl:[], streaks:{}};
      if(d.områder[k].niveau>3) d.områder[k].niveau = 3;
      if(!d.områder[k].sete) d.områder[k].sete = [];
      });
      /* migration: sørg for at indstillinger altid findes */
      if(!d.indstillinger) d.indstillinger = {};
      Object.keys(STANDARD.indstillinger).forEach(function(k){
        if(typeof d.indstillinger[k] === "undefined") d.indstillinger[k] = STANDARD.indstillinger[k];
      });
      return d;
    }
  }catch(e){}
  return JSON.parse(JSON.stringify(STANDARD));
}
var S = hent();

var NIV = {1:{behov:4,navn:"Begynder"},2:{behov:7,navn:"Øvet"},3:{behov:99,navn:"Ekspert"}};

function opdaterHUD(){
  var a=document.getElementById("hud-stjerner"), b=document.getElementById("hud-trofæer");
  if(a) a.textContent = S.stjerner;
  if(b) b.textContent = S.trofæer;
  gem(S);
}
function givStjerner(n, lavKonfetti){
  var før = Math.floor(S.stjerner/10);
  S.stjerner += n;
  var efter = Math.floor(S.stjerner/10);
  if(efter > før && efter <= 12){ S.trofæer = efter; }
  opdaterHUD();
  if(lavKonfetti && S.indstillinger.konfetti !== false) konfetti();
}
function konfetti(){
  var svg = document.getElementById("konfetti");
  if(!svg) return;
  svg.innerHTML=""; svg.style.display="block";
  var farver=["#ff9f1c","#2e9e4f","#2f6fd6","#8e5bd6","#ffd23f","#e63946"];
  var antal=0;
  var id=setInterval(function(){
    for(var i=0;i<6;i++){
      var x=Math.random()*100, c=farver[Math.floor(Math.random()*farver.length)];
      var xmlns="http://www.w3.org/2000/svg";
      var f=document.createElementNS(xmlns,"rect");
      f.setAttribute("x",x+"%");f.setAttribute("y","-20");f.setAttribute("width",10);
      f.setAttribute("height",14);f.setAttribute("fill",c);
      var an=document.createElementNS(xmlns,"animate");
      an.setAttribute("attributeName","y");an.setAttribute("from",-20);an.setAttribute("to","110%");
      an.setAttribute("dur",(1.4+Math.random())+"s");an.setAttribute("fill","freeze");
      f.appendChild(an);svg.appendChild(f);
    }
    antal++; if(antal>7){clearInterval(id); setTimeout(function(){svg.innerHTML="";svg.style.display="none";},2500);}
  },120);
}

/* ---- overlay (status / forældre / for-svært / gemte ting) ---- */
var overlay = document.getElementById("overlay");
var overlayInd = document.getElementById("overlay-indhold");
function vis(titel, html){
  overlayInd.innerHTML = "<h2>"+titel+"</h2><button class='btn rød' onclick='lukOverlay()'>Luk ✖</button><br><br>"+html;
  overlay.classList.add("åben");
}
function lukOverlay(){ overlay.classList.remove("åben"); }
if(overlay){ overlay.addEventListener("click", function(e){ if(e.target===overlay) lukOverlay(); }); }

/* ---- "For svært?"-knap: forklaring til afsnittet ---- */
function svaerKnap(nøgle){
  return "<button class='btn orange' style='padding:6px 14px;font-size:.85rem;margin-top:8px' onclick='visHjælp(\""+nøgle+"\")'>❓ For svært?</button>";
}
function visHjælp(nøgle){
  var h = HJAELP[nøgle];
  if(!h) return;
  vis((h.ikon||"❓")+" "+h.titel, h.html);
}

/* ---- "Spring over" + "Vis svaret": man kan ALTID komme videre ---- */
function tilføjSpringOver(container, område, o, næste, fbEl, svarTekst, lås){
  var dummy = {className:"", innerHTML:""};
  var sp = document.createElement("button");
  sp.className="btn grå"; sp.style.marginTop="10px"; sp.textContent="⏭️ Spring over";
  var vs = document.createElement("button");
  vs.className="btn orange"; vs.style.marginTop="10px"; vs.style.marginLeft="8px"; vs.textContent="🏳️ Vis svaret";
  var færdig = false;
  function slut(vis){
    if(færdig) return; færdig=true;
    registrér(område, o.id, false, dummy, "", "");
    if(fbEl){
      fbEl.className="feedback";
      fbEl.innerHTML = (vis?
        "Svaret er: <b>"+svarTekst+"</b> – kig godt på det, så kan du nemmere næste gang! 👀" :
        "Du sprang opgaven over – helt okay!") +
        " Opgaven kommer igen senere. 💪";
    }
    if(lås) lås.disabled = true;
    sp.disabled = true; vs.disabled = true;
    var v = document.createElement("button");
    v.className="btn blå"; v.style.marginTop="10px"; v.style.marginLeft="8px"; v.textContent="Videre ➡️";
    v.onclick = næste;
    container.appendChild(v);
  }
  sp.onclick=function(){ slut(false); };
  vs.onclick=function(){ slut(true); };
  container.appendChild(sp);
  container.appendChild(vs);
}

/* ---- "Hjælp mig med ordet": hints uden at afsløre hele svaret ---- */
function tilføjHint(container, o, slags, valgKnapper){
  var dv = document.createElement("div");
  dv.style.marginTop="8px";
  var h = document.createElement("button");
  h.className="btn orange"; h.style.marginTop="8px"; h.style.marginLeft="8px"; h.textContent="💡 Hjælp mig med ordet";
  var trin = 0;
  h.onclick = function(){
    trin++;
    if(slags==="ord"){
      /* stavning: først bogstav+længde, derefter halvt ord */
      var mål = String(o.led||o.ord||"").toLowerCase();
      if(trin===1){
        dv.innerHTML = "<p class='tagline'>💡 Ordet starter med „"+mål.charAt(0)+"“ og har "+mål.length+" bogstaver.</p>";
        h.textContent = "💡 Et hint mere";
      } else {
        var vist = mål.split("").map(function(c,i){ return i<Math.ceil(mål.length/2)? c : "_"; }).join("");
        dv.innerHTML = "<p class='tagline'>💡 Nu kan du næsten se ordet: <b>"+vist+"</b> – prøv at gætte resten!</p>";
        h.remove();
      }
    } else if(slags==="synvalg"){
      /* synonym med valgknapper: ét forkert ord grås ud pr. klik */
      var forkerte = (valgKnapper||[]).filter(function(k){ return o.svar.indexOf(k.m)<0 && !k.btn.disabled; });
      var tilbage = (valgKnapper||[]).filter(function(k){ return !k.btn.disabled; });
      if(forkerte.length>1){
        var k = forkerte[0];
        k.btn.disabled = true; k.btn.style.opacity = ".35"; k.btn.style.textDecoration = "line-through";
        dv.innerHTML = "<p class='tagline'>💡 Jeg har streget ét ord over, som i hvert fald ikke passer. Kig på de andre!</p>";
        if((valgKnapper||[]).filter(function(x){ return !x.btn.disabled; }).length<=2) h.remove();
      } else {
        var s = String(o.svar[0]||"").toLowerCase();
        dv.innerHTML = "<p class='tagline'>💡 Nu er der kun ét godt bud tilbage – prøv at klikke på det!</p>";
        h.remove();
      }
    } else if(slags==="synskriv"){
      /* synonym-skriv: første bogstav, derefter to bogstaver */
      var s2 = String(o.svar[0]||"").toLowerCase();
      if(trin===1){
        dv.innerHTML = "<p class='tagline'>💡 Et rigtigt ord starter med „"+s2.charAt(0)+"“ og har "+s2.length+" bogstaver.</p>";
        h.textContent = "💡 Et hint mere";
      } else {
        dv.innerHTML = "<p class='tagline'>💡 Ordet begynder med <b>"+s2.slice(0,2)+"…</b> – kan du gætte det nu?</p>";
        h.remove();
      }
    } else if(slags==="regel"){
      /* store/små bogstaver: først reglen, derefter ordene med viste forbogstaver */
      if(trin===1){
        dv.innerHTML = "<p class='tagline'>💡 "+o.forklaring+"</p>";
        h.textContent = "💡 Et hint mere";
      } else {
        var vist2 = o.svar.split(/\s+/).map(function(w){
          return w.charAt(0).toUpperCase() + w.replace(/\S/g,"_").slice(1);
        }).join(" ");
        dv.innerHTML = "<p class='tagline'>💡 Nu kan du se, hvor ordene skal have stort bogstav: <b>"+vist2+"</b></p>";
        h.remove();
      }
    }
  };
  container.appendChild(h);
  container.appendChild(dv);
}

/* ---- mastering-motor: 3 rigtige i træk = mestret; fejl gentages ---- */
function registrér(område, id, rigtigt, feedbackEl, godtTekst, skidtTekst){
  var d = S.områder[område];
  d.streaks = d.streaks || {};
  if(rigtigt){
    d.streaks[id] = (d.streaks[id]||0)+1;
    var i = d.fejl.indexOf(id); if(i>=0) d.fejl.splice(i,1);
    givStjerner(1,false);
    feedbackEl.className = "feedback god";
    feedbackEl.innerHTML = godtTekst + " (+1 stjerne 🌟)";
    if(d.streaks[id]>=3 && d.mestrede.indexOf(id)<0){
      d.mestrede.push(id);
      givStjerner(2,false);
      feedbackEl.innerHTML += " 🎉 DU HAR MESTRET OPGAVEN! (+2 stjerner)";
      var liste = dataFor(område);
      var påNiveauMestrede = d.mestrede.filter(function(id2){
        var x = liste.filter(function(t){return t.id===id2;})[0];
        return x && x.niveau<=d.niveau;
      }).length;
      if(påNiveauMestrede >= NIV[d.niveau].behov && d.niveau<3){
        d.niveau++;
        feedbackEl.innerHTML += " 🚀 <b>Nyt niveau: "+d.niveau+" – "+NIV[d.niveau].navn+"!</b>";
        if(S.indstillinger.konfetti!==false) konfetti();
      }
    }
  } else {
    d.streaks[id]=0;
    if(d.fejl.indexOf(id)<0) d.fejl.push(id);
    feedbackEl.className = "feedback skidt";
    feedbackEl.innerHTML = skidtTekst + " Opgaven kommer igen senere – øve gør mester! 💪 Eller tryk på '❓ For svært?' og få en forklaring.";
  }
  opdaterHUD();
}

function vælgElementer(liste, område){
  var d = S.områder[område];
  if(!d.sete) d.sete = [];
  var sete = d.sete;
  function ikkeMestret(x){ return d.mestrede.indexOf(x.id)<0; }
  function erFejl(x){ return d.fejl.indexOf(x.id)>=0; }
  function erSet(x){ return sete.indexOf(x.id)>=0; }
  function useteFørst(a,b){ return (erSet(a)?1:0)-(erSet(b)?1:0); }
  var fejl = liste.filter(function(x){ return erFejl(x); }).sort(useteFørst);
  var påNiveau = liste.filter(function(x){ return !erFejl(x) && ikkeMestret(x) && x.niveau===d.niveau; }).sort(useteFørst);
  var lavere = liste.filter(function(x){ return !erFejl(x) && ikkeMestret(x) && x.niveau<d.niveau; }).sort(useteFørst);
  var ud = fejl.slice(0,2).concat(påNiveau.slice(0,3)).concat(lavere.slice(0,1));
  function ny(x){ return ud.indexOf(x)<0; }
  if(ud.length<4) ud = ud.concat(liste.filter(function(x){ return ikkeMestret(x) && ny(x); }).sort(useteFørst).slice(0,4-ud.length));
  if(ud.length<3) ud = ud.concat(liste.filter(function(x){ return ny(x); }).sort(useteFørst).slice(0,3-ud.length));
  return ud;
}
/* efter en runde: markér opgaverne som 'sete', så de ikke kommer igen med det samme */
function markérSete(område, opgaver){
  var d = S.områder[område];
  if(!d.sete) d.sete = [];
  opgaver.forEach(function(o){
    if(d.sete.indexOf(o.id)<0) d.sete.push(o.id);
  });
  /* er ALLE opgaver i området set, starter vi forfra – men mestrede holdes ude */
  var liste = dataFor(område).filter(function(x){ return d.mestrede.indexOf(x.id)<0; });
  var alleSet = liste.every(function(x){ return d.sete.indexOf(x.id)>=0; });
  if(alleSet && liste.length>0) d.sete = [];
  gem(S);
}

/* ---- emne-filter + runde-afvikling (bruges på øve-siderne) ---- */
var valgtEmne = null;
function tegnEmnevalg(container, område, påVælg){
  container.innerHTML = "";
  var mulige = [{id:null,navn:"Alle"}].concat(EMNER);
  mulige.forEach(function(e){
    var b=document.createElement("button");
    b.className = "emne" + (valgtEmne===e.id? " valgt":"");
    b.textContent = e.navn;
    b.onclick = function(){ valgtEmne = (valgtEmne===e.id? null : e.id); påVælg(); };
    container.appendChild(b);
  });
}
function kørRunde(område, appEl){
  var liste = dataFor(område);
  var pulje = liste.filter(function(x){ return valgtEmne===null || x.emne===valgtEmne; });
  if(pulje.length<3) pulje = liste.filter(function(x){ return S.områder[område].mestrede.concat(S.områder[område].fejl).indexOf(x.id)<0; });
  if(pulje.length<3) pulje = liste;
  var opgaver = vælgElementer(pulje, område).slice(0, S.indstillinger.prrunde || 4);
  markérSete(område, opgaver);
  if(opgaver.length===0){
    appEl.innerHTML += "<div class='kasse' style='text-align:center'><h2>🎉 Du har mestret alt på dette niveau!</h2><p>Fantastisk arbejde. Vælg et andet område på forsiden.</p><a class='btn grøn' href='index.html'>🏠 Til forsiden</a></div>";
    return;
  }
  var holder = document.createElement("div");
  appEl.appendChild(holder);
  var idx=0;
  function næste(){
    if(idx>=opgaver.length){ færdig(område,holder); return; }
    var o = opgaver[idx++];
    if(område==="laesning") visLæsning(o,holder,næste,"laesning");
    else if(område==="stavning") visStavning(o,holder,næste);
    else if(område==="bogstaver") visBogstaver(o,holder,næste);
    else if(område==="synonym") visSynonym(o,holder,næste);
    else if(område==="matematik") visRegning(o,holder,næste);
    else if(område==="nyheder") visLæsning(o,holder,næste,"nyheder");
    else if(område==="ai") visQuiz(o,holder,næste);
    else visLæsning(o,holder,næste,område);
  }
  næste();
}

/* ---- MATEMATIK: tal-opgave med inputfelt ---- */
function visRegning(o,holder,næste){
  holder.innerHTML = "<div class='kasse'>"+
    "<h3 style='margin-top:0'>➗ Regneopgave <span class='lvlbadge'>Niveau "+o.niveau+"</span></h3>"+
    "<p style='font-size:1.1rem;line-height:1.6'>"+o.opgave+"</p>"+
    "<input class='tekst' id='sv-felt' placeholder='Skriv dit svar her…' style='font-size:1.2rem;text-align:center'>"+ 
    "<div class='feedback' id='fb'></div><div id='vh'></div><div id='knapper'></div>"+
    svaerKnap("matematik")+"</div>";
  document.getElementById("sv-felt").focus();
  function tegnVink(){ document.getElementById("vh").innerHTML = "<p class='tagline'>💡 "+o.vink+"</p>"; }
  var vink = document.createElement("button");
  vink.className="btn orange"; vink.style.marginTop="8px"; vink.textContent="💡 Få et vink";
  vink.onclick = tegnVink;
  var b = document.createElement("button");
  b.className="btn grøn"; b.style.marginLeft="8px"; b.style.marginTop="8px"; b.textContent="Tjek mit svar ✅";
  b.onclick = function(){
    var gæt = (document.getElementById("sv-felt").value||"").trim().replace(/\s+/g,"");
    var fb = document.getElementById("fb");
    if(!gæt){ fb.className="feedback skidt"; fb.textContent="Skriv et svar først 😉"; return; }
    var norm = gæt.replace(/,/g,".").toLowerCase();
    var normal = o.svar.map(function(s){ return String(s).trim().toLowerCase(); });
    var rig = normal.indexOf(norm)>=0 || normal.indexOf(gæt.toLowerCase())>=0 ||
              normal.map(function(s){return s.replace(/\./g,"");}).indexOf(norm.replace(/\./g,""))>=0;
    registrér("matematik", o.id, rig, fb, "Rigtigt! 🎉 Regnet helt rigtigt.", "Ikke helt. Prøv igen, eller tryk på 'Få et vink' herunder.");
    if(!rig){ tegnVink(); }
    var videre = document.createElement("button");
    videre.className="btn blå"; videre.style.marginTop="10px"; videre.textContent = rig? "Næste opgave ➡️":"Prøv igen / videre ➡️";
    videre.onclick = næste;
    document.getElementById("vh").appendChild(videre);
    b.disabled=true;
  };
  var knapper = document.getElementById("knapper");
  knapper.appendChild(document.createElement("br"));
  knapper.appendChild(vink);
  knapper.appendChild(b);
  tilføjSpringOver(knapper, "matematik", o, næste, document.getElementById("fb"), o.svar[0]+" (vink: "+o.vink+")", b);
}

/* ---- AI: quiz med multiple choice + forklaring ---- */
function visQuiz(o,holder,næste){
  holder.innerHTML = "<div class='kasse'>"+
    "<h3 style='margin-top:0'>🤖 "+o.titel+"</h3>"+
    "<div class='læsetekst'>"+o.tekst+"</div>"+
    "<p style='font-size:1.1rem'><b>"+o.spørgsmål+"</b></p>"+
    "<div id='valg'></div><div class='feedback' id='fb'></div><div id='fk'></div>"+
    svaerKnap("ai")+"</div>";
  var gjort=false;
  o.muligheder.forEach(function(m){
    var btn=document.createElement("button");
    btn.className="mulighed"; btn.textContent=m;
    btn.onclick=function(){
      if(gjort)return;
      gjort=true;
      var rig = o.svar.indexOf(m)>=0;
      btn.classList.add(rig? "rigtig":"forkert");
      var fb=document.getElementById("fb");
      registrér("ai", o.id, rig, fb, "Rigtigt! 🎉", "Ikke helt – se forklaringen herunder, og prøv at huske den til næste gang.");
      document.getElementById("fk").innerHTML = "<p class='tagline'>💡 "+o.forklaring+"</p>";
      var videre = document.createElement("button");
      videre.className="btn blå"; videre.style.marginTop="10px"; videre.textContent = rig? "Næste spørgsmål ➡️":"Videre ➡️";
      videre.onclick = næste;
      document.getElementById("fk").appendChild(videre);
    };
    document.getElementById("valg").appendChild(btn);
  });
  tilføjSpringOver(document.getElementById("valg"), "ai", o, næste, document.getElementById("fb"), o.svar.join(" / "), null);
}
function færdig(område,holder){
  holder.innerHTML = "<div class='kasse' style='text-align:center;background:linear-gradient(135deg,#fff9e6,#e6f9ec)'>"+
   "<h2>Færdig! 🎉</h2><p>Sådan! Du har taget en hel runde. Du har nu <b>"+S.stjerner+"</b> stjerner og <b>"+S.trofæer+"</b> trofæer.</p>"+
   "<button class='btn grøn' onclick='location.reload()'>Kør en runde mere</button>"+
   "<a class='btn blå' href='index.html' style='margin-left:8px'>🏠 Til forsiden</a></div>";
  if(S.indstillinger.konfetti !== false) konfetti();
}

/* ============ OPGAVELÆSNING ============ */
/* ============ OPFÆLDELSE: LÆSNING (bruges også af NYHEDER via område-param) ============ */
function visLæsning(o,holder,næste,område){
  område = område||"laesning";
  holder.innerHTML = "<div class='kasse'>"+
    "<h3>📖 "+o.titel+" <span class='lvlbadge'>"+(område==="nyheder"? "📰 Nyhed" : EMNE[o.emne])+"</span></h3>"+
    "<div class='læsetekst'>"+o.tekst+"</div>"+
    "<div id='spm'></div>"+svaerKnap(område)+"</div>";
  var spmEl = document.getElementById("spm");
  o.spm.forEach(function(sp,i){
    var d = document.createElement("div");
    d.innerHTML = "<p style='margin-top:14px'><b>"+(i+1)+". "+sp.q+"</b></p>"+
      "<input class='tekst' id='s"+i+"' placeholder='Skriv dit svar her…'><div class='feedback' id='f"+i+"'></div>";
    spmEl.appendChild(d);
  });
  var b = document.createElement("button");
  b.className="btn grøn"; b.textContent="Tjek mine svar ✅";
  b.onclick = function(){
    var nogenUdfyldt=false, alleIkkerigtig=true;
    o.spm.forEach(function(sp,i){
      var input = document.getElementById("s"+i), fb=document.getElementById("f"+i);
      var gæt = (input.value||"").trim().toLowerCase();
      if(!gæt){ return; }
      nogenUdfyldt=true;
      var normal = sp.svar.map(function(s){return s.toLowerCase();});
      var rig;
      if(sp.fri){
        rig = normal.some(function(s){ return gæt.indexOf(s)>=0; }) || gæt.split(/\s+/).some(function(w){ return normal.some(function(n){ return n.indexOf(w)>=0 || w.indexOf(n)>=0; }); });
        if(normal.length===0) rig = gæt.length>=10;
      } else {
        rig = normal.indexOf(gæt)>=0;
      }
      if(rig){ fb.className="feedback god"; fb.innerHTML="✅ Rigtigt! Godt svaret."; }
      else { fb.className="feedback skidt"; fb.innerHTML="Hmm, ikke helt. Læs sætningen igen, og prøv at sætte ordene sammen på en anden måde."; alleIkkerigtig=false; }
    });
    if(!nogenUdfyldt){ b.textContent="Udfyld svarene først 😉"; return; }
    var fb0 = document.getElementById("f0");
    registrér(område, o.id, alleIkkerigtig, fb0, "Flot arbejdet med hele teksten!", "Nogle svar skal lige rettes:");
    if(alleIkkerigtig){ fb0.innerHTML += " Klar til næste tekst!"; }
    var videre = document.createElement("button");
    videre.className="btn blå"; videre.style.marginTop="10px";
    videre.textContent = alleIkkerigtig? "Næste tekst ➡️":"Videre ➡️ (du kan også scrolle op og rette)";
    videre.onclick = næste;
    spmEl.appendChild(videre);
    b.disabled=true;
  };
  spmEl.appendChild(b);
  tilføjSpringOver(spmEl, område, o, næste, document.getElementById("f0"),
    o.spm.map(function(sp){ return sp.svar[0]; }).join(" · "), b);
}

/* ============ STAVNING ============ */
function visStavning(o,holder,næste){
  holder.innerHTML = "<div class='kasse'>"+
    "<h3>✏️ Stav ordet rigtigt <span class='lvlbadge'>"+EMNE[o.emne]+"</span></h3>"+
    "<p style='font-size:1.15rem'>"+o.sætn.replace("___","<b>____</b>")+"</p>"+
    "<input class='tekst' id='gæt' placeholder='Skriv ordet, der mangler…' autocomplete='off'>"+
    "<div class='feedback' id='fb'></div>"+svaerKnap("stavning")+"</div>";
  var gæt = document.getElementById("gæt");
  gæt.focus();
  var b=document.createElement("button"); b.className="btn grøn"; b.style.marginTop="10px"; b.textContent="Tjek ✅";
  function tjek(){
    var v = gæt.value.trim().toLowerCase();
    var fb = document.getElementById("fb");
    if(!v){ return; }
    var mål = (o.led||o.ord).toLowerCase();
    var rig = v===mål;
    if(!rig){
      var diff="";
      for(var i=0;i<Math.max(v.length,mål.length);i++){
        diff += (v[i]===mål[i]) ? (mål[i]||"") : "<span style='color:#e63946;text-decoration:underline'>"+(v[i]||"␣")+"</span>";
      }
      fb.className="feedback skidt";
      fb.innerHTML="Ikke helt endnu. Dine fejl er markeret med rødt: <br>"+diff+"<br>Vink: ordet starter med „"+mål.charAt(0)+"“ og har "+mål.length+" bogstaver.";
    }
    registrér("stavning", o.id, rig, fb, "✅ Rigtigt stavet!", "❌ Prøv igen: ");
    if(rig){
      var v2=document.createElement("button"); v2.className="btn blå"; v2.style.marginTop="10px"; v2.textContent="Næste ord ➡️"; v2.onclick=næste;
      holder.firstChild.appendChild(v2); b.disabled=true;
    } else { gæt.value=""; gæt.focus(); }
  }
  b.onclick=tjek;
  gæt.addEventListener("keydown",function(e){ if(e.key==="Enter") tjek(); });
  holder.firstChild.appendChild(b);
  tilføjSpringOver(holder.firstChild, "stavning", o, næste, document.getElementById("fb"), (o.led||o.ord), b);
  tilføjHint(holder.firstChild, o, "ord");
}

/* ============ STORE/SMÅ BOGSTAVER ============ */
function visBogstaver(o,holder,næste){
  holder.innerHTML = "<div class='kasse'>"+
    "<h3>🔤 Ret teksten: store & små bogstaver <span class='lvlbadge'>"+EMNE[o.emne]+"</span></h3>"+
    "<p>Her er en tekst, hvor nogle bogstaver er <b>for små</b>. Skriv teksten helt rigtigt i feltet.</p>"+
    "<div class='læsetekst' style='border-color:#6cc4f2'>"+o.fejl+"</div>"+
    "<input class='tekst' id='gæt' style='margin-top:12px' placeholder='Skriv teksten rigtigt her…'>"+
    "<div class='feedback' id='fb'></div>"+svaerKnap("bogstaver")+"</div>";
  var gæt=document.getElementById("gæt"); gæt.focus();
  var b=document.createElement("button"); b.className="btn grøn"; b.style.marginTop="10px"; b.textContent="Tjek ✅";
  function tjek(){
    var v=gæt.value.trim();
    if(!v){ return; }
    var fb=document.getElementById("fb");
    var rig = v===o.svar;
    if(rig){ fb.className="feedback god"; fb.innerHTML="✅ Perfekt! "+o.forklaring; }
    else {
      var diff="";
      for(var i=0;i<Math.max(v.length,o.svar.length);i++){
        diff += (v[i]===o.svar[i]) ? (o.svar[i]||"") : "<span style='color:#e63946;text-decoration:underline'>"+(v[i]||"␣")+"</span>";
      }
      fb.className="feedback skidt";
      fb.innerHTML="Næsten! Se, hvor det skriver sig galt: <br>"+diff+"<br><span style='font-size:.85rem'>Vink: "+o.forklaring+"</span>";
    }
    registrér("bogstaver", o.id, rig, fb, "Helt rigtigt!", "Prøv igen – kig på de røde bogstaver.");
    if(rig){
      var v2=document.createElement("button"); v2.className="btn blå"; v2.style.marginTop="10px"; v2.textContent="Næste tekst ➡️"; v2.onclick=næste;
      holder.firstChild.appendChild(v2); b.disabled=true;
    } else gæt.focus();
  }
  b.onclick=tjek;
  gæt.addEventListener("keydown",function(e){ if(e.key==="Enter") tjek(); });
  holder.firstChild.appendChild(b);
  tilføjSpringOver(holder.firstChild, "bogstaver", o, næste, document.getElementById("fb"), o.svar, b);
  tilføjHint(holder.firstChild, o, "regel");
}

/* ============ SYNONYMER ============ */
function visSynonym(o,holder,næste){
  var type = o.type || "vælg";
  if(type==="ikke"){
    holder.innerHTML = "<div class='kasse'>"+
      "<h3>💬 Hvilket ord hører IKKE hjemme? <span class='lvlbadge'>"+EMNE[o.emne]+"</span></h3>"+
      "<p>"+o.sætn+"<br>Næsten alle ordene i listen betyder næsten det samme, men <b>ét ord</b> betyder noget helt andet. Klik på det ord, der <b>ikke</b> hører til!</p>"+
      "<div id='valg'></div><div class='feedback' id='fb'></div>"+svaerKnap("synonym")+"</div>";
    } else if(type==="skriv"){
    holder.innerHTML = "<div class='kasse'>"+
      "<h3>💬 Skriv selv et synonym <span class='lvlbadge'>"+EMNE[o.emne]+"</span></h3>"+
      "<p style='font-size:1.1rem'>Sætningen er: <i>“"+o.sætn+"”</i><br>"+
      "Skriv ét ord, der betyder næsten det samme som <b>"+o.ord+"</b>. Der er flere rigtige svar!</p>"+
      "<input class='tekst' id='syn-svar' placeholder='Skriv dit ord her…'><div class='feedback' id='fb'></div><div id='vh'></div>"+
      svaerKnap("synonym")+"</div>";
    var bs=document.createElement("button");
    bs.className="btn grøn"; bs.style.marginTop="8px"; bs.textContent="Tjek mit ord ✅";
    bs.onclick=function(){
      var gæt=(document.getElementById("syn-svar").value||"").trim().toLowerCase().replace(/[.!?,]/g,"");
      var fb=document.getElementById("fb");
      if(!gæt){ fb.className="feedback skidt"; fb.textContent="Skriv et ord først 😉"; return; }
      var rig=o.svar.some(function(sv){ return sv.toLowerCase()===gæt; });
      registrér("synonym", o.id, rig, fb,
        "Smukt! '"+gæt+"' betyder det samme som '"+o.ord+"'.",
        "Ikke det ord denne gang. Rigtige svar kunne være: "+o.svar.slice(0,3).join(", ")+".");
      bs.disabled=true;
      var v2=document.createElement("button"); v2.className="btn blå"; v2.style.marginTop="10px"; v2.style.marginLeft="8px"; v2.textContent="Næste ord ➡️"; v2.onclick=næste;
      document.getElementById("vh").appendChild(v2);
    };
    document.getElementById("vh").appendChild(bs);
    tilføjSpringOver(document.getElementById("vh"), "synonym", o, næste, document.getElementById("fb"), o.svar.slice(0,3).join(" eller "), bs);
    tilføjHint(document.getElementById("vh"), o, "synskriv");
    return;
  } else {
    holder.innerHTML = "<div class='kasse'>"+
      "<h3>💬 Kan man sige det i stedet? <span class='lvlbadge'>"+EMNE[o.emne]+"</span></h3>"+
      "<p style='font-size:1.1rem'>Sætningen er: <i>“"+o.sætn+"”</i><br>"+
      "Find ordet i listen, der betyder næsten det samme som <b>"+o.ord+"</b>. Klik på ét!</p>"+
      "<div id='valg'></div><div class='feedback' id='fb'></div>"+svaerKnap("synonym")+"</div>";
  }
  var valg=document.getElementById("valg");
  var muligheder=o.muligheder.slice().sort(function(){return Math.random()-0.5;});
  var gjort=false;
  var valgKnapper = [];
  muligheder.forEach(function(m){
    var btn=document.createElement("button");
    btn.className="mulighed"; btn.textContent=m;
    valgKnapper.push({m:m, btn:btn});
    btn.onclick=function(){
      if(gjort)return;
      var rig=o.svar.indexOf(m)>=0;
      btn.classList.add(rig? "rigtig":"forkert");
      var fb=document.getElementById("fb");
      if(rig){
        fb.className="feedback god";
        fb.innerHTML = type==="ikke"?
          "✅ Rigtigt! <b>"+m+"</b> betyder noget helt andet – det hørte ikke hjemme." :
          "✅ Ja! <b>"+m+"</b> kan man sige i stedet for <b>"+o.ord+"</b> i denne sætning.";
        gjort=true;
      } else {
        fb.className="feedback skidt";
        fb.innerHTML = type==="ikke"?
          "❌ <b>"+m+"</b> betyder faktisk det samme – led efter ordet, der ikke passer ind." :
          "❌ <b>"+m+"</b> betyder noget andet end <b>"+o.ord+"</b>. Prøv et andet ord!";
      }
      registrér("synonym", o.id, rig, fb, "Du kendte ordet!", "Rod ikke – ordene ligner hinanden. Prøv igen:");
      if(rig){
        var v2=document.createElement("button"); v2.className="btn blå"; v2.style.marginTop="10px"; v2.textContent="Næste ord ➡️"; v2.onclick=næste;
        holder.firstChild.appendChild(v2);
      }
    };
    valg.appendChild(btn);
  });
  tilføjSpringOver(valg, "synonym", o, næste, document.getElementById("fb"), o.svar.join(" / "), null);
  tilføjHint(valg, o, "synvalg", valgKnapper);
}

/* ============ DOWNLOAD (gem til fil) ============ */
function downloadTekst(filnavn, tekst){
  var blob = new Blob([tekst], {type:"text/plain;charset=utf-8"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href=url; a.download=filnavn;
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); },500);
}
function genererHistoriebogTekst(){
  var linjer = ["MIN HISTORIEBOG – Skriv & Lær","================================",""];
  S.historier.forEach(function(h,i){
    linjer.push((i+1)+". "+h.titel+"  ("+new Date(h.dato).toLocaleDateString("da-DK")+", "+EMNE[h.emne||"dagligdag"]+")");
    linjer.push(h.tekst); linjer.push("");
  });
  if(!S.historier.length) linjer.push("(Ingen historier gemt endnu)");
  linjer.push("MINE TEGNESERIER","================================");
  S.tegneserier.forEach(function(t,i){
    linjer.push((i+1)+". "+t.serie+"  ("+new Date(t.dato).toLocaleDateString("da-DK")+")");
    linjer.push(t.figur1+": \""+t.tekst1+"\"");
    linjer.push(t.figur2+": \""+t.tekst2+"\""); linjer.push("");
  });
  if(!S.tegneserier.length) linjer.push("(Ingen tegneserier gemt endnu)");
  return linjer.join("\n");
}
function gemAltSomFil(){
  var txt = genererHistoriebogTekst()+"\n\nMIN STATUS\n================================\n"+
    "Stjerner: "+S.stjerner+"\nTrofæer: "+S.trofæer+"/12\n"+
    ALLE_OMRAADER.map(function(o){
      return OMRAADE_NAVNE[o]+": niveau "+S.områder[o].niveau+" ("+NIV[S.områder[o].niveau].navn+"), "+S.områder[o].mestrede.length+" mestrede opgaver";
    }).join("\n");
  downloadTekst("min-skriv-og-laer.txt", txt);
}
var OMRAADE_NAVNE = {laesning:"Læsning",stavning:"Stavning",bogstaver:"Store/små bogstaver",synonym:"Synonymer",matematik:"Matematik",nyheder:"Nyheder",ai:"Om AI"};
var ALLE_OMRAADER = ["laesning","stavning","bogstaver","synonym","matematik","nyheder","ai"];

/* ============ STATUS-VISNING (bruges på alle sider) ============ */
function visStatus(){
  var rows = "";
  ALLE_OMRAADER.forEach(function(o){
    var d=S.områder[o];
    rows += "<div class='statrow'><span>"+OMRAADE_NAVNE[o]+"</span><b>Niveau "+d.niveau+" ("+NIV[d.niveau].navn+") · "+d.mestrede.length+" mestrede</b></div>";
  });
  var hist = S.historier.map(function(h,i){return "<option value='"+i+"'>"+h.titel+"</option>";}).join("");
  var sidste = S.tegneserier.length? S.tegneserier[S.tegneserier.length-1] : null;
  vis("📊 Din status", ""+
   "<div style='display:grid;grid-template-columns:1fr 1fr;gap:12px'>"+
   "<div style='background:#eef2f8;border-radius:12px;padding:12px'><h3>🌟 Stjerner</h3><div style='font-size:1.6rem'><b>"+S.stjerner+"</b></div></div>"+
   "<div style='background:#eef2f8;border-radius:12px;padding:12px'><h3>🎁 Trofæer</h3><div style='font-size:1.3rem'>"+("🏅".repeat(S.trofæer)||"Ingen endnu – klø på!")+"</div></div></div>"+
   "<h3>Færdigheder</h3><div class='rows'>"+rows+"</div>"+
   "<h3>📚 Din historiebog ("+S.historier.length+")</h3>"+
   (S.historier.length? "<select id='hist-sel'>"+hist+"</select> <button class='btn blå' onclick='visHistorie()'>Åbn</button>" : "<p>Du har ikke skrevet nogen historier endnu. Prøv Kreativ skrivning! 🪄</p>")+
   "<h3>🗣️ Gemte tegneserier ("+S.tegneserier.length+")</h3>"+
   (sidste? "<p>Den sidste gemte serie er <b>"+sidste.serie+"</b> ("+new Date(sidste.dato).toLocaleDateString("da-DK")+")</p>" : "<p>Ingen gemte serier endnu.</p>")+
   "<h3>💾 Gem alt på din computer</h3><p><button class='btn lilla' onclick='gemAltSomFil()'>Download historiebog, serier og status (.txt)</button></p>"
  );
}
function visHistorie(){
  var i = +document.getElementById("hist-sel").value;
  var h = S.historier[i];
  vis("📚 "+h.titel, "<p class='tagline'>"+new Date(h.dato).toLocaleDateString("da-DK")+"</p><div style='white-space:pre-wrap;background:#fbf7ec;padding:14px;border-radius:12px'>"+h.tekst.replace(/</g,"&lt;")+"</div>");
}
function visForældre(){
  vis("👨‍👩‍👦 Hjælp til forældre", ""+
  "<p>Her er en oversigt over programmet, og hvordan I kan hjælpe derhjemme.</p>"+
  "<h3>Sådan hænger det sammen</h3><ul>"+
  "<li>Programmet bygger på en <b>taksonomi</b>: fra at <i>huske og forstå</i> (quiz, stavning) over at <i>anvende</i> (ret tekster, brug synonymer) til at <i>skabe</i> (kreative historier og tegneserier).</li>"+
  "<li>Hvert område har 3 niveauer: Begynder, Øvet og Ekspert. Barnet starter på niveau 1.</li>"+
  "<li><b>Adaptivt tempo:</b> 3 rigtige svar i træk = opgaven er mestret. Er der fejl, kommer opgaven igen senere i rækken. Blevet man god, går man videre.</li>"+
  "<li>På <b>hvad som helst</b> kan barnet trykke på <b>❓ For svært?</b> og få en forklaring til afsnittet (læseteknik, staveregler, regler for store bogstaver, synonymer, brøker og decimaler m.m.).</li></ul>"+
  "<h3>Sådan hjælper du bedst</h3><ul>"+
  "<li>Sid sammen de første 5 minutter, og lad dit barn selv taste svarene.</li>"+
  "<li>Spørg: <i>\u201CKan man sige det på en anden måde?\u201D</i> – det træner ordforråd og synonymer.</li>"+
  "<li>Læs barnets kreative historier højt sammen – ros meget, hjælp med maks én ting ad gangen.</li>"+
  "<li>Følg med under 📊 Status – og download gerne historiebogen som fil og gem den.</li></ul>"+
  "<h3>Belønninger</h3>"+
  "<p>🌟 1 stjerne pr. rigtig opgave, 2 stjerner pr. mestret opgave, 4–5 stjerner for kreativt arbejde. Hvert tiende stjerne giver et 🎁 trofæ (op til 12).</p>"+
  "<h3>Sådan gemmer programmet</h3>"+
  "<p>Fremdrift, historier og tegneserier gemmes automatisk i browserens eget lager (localStorage) på den computer/tablet, der bruges – der sendes intet til nogen server. Skifter man enhed eller rydder browserdata, forsvinder det; derfor kan man altid downloade historiebog, serier og status som tekstfil via 📊 Status.</p>"+
  "<h3>Lille ugeskema (til print)</h3>"+
  "<table border='1' style='width:100%'><tr><th style='padding:6px'>Uge</th><th style='padding:6px'>Område trænet (sæt kryds)</th></tr>"+
  [1,2,3,4].map(function(u){
    return "<tr><td style='padding:6px;text-align:center'>"+u+"</td><td style='padding:6px'>Læsning ☐ &nbsp; Stavning ☐ &nbsp; Bogstaver ☐ &nbsp; Synonymer ☐ &nbsp; Matematik ☐ &nbsp; Nyheder ☐ &nbsp; AI ☐ &nbsp; Skrivning ☐</td></tr>";}).join("")+
  "</table>");
}
/* ---- side-opbygning: bruges af øve-siderne (laesning/stavning/bogstaver/synonymer) ---- */
function startSide(område){
  var appEl = document.getElementById("app");
  var IKON = {laesning:"📖",stavning:"✏️",bogstaver:"🔤",synonym:"💬",matematik:"➗",nyheder:"📰",ai:"🤖"};
  var TITEL = {laesning:"Læsning",stavning:"Stavning",bogstaver:"Store & små bogstaver",synonym:"Synonymer",matematik:"Matematik",nyheder:"Nyheder for børn",ai:"Om AI"};
  var INTRO = {matematik:"Regn opgaverne – fejl kommer igen, indtil du kan dem. Fra plus og minus til brøker og decimaltal.",
               nyheder:"Læs korte rigtige nyheder og svar på spørgsmålene.",
               ai:"Hvad er kunstig intelligens? Læs kort tekst og vælg det rigtige svar i quizzen."};
  var holder = document.createElement("div");
  function visIndledning(){
    appEl.innerHTML = "<h2 class='område'>"+IKON[område]+" "+TITEL[område]+"</h2>"+
     "<p>"+(INTRO[område]||"Vælg et emne. ")+" Du er på <span class='lvlbadge'>Niveau "+S.områder[område].niveau+" · "+NIV[S.områder[område].niveau].navn+"</span></p>"+
     "<div class='emnevalg' id='emner'></div>";
    if(område==="matematik"||område==="ai"){ document.getElementById("emner").style.display="none"; }
    else tegnEmnevalg(document.getElementById("emner"), område, function(){
      // nulstil holder og kør en ny runde med det valgte emne
      var gammel = document.getElementById("runde-holder");
      if(gammel) gammel.remove();
      kør();
    });
  }
  function kør(){
    holder = document.createElement("div");
    holder.id = "runde-holder";
    appEl.appendChild(holder);
    kørRunde(område, holder);
  }
  visIndledning();
  kør();
}


/* ============ INDSTILLINGER ============ */
function visIndstillinger(){
  var i = S.indstillinger;
  vis("⚙️ Indstillinger", ""+
   "<h3>👋 Elev</h3>"+
   "<p><input class='tekst' id='ind-navn' placeholder='Skriv dit navn…' value=\""+(i.navn||"").replace(/"/g,"")+"\"></p>"+
   "<h3>🎉 Konfetti ved rigtige svar</h3>"+
   "<p><label style='font-size:1rem'><input type='checkbox' id='ind-konfetti' "+(i.konfetti!==false?"checked":"")+"> Vis konfetti-progression (kan slås fra, hvis den forstyrrer)</label></p>"+
   "<h3>🎯 Opgaver pr. runde</h3>"+
   "<p><select id='ind-pr' class='tekst'>"+
   [3,4,6,8].map(function(n){ return "<option value='"+n+"' "+(i.prrunde==n?"selected":"")+">"+n+" opgaver</option>"; }).join("")+
   "</select></p>"+
   "<div style='margin-top:14px'>"+
   "<button class='btn grøn' onclick='gemIndstillinger()'>💾 Gem</button>"+
   " <button class='btn orange' onclick='nulstilFremskridt()'>🗑️ Nulstil alle fremskridt</button></div>"+
   "<p class='tagline'>💡 Fremskridt og indstillinger gemmes kun i denne browser.</p>");
}
function gemIndstillinger(){
  S.indstillinger.navn = (document.getElementById("ind-navn").value||"").trim();
  S.indstillinger.konfetti = document.getElementById("ind-konfetti").checked;
  var pr = parseInt(document.getElementById("ind-pr").value,10);
  if(pr>=3 && pr<=8) S.indstillinger.prrunde = pr;
  gem(S); opdaterHUD();
  vis("✅ Gemt", "<p>Dine indstillinger er gemt"+(S.indstillinger.navn? ", "+S.indstillinger.navn : "")+".</p><p><button class='btn blå' onclick='location.reload()'>Opdater siden</button></p>");
}
function nulstilFremskridt(){
  if(!confirm("Sikker på, at du vil nulstille ALLE stjerner, trofæer og fremskridt? Det kan ikke laves om.")) return;
  localStorage.removeItem("skriv-laer");
  location.reload();
}

function bindFællesknapper(){
  var bs=document.getElementById("btn-status"), bf=document.getElementById("btn-foraelder"), bi=document.getElementById("btn-indstillinger");
  if(bi) bi.onclick=visIndstillinger;
  if(bs) bs.onclick=visStatus;
  if(bf) bf.onclick=visForældre;
  var konf=document.createElementNS("http://www.w3.org/2000/svg","svg");
  konf.id="konfetti";
  document.body.appendChild(konf);
}
