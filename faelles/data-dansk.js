/* ============ DATA: danskefaget (emner, tekster, ord, opgaver, forklaringer) ============ */
"use strict";
var EMNER = [
  {id:"natur", navn:"🌿 Natur"},
  {id:"spil", navn:"🎮 Spil (Minecraft & Roblox)"},
  {id:"videnskab", navn:"🔬 Videnskab"},
  {id:"dagligdag", navn:"🏠 Dagligdag"},
  {id:"indkøb", navn:"🛒 Indkøb"}
];
var EMNE = {}; EMNER.forEach(function(e){ EMNE[e.id]=e.navn; });

function dataFor(o){
  if(o==="laesning")return LAESNING; if(o==="stavning")return STAVNING;
  if(o==="bogstaver")return BOGSTAVER; if(o==="synonym")return SYNONYM;
  if(o==="matematik")return typeof MATEMATIK!=="undefined"?MATEMATIK:[];
  if(o==="nyheder")return typeof NYHEDER!=="undefined"?NYHEDER:[];
  if(o==="ai")return typeof AITEST!=="undefined"?AITEST:[];
  return [];
}

/* ---- LÆSNING ---- */
var LAESNING = [
 {id:"l1",emne:"natur",niveau:1,titel:"Ulven i skoven",tekst:"Bo og hans søster Ida går tur i skoven. Pludselig hører de en lyd bag busken. Det er en hund! Hunden hedder Rex og er løbet væk fra sin ejer. Bo ser på halsbåndet, at der står et telefonnummer. Bo ringer til ejeren, og efter ti minutter kommer en glad mand og henter Rex.",
  spm:[
   {q:"Hvem går tur i skoven?",svar:["bo og ida","ida og bo","bo og hans søster ida","bo og ida går tur i skoven"]},
   {q:"Hvad stod der på halsbåndet?",svar:["et telefonnummer","telefonnummer","et nummer"]},
   {q:"Hvem henter Rex til sidst?",svar:["en glad mand","ejeren","en mand"]}
  ]},
 {id:"l2",emne:"spil",niveau:1,titel:"Steen bygger i Minecraft",tekst:"Steen elsker at spille Minecraft. I dag skal han bygge et hus af sten og træ. Først hakker han træ med sin økse. Derefter graver han sand, fordi han vil have glas til vinduerne. Da hans ven Mille logger på, bygger hun en have med tulipaner og bier.",
  spm:[
   {q:"Hvad bygger Steen et hus af?",svar:["sten og træ"]},
   {q:"Hvorfor graver Steen sand?",svar:["glas til vinduerne","fordi han vil have glas til vinduerne","til vinduerne","glas"]},
   {q:"Hvad bygger Mille i haven?",svar:["tulipaner og bier","tulipaner","en have med tulipaner og bier"]}
  ]},
 {id:"l3",emne:"videnskab",niveau:1,titel:"Hvorfor er himlen blå?",tekst:"Solens lys er faktisk alle farver blandt sammen. Når lyset rammer luftens små bitte dele, spredes den blå farve mest, fordi den bølger hurtigst. Derfor ser himlen blå ud om dagen. Ved solnedgang skal lyset rejse længere gennem luften, og da ser vi mere rødt og orange.",
  spm:[
   {q:"Hvilken farve spredes mest i luften?",svar:["blå","den blå farve"]},
   {q:"Hvad er solens lys i virkeligheden?",svar:["alle farver blandet sammen","alle farver","blandet farver"]},
   {q:"Hvad ser vi mere af ved solnedgang?",svar:["rødt og orange","rødt","mere rødt og orange"]}
  ]},
 {id:"l4",emne:"indkøb",niveau:1,titel:"Indkøb i supermarkedet",tekst:"Mikkel og hans far skriver en indkøbsseddel: mælk, brød, æbler og havregryn. I butikken finder Mikkel selv varerne. Havregryn koster 15 kroner og mælken koster 10 kroner. Faren giver Mikkel pengene, og Mikkel betaler selv i kassen og tager imod byttepengene. Kvitteringen lægger han lige i lommen.",
  spm:[
   {q:"Hvad står der på indkøbssedlen?",svar:["mælk brød æbler havregryn","mælk, brød, æbler og havregryn"]},
   {q:"Hvor meget koster havregryn og mælk tilsammen?",svar:["25","25 kroner","25 kr."]},
   {q:"Hvad gør Mikkel med kvitteringen?",svar:["lægger den i lommen","i lommen","lægger den lige i lommen"]}
  ]},
 {id:"l5",emne:"natur",niveau:2,titel:"Bierne i haven",tekst:"En bistade er biernes hus. Arbejderbiernes job er at samle nektar fra blomsterne. Når en bi finder en god blomstermark, danser den for de andre bier for at fortælle, hvor maden er. Bierne laver honning af nektaren, og honningen gemmer de i roerne, så de har mad om vinteren, hvor der ikke er blomster.",
  spm:[
   {q:"Hvordan fortæller en bi de andre, hvor blomsterne er?",svar:["den danser","danser","med en dans"]},
   {q:"Hvorfor gemmer bierne honning?",svar:["mad om vinteren","så de har mad om vinteren","til vinteren","til mad om vinteren"]},
   {q:"Lav selv et spørgsmål til teksten – og svar på det! (Fri opgave: skriv dit eget spørgsmål og dit svar)",svar:[],fri:true}
  ]},
 {id:"l6",emne:"spil",niveau:2,titel:"Roblox-værten",tekst:"Nadia bygger sin egen Roblox-verden. Først laver hun et startsted med gynger og en vippebrønd. Derefter laver hun en butik, hvor man kan købe en kjole til sin avatar. Hendes ven Sigge prøver spillet og synes, det er lidt for svært at finde butikken, for skilte mangler. Nadia giver sig til at lave pile og skilte, så alle kan finde vej.",
  spm:[
   {q:"Hvad mangler der i Nadias verden?",svar:["skilte","skiltene","pile og skilte"]},
   {q:"Hvad laver Nadia til sidst, da Sigge siger det?",svar:["pile og skilte","skilte","pile"]},
   {q:"Kan Sigge finde butikken i starten? Forklar med dine egne ord, hvorfor eller hvorfor ikke.",svar:["nej","mangler","fordi skiltene mangler"],fri:true}
  ]},
 {id:"l7",emne:"videnskab",niveau:3,titel:"Vulkanen sover aldrig helt",tekst:"En vulkan ser måske fredelig ud, men dybt nede er der smeltet sten, der hedder magma. Trykket presser magmaet op gennem revner. Når magmaet når ud i luften, kaldes det lava. Aske og gasser kan stige mange kilometer op i luften. Vulkanologer, som er videnskabsfolk, måler vibrationer og temperaturen for at gætte, om vulkanen snart vågner.",
  spm:[
   {q:"Hvad hedder smeltet sten dybt nede i jorden?",svar:["magma"]},
   {q:"Hvad hedder magmaet, når det kommer ud i luften?",svar:["lava"]},
   {q:"Hvordan forsøger videnskabsfolk at forudsige et udbrud? Forklar i 1-2 sætninger.",svar:["måler","vibration","temperatur","målinger"],fri:true}
  ]},
 {id:"l8",emne:"dagligdag",niveau:3,titel:"En hilsen til mormor",tekst:"Alma savner sin mormor, der bor langt væk. Hun beslutter sig for at skrive et rigtigt brev, ikke bare en sms. Først skriver hun dato og hilsen: 'Kære mormor'. Derefter fortæller hun om fodboldkampen, hvor hun scorede et mål. Til sidst skriver hun: 'Kærlig hilsen Alma', og lægger brevet i kuverten med et frimærke.",
  spm:[
   {q:"Hvad skriver man i starten af et brev?",svar:["dato og hilsen","kære mormor","dato","hilsen"]},
   {q:"Hvad scorede Alma i fodboldkampen?",svar:["et mål","mål"]},
   {q:"Hvad er forskellen på et brev og en sms? Forklar med dine egne ord.",svar:["brev","længere","papir","sms"],fri:true}
  ]}
];

/* ---- STAVNING ---- */
var STAVNING = [
  {id:"s1",emne:"natur",niveau:1,ord:"søster",sætn:"Min ___ hedder Ida."},
  {id:"s2",emne:"natur",niveau:1,ord:"skoven",sætn:"Der bor ræve i ___."},
  {id:"s3",emne:"spil",niveau:1,ord:"bygge",sætn:"Vi skal ___ et hus i Minecraft."},
  {id:"s4",emne:"dagligdag",niveau:1,ord:"skolen",sætn:"Jeg cykler til ___ hver dag."},
  {id:"s5",emne:"indkøb",niveau:1,ord:"brød",sætn:"Køber du ___ i butikken?"},
  {id:"s6",emne:"indkøb",niveau:1,ord:"kassen",sætn:"Vi betaler i ___."},
  {id:"s7",emne:"videnskab",niveau:1,ord:"planet",sætn:"Jorden er en ___."},
  {id:"s8",emne:"spil",niveau:1,ord:"skærmen",sætn:"Min far siger: sluk for ___ nu!"},
  {id:"s9",emne:"videnskab",niveau:2,ord:"forsøg",sætn:"Vi laver et ___ i natur/teknik."},
  {id:"s10",emne:"spil",niveau:2,ord:"diamanter",sætn:"I Minecraft kan man grave efter ___. (Ordet står i flertal.)"},
  {id:"s11",emne:"natur",niveau:2,ord:"solskin",sætn:"I dag er der ___ og varme."},
  {id:"s12",emne:"dagligdag",niveau:2,ord:"cykel",sætn:"Min ___ har en ringeklokke."},
  {id:"s13",emne:"videnskab",niveau:3,ord:"magnetisme",sætn:"Magneter virker ved ___. (Et svært ord – prøv dig frem!)"},
  {id:"s14",emne:"dagligdag",niveau:3,ord:"tandbørste",sætn:"Husk at bruge ___ to gange hver dag."},
  {id:"s15",emne:"indkøb",niveau:3,ord:"tilbud",sætn:"I butikken er der ___ på sodavand."},
  {id:"s16",emne:"dagligdag",niveau:3,ord:"ferie",sætn:"Om sommeren skal vi på ___ i Norge."}
];

/* ---- STORE/SMÅ BOGSTAVER ---- */
var BOGSTAVER = [
 {id:"b1",emne:"dagligdag",niveau:1,fejl:"ida og bo legede i haven.",svar:"Ida og Bo legede i haven.",forklaring:"Sætninger starter med stort bogstav, og navne (Ida og Bo) skal altid have stort."},
 {id:"b2",emne:"spil",niveau:1,fejl:"kan du lære mig at bygge et hus, mille?",svar:"Kan du lære mig at bygge et hus, Mille?",forklaring:"Starten af en sætning og navnet Mille skal have stort bogstav."},
 {id:"b3",emne:"natur",niveau:1,fejl:"solen skinner i dag. det er godt vejr til skovtur.",svar:"Solen skinner i dag. Det er godt vejr til skovtur.",forklaring:"Efter et punktum skal der stort bogstav."},
 {id:"b4",emne:"indkøb",niveau:1,fejl:"vi skal købe mælk og brød i netto. kan du huske sedlen, far?",svar:"Vi skal købe mælk og brød i Netto. Kan du huske sedlen, far?",forklaring:"Butiksnavne (Netto) skal have stort bogstav, ligesom starten af sætninger."},
 {id:"b5",emne:"videnskab",niveau:1,fejl:"jeg læste en bog om mars. den handlede om rumfartøjer.",svar:"Jeg læste en bog om Mars. Den handlede om rumfartøjer.",forklaring:"Planeter som Mars skal altid have stort bogstav."},
 {id:"b6",emne:"dagligdag",niveau:2,fejl:"om mandag skal klassen til århus. det bliver sjovt, sagde læreren jensen.",svar:"Om mandag skal klassen til Aarhus. Det bliver sjovt, sagde læreren Jensen.",forklaring:"Bynavne (Aarhus) og efternavne (Jensen) skal have stort begyndelsesbogstav."},
 {id:"b7",emne:"spil",niveau:2,fejl:"roblox er sjovt. min vens spil hedder fange fredag.",svar:"Roblox er sjovt. Min vens spil hedder Fange Fredag.",forklaring:"Navne på spil og platforme (Roblox, Fange Fredag) skal have store bogstaver."},
 {id:"b8",emne:"natur",niveau:3,fejl:"kirsten og william så en ræv i skoven ved roskilde. ræven gemte sig bag et træ.",svar:"Kirsten og William så en ræv i skoven ved Roskilde. Ræven gemte sig bag et træ.",forklaring:"Personnavne og bynavne skal have stort begyndelsesbogstav."}
];

/* ---- SYNONYMER ---- */
var SYNONYM = [
 /* ---- type: vælg (find synonymet blandt ordene) ---- */
 {id:"y1",emne:"dagligdag",niveau:1,type:"vælg",ord:"glad",svar:["lykkelig"],muligheder:["vred","lykkelig","sulten","træt"],sætn:"Henrik er glad i dag."},
 {id:"y2",emne:"spil",niveau:1,type:"vælg",ord:"sjov",svar:["morsom"],muligheder:["morsom","kedelig","svært","farligt"],sætn:"Spillet var sjovt."},
 {id:"y3",emne:"natur",niveau:1,type:"vælg",ord:"hurtig",svar:["rap"],muligheder:["rap","langsom","stærk","dum"],sætn:"Ræven er hurtig."},
 {id:"y4",emne:"videnskab",niveau:1,type:"vælg",ord:"små",svar:["lille"],muligheder:["store","lille","brede","runde"],sætn:"Cellerne er små."},
 {id:"y5",emne:"spil",niveau:1,type:"vælg",ord:"lette",svar:["nemme"],muligheder:["nemme","svære","kedelige","farlige"],sætn:"De første baner i spillet var lette."},
 {id:"y6",emne:"videnskab",niveau:2,type:"vælg",ord:"stærk",svar:["kraftig"],muligheder:["kraftig","svag","let","tynd"],sætn:"Magneten var stærk nok til at løfte søm."},
 {id:"y7",emne:"natur",niveau:2,type:"vælg",ord:"smuk",svar:["nydelig"],muligheder:["nydelig","grim","skæv","kedelig"],sætn:"Solnedgangen ved stranden var smuk."},
 {id:"y8",emne:"videnskab",niveau:2,type:"vælg",ord:"stille",svar:["tavs"],muligheder:["tavs","larmende","høj","sur"],sætn:"Laboratoriet var helt stille under forsøget."},
 {id:"y9",emne:"videnskab",niveau:3,type:"vælg",ord:"klog",svar:["intelligent"],muligheder:["intelligent","doven","vild","træt"],sætn:"En ræv er klog."},
 {id:"y10",emne:"spil",niveau:3,type:"vælg",ord:"besværlig",svar:["svær"],muligheder:["svær","let","sjov","kedelig"],sætn:"Den sidste bane i spillet var besværlig."},
 {id:"y11",emne:"dagligdag",niveau:1,type:"vælg",ord:"begynde",svar:["starte"],muligheder:["starte","slutte","stoppe","vente"],sætn:"Skoleåret begynder i august."},
 {id:"y12",emne:"dagligdag",niveau:2,type:"vælg",ord:"hjælpe",svar:["støtte"],muligheder:["støtte","hindre","forstyrre","kede sig"],sætn:"Min storesøster vil hjælpe mig med lektierne."},
 {id:"y13",emne:"natur",niveau:3,type:"vælg",ord:"skjule",svar:["gemme"],muligheder:["gemme","vise","finde","slippe"],sætn:"Haren kan skjule sig i det høje græs."},
 {id:"y14",emne:"indkøb",niveau:3,type:"vælg",ord:"købe",svar:["anskaffe"],muligheder:["anskaffe","sælge","aflevere","miste"],sætn:"Vi skulle købe mælk i supermarkedet."},
 {id:"y15",emne:"dagligdag",niveau:3,type:"vælg",ord:"beslutte",svar:["bestemme"],muligheder:["bestemme","tøve","droppe","glemme"],sætn:"Vi skulle beslutte, hvad vi skulle lave til aftensmad."},
 {id:"y16",emne:"natur",niveau:3,type:"vælg",ord:"samle",svar:["opsamle"],muligheder:["opsamle","spilde","tabe","dele"],sætn:"Forskerne skulle samle data fra forsøgene."},
 {id:"y17",emne:"indkøb",niveau:3,type:"vælg",ord:"tilbud",svar:["udsalg"],muligheder:["udsalg","prisstigning","dyrt","gebyr"],sætn:"Der var tilbud på chokolade i butikken."},
 /* ---- type: ikke (find ordet, der IKKE er synonym) ---- */
 {id:"y18",emne:"spil",niveau:1,type:"ikke",ord:"sjov",svar:["farligt"],muligheder:["morsom","latterlig","fjollet","farligt"],sætn:"I Minecraft byggede vi en drilsk rutschebane."},
 {id:"y19",emne:"indkøb",niveau:2,type:"ikke",ord:"dyr",svar:["billig"],muligheder:["kostbar","bekostelig","exklusiv","billig"],sætn:"Luksusbilen var meget dyr."},
 {id:"y20",emne:"natur",niveau:3,type:"ikke",ord:"rolig",svar:["vild"],muligheder:["stille","fredelig","afslappet","vild"],sætn:"Søen lå helt rolig i morgensolen."},
 {id:"y21",emne:"dagligdag",niveau:3,type:"ikke",ord:"hurtig",svar:["langsom"],muligheder:["rap","brat","kvik","hastig","langsom"],sætn:"Han skyndte sig, for han var hurtig."},
 {id:"y22",emne:"natur",niveau:3,type:"ikke",ord:"sjælden",svar:["almindelig"],muligheder:["enestående","ualmindelig","usædvanlig","eftertragtet","almindelig"],sætn:"Den sjældne fugl blev set i Danmark."},
 {id:"y23",emne:"dagligdag",niveau:2,type:"ikke",ord:"vred",svar:["glad"],muligheder:["arrig","gal","rasende","glad"],sætn:"Far var vred, da cyklen blev væk."},
 {id:"y24",emne:"videnskab",niveau:3,type:"ikke",ord:"nøjagtig",svar:["sløset"],muligheder:["præcis","nøje","omhyggelig","sløset"],sætn:"Forskerens målinger var nøjagtige."},
 {id:"y25",emne:"dagligdag",niveau:1,type:"skriv",ord:"træt",svar:["søvnig","udmattet","gennemtræt"],sætn:"Efter en lang skoledag var jeg træt."},
 {id:"y26",emne:"spil",niveau:1,type:"skriv",ord:"svært",svar:["hårdt","besværligt"],sætn:"Den nye bane i spillet var svær."},
 {id:"y27",emne:"natur",niveau:2,type:"skriv",ord:"hurtig",svar:["rap","kvik","hurtig"],sætn:"Haren er hurtig."},
 {id:"y28",emne:"dagligdag",niveau:2,type:"skriv",ord:"stor",svar:["kæmpe","enorm","stor"],sætn:"Naboen har en stor hund."},
 {id:"y29",emne:"videnskab",niveau:3,type:"skriv",ord:"varm",svar:["hed","brændende"],sætn:"Sommeren var varm i år."},
 {id:"y30",emne:"indkøb",niveau:3,type:"skriv",ord:"vigtig",svar:["væsentlig","betydningsfuld","vigtig"],sætn:"Det er vigtigt at tjekke prisen."},
  {id:"y31",emne:"spil",niveau:1,type:"vælg",ord:"vinde",svar:["sejre"],muligheder:["sejre","tabe","spille","træne"],sætn:"Vi vandt kampen i går."},
 {id:"y32",emne:"natur",niveau:1,type:"vælg",ord:"stor",svar:["kæmpe"],muligheder:["kæmpe","lille","tynd","grøn"],sætn:"Bøgen i skoven er stor."},
 {id:"y33",emne:"dagligdag",niveau:1,type:"vælg",ord:"flink",svar:["rar"],muligheder:["rar","surt","vred","træt"],sætn:"Den nye klassekammerat er flink."},
 {id:"y34",emne:"indkøb",niveau:1,type:"vælg",ord:"frisk",svar:["nybagt"],muligheder:["nybagt","gammelt","hårdt","sødt"],sætn:"Brødet i butikken var friskt."},
 {id:"y35",emne:"videnskab",niveau:1,type:"vælg",ord:"prøve",svar:["forsøge"],muligheder:["forsøge","glemme","fejle","starte"],sætn:"Vi prøvede forsøget en gang til."},
 {id:"y36",emne:"dagligdag",niveau:1,type:"vælg",ord:"sport",svar:["idræt"],muligheder:["idræt","fodbold","gymnastik","fri"],sætn:"I dag har vi sport i skolen."},
 {id:"y37",emne:"indkøb",niveau:1,type:"vælg",ord:"butik",svar:["forretning"],muligheder:["forretning","kasse","hylde","vare"],sætn:"Jeg går i butikken efter brød."},
 {id:"y38",emne:"spil",niveau:1,type:"vælg",ord:"bane",svar:["level"],muligheder:["level","karakter","elixir","zombie"],sætn:"Den sidste bane i spillet var svær."},
 {id:"y39",emne:"natur",niveau:2,type:"vælg",ord:"lykkelig",svar:["glad"],muligheder:["glad","ked af det","trist","sur"],sætn:"Fødselsdagsbarnet var lykkeligt."},
 {id:"y40",emne:"spil",niveau:2,type:"vælg",ord:"modstander",svar:["fjende"],muligheder:["fjende","ven","hjælper","spiller"],sætn:"I spillet møder vi en modstander."},
 {id:"y41",emne:"dagligdag",niveau:2,type:"vælg",ord:"mærkelig",svar:["underlig"],muligheder:["underlig","almindelig","kendt","fin"],sætn:"Jeg hørte en mærkelig lyd på loftet."},
 {id:"y42",emne:"indkøb",niveau:2,type:"vælg",ord:"kunder",svar:["købere"],muligheder:["købere","sælgere","varer","poser"],sætn:"Butikkens kunder kom med egne kasser."},
 {id:"y43",emne:"natur",niveau:2,type:"ikke",ord:"flydende",svar:["frossen"],muligheder:["smeltet","flydende","våd","frossen"],sætn:"Isen var flydende i solen."},
 {id:"y44",emne:"dagligdag",niveau:2,type:"ikke",ord:"venlig",svar:["gnaven"],muligheder:["flink","rar","venlig","gnaven"],sætn:"Den nye pige i klassen er venlig."},
 {id:"y45",emne:"natur",niveau:3,type:"skriv",ord:"vokse",svar:["gro","være i vækst","vokse"],sætn:"Planterne vokser hurtigt om sommeren."},
 {id:"y46",emne:"spil",niveau:3,type:"skriv",ord:"tabe",svar:["miste","komme til kort","tabe"],sætn:"Vi tabte kampen i sidste sekund."},
 {id:"y47",emne:"dagligdag",niveau:3,type:"vælg",ord:"ødelægge",svar:["smadre"],muligheder:["reparere","smadre","bygge","vaske"],sætn:"Nogle ødelagde sandkassen om natten."},
 {id:"y48",emne:"indkøb",niveau:3,type:"vælg",ord:"genbrug",svar:["genanvendelse"],muligheder:["genanvendelse","affald","spild","indpakning"],sætn:"Genbrug er godt for miljøet."}
];

/* ---- KREATIV SKRIVNING ---- */
var KREATIVT = [
 {id:"k1",emne:"spil",niveau:1,titel:"Dit Minecraft-eventyr",prompt:"Du vågner op inde i Minecraft-verdenen med kun en økse og tre brød. Beskriv din første dag: Hvad bygger du? Hvad møder du? Hvad vil du gøre først imorgen?",ordbank:["økse","brød","mine","bygge","grube","sulten","himmel","bed","kiste"],minOrd:40,mængde:"Mindst 40 ord"},
 {id:"k2",emne:"natur",niveau:1,titel:"Et hemmeligt dyr i haven",prompt:"Du finder et dyr, som ingen har set før. Beskriv, hvordan det ser ud (farver, størrelse, særlige ting), hvad det spiser, og hvad I oplever sammen.",ordbank:["pels","snude","hår","spiser","gemmer","sover","ven","hjem","træ","stemme"],minOrd:50,mængde:"Mindst 50 ord"},
 {id:"k3",emne:"videnskab",niveau:2,titel:"Opfinderen",prompt:"Du er den største opfinder i verden og har netop lavet en maskine, der kan ændre én ting ved hele verdenen. Hvad gør maskinen, og hvad sker der, da du tænder for den?",ordbank:["opfundet","knap","maskine","verden","ændre","pludselig","bagefter","hjælp","farlig","videnskab"],minOrd:60,mængde:"Mindst 60 ord"},
 {id:"k4",emne:"indkøb",niveau:1,titel:"Butikken med de mærkelige varer",prompt:"Du går ind i en ny butik i byen. Alle varerne er mærkelige! Skriv en historie om to varer, du finder, og hvem der køber dem – og hvorfor.",ordbank:["hylde","pris","kunde","underlig","kasse","smil","betale","købe","varer"],minOrd:50,mængde:"Mindst 50 ord"},
 {id:"k5",emne:"dagligdag",niveau:1,titel:"Den bedste dag i mit liv",prompt:"Fortæl om en dag, du aldrig glemmer. Det må gerne være en helt almindelig dag, der blev helt speciel. Husk at fortælle, hvad der skete, og hvordan du havde det.",ordbank:["morgen","pludselig","bagefter","grinede","glad","familie","ven","spændt","dag"],minOrd:40,mængde:"Mindst 40 ord"},
 {id:"k6",emne:"spil",niveau:2,titel:"Roblox-turneringen",prompt:"Du er meldt til en stor Roblox-turnering sammen med din bedste ven. Skriv om kampen fra start til slut: Hvordan starter den? Hvad går der galt? Hvordan slutter den?",ordbank:["hold","spiller","bane","point","taber","vinder","publikum","spænding","trofæ"],minOrd:60,mængde:"Mindst 60 ord"}
];

/* ---- TEGNESERIE ---- */
var SERIER = [
 {id:"t1",emne:"spil",titel:"Bygg-dagen",scene:"minecraft",
  situation:"To venner (Emil og Zoe) bygger et hus i Minecraft. Emil har netop lagt det sidste tagstens. Zoe kommer løbende med en spand maling.",
  figur1:"Emil",figur2:"Zoe",start1:"Endelig!",start2:""},
 {id:"t2",emne:"natur",titel:"På opdagelse",scene:"skov",
  situation:"I skoven finder to børn (Alma og Villads) dyrespor i mudderet. De følger sporene ind mellem træerne.",
  figur1:"Alma",figur2:"Villads",start1:"Se…",start2:"spor?"},
 {id:"t3",emne:"indkøb",titel:"Indkøbs-missionen",scene:"butik",
  situation:"En dreng (Noah) og hans mor står i supermarkedet med en indkøbsseddel. Der er én ting tilbage: havregryn – og de står på den øverste hylde!",
  figur1:"Noah",figur2:"Mor",start1:"",start2:"Hmm…"},
 {id:"t4",emne:"dagligdag",titel:"Efter tandlægen",scene:"hjem",
  situation:"Emma har været hos tandlægen. Gode nyheder: ingen huller! Nu vil hun helst fortælle sin kat om alt, hvad der skete.",
  figur1:"Emma",figur2:"Katten",start1:"Ingen huller!",start2:"Mjav!"}
];

/* ---- FOR SVÆRT? – forklaringer til hvert afsnit ---- */
var HJAELP = {
 laesning: {ikon:"📖", titel:"Hjælp: Sådan læser du en tekst og finder svarene",
  html:"<p><b>1. Læs spørgsmålet først.</b> Så ved du, hvad du skal lede efter i teksten.</p>"+
   "<p><b>2. Læs teksten roligt igennem</b> – prøv at se billederne i dit hoved.</p>"+
   "<p><b>3. Find svaret i teksten.</b> Peg på sætningen, hvor svaret står – svaret står næsten altid direkte i teksten.</p>"+
   "<p><b>4. Skriv svaret med dine egne ord.</b> Du behøver ikke kopiere hele sætningen – bare det vigtigste, fx et navn eller en ting.</p>"+
   "<p><b>5. Ved 'forklar med egne ord'-opgaver</b> er der ikke ét rigtigt svar. Tænk: 'Hvad ville jeg selv sige, hvis en ven spurgte mig?' Skriv 1-2 sætninger.</p>"+
   "<p class='tagline'>💡 Eksempel: 'Hvem henter Rex?' – Jeg leder i teksten efter ordet 'henter' … der står 'kommer en glad mand og henter Rex'. Svaret er: en glad mand.</p>"},

 stavning: {ikon:"✏️", titel:"Hjælp: Sådan staver du et svært ord",
  html:"<p><b>1. Sig ordet højt helt langsomt.</b> Del det op i stavelser: søs-ter, ka-non, pla-net.</p>"+
   "<p><b>2. Lyt efter lydene,</b> og skriv én lyd ad gangen.</p>"+
   "<p><b>3. Tænk på ord, du allerede kender.</b> Hører 'cykel' sammen med 'cykelbane'? Så stav på samme måde.</p>"+
   "<p><b>4. Brug stavereglerne:</b> Efter en kort vokal kommer der ofte to ens konsonanter (kan-non, bal-lon). Fremmedord har ofte endelserne -sjon eller -tion (sta-sjon, sta-tion).</p>"+
   "<p class='tagline'>💡 Det er OK at tage fejl – programmet viser de forkerte bogstaver med rødt, så du kan prøve igen.</p>"},

 bogstaver: {ikon:"🔤", titel:"Hjælp: Reglerne for store og små bogstaver",
  html:"<p>Der skal stort bogstav i starten af hver sætning, og i disse ord:</p>"+
   "<ul>"+
   "<li><b>Personnavne:</b> Ida, Bo, Mille, Jensen</li>"+
   "<li><b>Byer og lande:</b> Aarhus, Roskilde, Danmark, Norge</li>"+
   "<li><b>Butikker og firmaer:</b> Netto, LEGO</li>"+
   "<li><b>Planeter:</b> Mars, Jupiter (men: jorden, månen og solen skrives med lille)</li>"+
   "<li><b>Spil og programnavne:</b> Roblox, Minecraft, Fange Fredag</li>"+
   "</ul>"+
   "<p><b>Husk:</b> Efter et punktum, spørgsmålstegn eller udråbstegn skal der også stort bogstav – det er altså en ny sætning!</p>"+
   "<p class='tagline'>💡 Test dig selv: 'min vens spil hedder fange fredag' → 'Fange Fredag' er spilnavnet: begge ord skal have stort F.</p>"+
   "<p class='tagline'>💡 Ord skrevet med småt i dansk (udenfor sætningsstart): ugedage (mandag), måneder (maj), årstider (sommer).</p>"},

 synonym: {ikon:"💬", titel:"Hjælp: Hvad er et synonym?",
  html:"<p>Et <b>synonym</b> er et ord, der betyder næsten det samme som et andet ord. Man kan bytte det ud uden at meningen ændrer sig.</p>"+
   "<ul>"+
   "<li><b>glad</b> ≈ lykkelig, fornøjet</li>"+
   "<li><b>hurtig</b> ≈ rap, kvik</li>"+
   "<li><b>svær</b> ≈ besværlig, svær</li>"+
   "</ul>"+
   "<p><b>Sådan gør du:</b> Sæt ordet ind i sætningen, hvor det står. passer det, uden at meningen bliver mærkelig? Så er det et godt synonym (eller det samme ord i en anden form, fx lille/små).</p>"+
   "<p><b>Vær opmærksom:</b> Nogle ord ligner hinanden uden at betyde det samme – 'stærk' er ikke det samme som 'hurtig', selv om ræve er begge dele!</p>"+
   "<p><b>Der er tre slags opgaver her:</b></p><ul>"+
   "<li><b>Kan man sige det i stedet?</b> Klik på ordet i listen, der betyder næsten det samme.</li>"+
   "<li><b>Hvilket ord hører IKKE hjemme?</b> Her skal du klikke på det ord, der betyder noget helt andet end de andre.</li>"+
   "<li><b>Hvilket ord hører IKKE hjemme?</b> Her skal du klikke på det ord, der betyder noget helt andet end de andre.</li>"+
   "<li><b>Skriv selv et synonym</b> (fra niveau 2): Her er der ingen liste – du skal selv skrive ét ord, der betyder det samme. Der er flere rigtige svar, og ved fejl får du at vide, hvad man kunne have skrevet.</li>"+
   "</ul>"+
   "<p>På niveau 1 bliver alle ordene præsenteret i en liste. Fra niveau 2 møder du også opgaver, hvor du skal skrive et synonym helt selv – med lette ord, du allerede kender.</p>"+
   "<p class='tagline'>💡 Spørg dig selv: 'Kan jeg sige ordet i stedet – og sætningen betyder stadig det samme?'</p>"},

 kreativ: {ikon:"🪄", titel:"Hjælp: Sådan bygger du en god historie",
  html:"<p>En historie har tre dele:</p>"+
   "<ol>"+
   "<li><b>Begyndelse:</b> Præsentér personen og stedet. Hvor er vi? Hvad vil personen?</li>"+
   "<li><b>Midte:</b> Der sker et problem! Noget går galt, bliver spændende eller overraskende.</li>"+
   "<li><b>Slutning:</b> Problemet bliver løst – eller næsten – og vi finder ud af, hvordan personen har det nu.</li>"+
   "</ol>"+
   "<p><b>Gode tricks:</b><ul>"+
   "<li>Brug ordene fra ordbanken som 'byggeklodser' (fx: klodser, økse, himlen).</li>"+
   "<li>Brug dine sanser: Hvad ser, hører og lugter personen?</li>"+
   "<li>Skriv korte sætninger, når noget er spændende. Det gør teksten hurtig!</li>"+
   "</ul></p>"+
   "<p>Tror du ikke, du kan finde på noget? Start sådan: <i>„Jeg vidste ikke, at denne dag ville blive den vigtigste i mit liv…“</i> – og skriv videre derfra.</p>"},

 serie: {ikon:"🗣️", titel:"Hjælp: Sådan skriver man talebobler",
  html:"<p>En <b>taleboble</b> viser, hvad en person siger – ikke hvad tænker eller gør.</p>"+
   "<ul>"+
   "<li>Skriv det, personen ville sige højt: „Endelig er taget færdigt!“</li>"+
   "<li>Start altid med stort bogstav, og slut med punktum, ! eller ? – præcis som en almindelig sætning.</li>"+
   "<li>Brug korte, levende sætninger. Tænk på, hvordan folk faktisk snakker.</li>"+
   "<li>Gør gerne samtalen sjov: Den ene kan spørge, den anden kan svare noget uventet.</li>"+
   "</ul>"+
   "<p class='tagline'>💡 Læs din tegneserie højt for nogen – lyder det som noget, folk ville sige? Så er den god!</p>"},

 matematik: {ikon:"➗", titel:"Hjælp: Brøker og decimaltal – hvordan hænger de sammen?",
  html:"<p><b>En brøk</b> betyder, at noget er delt i lige store dele:</p>"+
   "<ul>"+
   "<li>1/2 = én af to dele (halvdel)</li>"+
   "<li>1/4 = én af fire dele (kvart)</li>"+
   "<li>3/4 = tre af fire dele</li>"+
   "</ul>"+
   "<p><b>Et decimaltal</b> er bare en anden måde at skrive det samme på. Kommaet viser, hvor mange dele af 10 eller 100 der er taget:</p>"+
   "<ul>"+
   "<li>1/2 = 0,5 &nbsp; (for 5 af 10 dele)</li>"+
   "<li>1/4 = 0,25 &nbsp; (for 25 af 100 dele)</li>"+
   "<li>3/4 = 0,75</li>"+
   "</ul>"+
   "<p><b>Sådan laver du en brøk om til et decimaltal (og omvendt):</b></p>"+
   "<ol>"+
   "<li>Se, om nævneren kan gøres til 10 eller 100: 2, 4, 5 og 10 er lette (fx 1/4 = 25/100).</li>"+
   "<li>Skriv brøken med 10 eller 100 i nævneren: 1/4 = 25/100 = 0,25.</li>"+
   "<li>Gør det omvendt: 0,75 = 75/100, og 75/100 kan forkortes til 3/4.</li>"+
   "</ol>"+
   "<p class='tagline'>💡 Sjov test ved køkkenet: En pizza skæres i 4. Du tager 1 stykke = 1/4 = 0,25 pizza.</p>"+
   "<p class='tagline'>💡 Decimaltal og brøker er to sprog for det samme – lidt ligesom 'glad' og 'lykkelig' er to ord for næsten det samme!</p>"},

 nyheder: {ikon:"📰", titel:"Hjælp: Sådan læser du en nyhed",
  html:"<p><b>En nyhed fortæller noget, der virkelig er sket.</b> Den svarer ofte på spørgsmålene: Hvad? Hvem? Hvor? Hvornår?</p>"+
   "<p><b>1. Læs overskriften først.</b> Den fortæller, hvad nyheden handler om.</p>"+
   "<p><b>2. Læs teksten roligt igennem.</b> Læg mærke til navne, steder og tal – de er ofte vigtige for spørgsmålene.</p>"+
   "<p><b>3. Tal og fakta skal svares præcist.</b> Står der 64 børn, er svaret '65 børn' forkert – tjek at tallet står præcist, som det står i teksten.</p>"+
   "<p><b>4. Nogle spørgsmål er 'forklar med egne ord'.</b> Der er ikke ét rigtigt svar – tænk: Hvad er det vigtigste, teksten fortæller?</p>"+
   "<p class='tagline'>💡 Lige som i læsning: Læs spørgsmålet først, så ved du, hvad du skal lede efter!</p>"},

 ai: {ikon:"🤖", titel:"Hjælp: Hvad er AI, og hvordan tænker man over den?",
  html:"<p><b>AI (kunstig intelligens) er programmer, der lærer af eksempler</b> – ligesom du lærer at genkende en kat ved at se mange katte.</p>"+
   "<p><b>De vigtigste ting at huske:</b></p>"+
   "<ul>"+
   "<li>AI lærer af <b>mange eksempler (data)</b>, ikke af regler, som en person har skrevet ned.</li>"+
   "<li>AI <b>tager nogle gange fejl</b> – uden selv at opdage det. Derfor dobbelttjekker man vigtige ting.</li>"+
   "<li>AI siger ikke 'jeg ved det ikke' af sig selv – den kan finde på et svar med selvtillid.</li>"+
   "<li>Mennesker lærer af ét eksempel; AI skal ofte bruge tusinder.</li>"+
   "</ul>"+
   "<p class='tagline'>💡 Tænk på AI som en meget hurtig, men lidt naiv hjælper: God til at genkende mønstre, men dårlig til at forstå, om det, den siger, passer.</p>"}
};
