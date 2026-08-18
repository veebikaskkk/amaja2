# A-MAJA OÜ koduleht

Puhas HTML, CSS ja JavaScript. Raamistikku ega ehitusprotsessi ei ole.
Majutus Verceli peal, hinnapäringu vormi taust Resend.

---

## 1. Mida tuleb koodis asendada

Praegu on kõik viited domeenile `https://amaja.ee`. Kui domeen on teine,
asenda see nendes failides:

- `sitemap.xml`
- `robots.txt`
- kõigi HTML-failide `<link rel="canonical">` ja `og:url`
- `api/kontakt.js` sisus domeeni ei ole, seda muuta ei ole vaja

Kiire viis: otsi kõigist failidest `amaja.ee` ja asenda.

Postiindeks `10112` JSON-LD plokis on Tehnika tänava üldindeks. Kui
korteri 51-12 tegelik indeks erineb, paranda see `index.html` ja
`kontakt.html` sees.

---

## 2. Pildid

Kõik pildid on lehel olemas. Kohatäiteid ei ole enam üheski kohas.

**Fotod ja visualiseeringud, 15 tükki** portfoolios, neist 7 on uued
3D visuaalid. Avapildiks on musta puitlaudisega metsamaja, mis on
eraldi optimeeritud kahes suuruses, et mobiil ei laeks arvutiversiooni.

Portfoolio on nüüd ühtlane ruudustik, kus osa töid võtab kogu laiuse.
Pildid on kärbitud ühtsesse kuvasuhtesse, sest portfooliona mõjub see
palju rahulikumalt kui erikõrgused. Terve, kärpimata pilt on alati ühe
klõpsu kaugusel: klõps avab foto valgustis samal lehel.

**Joonised, 12 tükki.** Kõik ühesuurused plaadid, joonis mahutatakse
plaadi sisse tervikuna. Klõps avab joonise valgustis samal lehel.

Kõik on WebP, EXIF ja GPS-koordinaadid eemaldatud, failinimed
kirjeldavad, alt-tekstid täislausetena. Joonised on kvaliteediga 94 ja
ilma suurendamiseta, sest lähtefailid olid ligikaudu 900 px laiad.

**Hero pildi kvaliteet.** Suvekohviku render on 1800 px lai, mis on
korras. Kui mõnest joonisest on originaal olemas suuremana, saada, siis
teen selle uuesti suurema lahutusega, sest praeguse pealt suurendades
jõuab piir kätte.

**Mida pildilt näha ei ole.** Objektide asukohti ja aastaid ma ei tea,
välja arvatud suvekohvik, mille sildil on Raatuse tänav 2 peal.
Kohanimi failinimes ja alt-tekstis on kohaliku pildiotsingu jaoks
kõige mõjusam üksik täiendus, mida siin veel teha saab. Vaata punkt 11.

---

## 3. Vercelisse panek

1. Loo GitHubis uus hoidla ja lohista kõik siinsed failid sinna.
2. Vercelis vajuta **Add New, Project** ja vali see hoidla.
3. Framework Preset: **Other**. Build Command jäta tühjaks, Output
   Directory samuti. See on staatiline leht, ehitama ei pea midagi.
4. Vajuta **Deploy**.
5. Lisa domeen: Project, Settings, Domains, `amaja.ee` ja `www.amaja.ee`.

### DNS

Juurdomeeni A-kirje juures on nimeväli **tühi või @**, mitte `amaja.ee`.
Kui registripidaja lisas domeenile juba oma A-kirje, kustuta see enne
Verceli oma lisamist. Kaks A-kirjet annavad vea.

---

## 4. Resend ja keskkonnamuutujad

1. Loo konto aadressil resend.com.
2. Lisa domeen `amaja.ee` ja kinnita see DNS-kirjetega, mille Resend annab.
3. Loo API võti.
4. Vercelis: Project, Settings, Environment Variables. Lisa kolm muutujat:

| Nimi | Väärtus |
|---|---|
| `RESEND_API_KEY` | Resendi API võti |
| `SAATJA` | `Koduleht <info@amaja.ee>` |
| `SAAJA` | `info@a-maja.com` |

**Keskkonnamuutujad loetakse ainult käivitamisel.** Pärast lisamist tee
kindlasti uus deploy, muidu vorm ei tööta. See on kõige sagedasem
"miks vorm ei tööta" põhjus.

**Kinnitamata domeeniga Resend saadab ainult konto omaniku aadressile.**
Kui `SAAJA` on mõni muu aadress, tuleb vastuseks 403. Seega kinnita
domeen enne, kui vormi päriselt kasutusele võtad.

Node moodulite paigaldamist vaja ei ole. `api/kontakt.js` kasutab Node
sisseehitatud `fetch`-i, seega `resend` paketti ei ole vaja installida.

---

## 5. Statistika

Lehel on Vercel Analytics, mis on küpsisevaba. Lülita see sisse:
Project, Analytics, Enable. Nõusolekuriba vaja ei ole, seetõttu seda
lehel ka ei ole.

---

## 6. Juhend kliendile: Google'i ettevõtteprofiil

Tasuta ja kõige suurema mõjuga samm kohalikus otsingus. Tee see kohe
pärast lehe avaldamist.

**Mis andmed sisestada**

- Nimi täpselt nii: A-MAJA OÜ
- Kategooria: Arhitekt. Lisakategooria: Projekteerimisbüroo
- Telefon: +372 5387 4959
- Veebileht: https://amaja.ee
- Teeninduspiirkond: vali kõik viisteist maakonda, sest tööd võetakse
  vastu üle Eesti
- Kui vastuvõttu aadressil ei toimu, märgi profiil teeninduspiirkonna
  ettevõtteks, mitte poeks. Siis aadressi kaardil ei näidata.
- Teenused: lisa needsamad, mis on teenuste lehel

**Mis fotod lisada**

- Logo profiilipildiks
- Kaanepildiks üks valminud objekt
- Vähemalt viis fotot töödest. Samad failid, mis lehel, sobivad.

**Kuidas arvustusi küsida**

Küsi arvustust siis, kui ehitusluba on käes, sest see on kliendi jaoks
kõige selgem võiduhetk. Saada lühike kiri koos otselingiga arvustuse
vormile, mille leiad profiili haldusvaates. Ära paku vastutasu, sest
Google eemaldab sellised arvustused.

Hange.ee hinnangud jäävad sinna, kus nad on. Neid Google'i profiilile üle
tõsta ei saa, aga sama klient võib mõlemas kohas arvustuse jätta.

---

## 7. Struktuur

```
index.html          Avaleht, täisekraan avapilt ja tööde ruudustik
tood.html           Portfoolio, 15 tööd ja 12 joonist
teenused.html       Kuus teenust eraldi alajaotustena
meist.html          Miks meid, näitajad
tagasiside.html     Klientide hinnangud
kontakt.html        Hinnapäringu vorm ja kontaktandmed
aitah.html          Tänuleht, noindex
privaatsus.html     Privaatsustingimused
404.html            Vealeht, noindex
stiil.css           Jagatud stiil
skript.js           Ülekattemenüü, valgusti, vormi valideerimine
api/kontakt.js      Vormi taust, Resend
fondid/             IBM Plex Sans ja Mono, latin ja latin-ext
pildid/             Töödeldud WebP-d ja logo
jagamispilt.png     og:image, 1200x630
```

### Portfooliokeskne ülesehitus

Avaleht algab täisekraan avapildiga, millel on ainult logo ja üks rida
teksti. Menüü on ülekattes, mis avaneb paremal ülal olevast nupust ja
katab kogu ekraani suurte linkidega. Kohe avapildi järel algavad tööde
pildid, ilma vahepealse tekstiplokita.

Tekstiraskus on avalehelt maha võetud. Pikem sisu elab nüüd eraldi
lehtedel: teenused, meist ja tagasiside.

**Artiklite lehte ei ole.** Jätsin selle teadlikult välja, sest sisu
selle jaoks praegu ei ole ja tühi artiklite nimekiri kahjustaks pigem kui
aitaks. Kui artiklid tulevad, teen lehe koos Article ja ItemList
struktuurandmetega juurde.

---

## 8. Mida ma ise ei kinnitanud

Need punktid vajavad sinu või kliendi ülevaatust, sest mina neid
kontrollida ei saa.

- **PageSpeed skoor.** Eesmärgiks võetud 90 või rohkem mobiilis. Testida
  saab alles siis, kui leht on päris aadressil. Ma ei väida, et testisin.
- **Postiindeks** JSON-LD plokis, vaata punkt 1.
- **Fotode õigused.** Enne avaldamist kinnita, et fotod on kliendi omad
  või on luba olemas. Droonipildid ja profifotod kuuluvad sageli
  fotograafile, mitte tellijale.
- **Hinnad, garantiid, sertifikaadid.** Lehel ei ole ühtegi hinda ega
  garantiid, sest neid mulle ei antud. Kui need lisada, siis ainult
  kliendi kinnitusel.

---

## 9. Mobiili murdepunktid

CSS-i on lisatud järgmised murdepunktid. Testida ma ei saa, seega
loetlen ainult selle, mis koodis on.

| Murdepunkt | Mis muutub |
|---|---|
| kuni 900 px | Menüü läheb hamburgeri alla, avaneb päise all täislaiuses. Menüülinkide puutekõrgus 52 px. |
| alates 700 px | Teenusekaardid kahte veergu, galerii kahte veergu, jaluse plokid kahte veergu. |
| alates 768 px | Näitajate riba neljaveeruliseks. |
| alates 800 px | Tsitaadid kahte veergu. |
| alates 820 px | Hinnangud kahte veergu. |
| alates 900 px | Teenuse plokk kaheveeruliseks, kaks veergu jaotus, kutseplokk kaheveeruliseks. |
| alates 1000 px | Kontaktileht kaheveeruliseks, jalus neljaveeruliseks. |
| alates 1024 px | Hero kaheveeruliseks. |
| alates 1100 px | Teenusekaardid neljaveeruliseks, galerii kolmeveeruliseks. |
| alates 1240 px | Sisu laius lukustub, veerised kasvavad. |

Päise kõrgus on muutuja `--pais-korgus`, praegu 78 px. Kõik ankrud
kasutavad seda `scroll-margin-top` sees, seetõttu ei jää sihtkoht
kleepuva päise alla peitu. Kui päise kõrgust muuta, piisab muutuja
muutmisest ühes kohas.

Puutealad on vähemalt 44 px, nupud 48 px, vormiväljad 50 px.
Pikad e-posti aadressid murduvad `overflow-wrap` abil.
Kerivas konteineris absoluutselt positsioneeritud elemente ei ole.

---

## 10. Kontrollnimekiri, läbitud

1. Kõik JSON-LD plokid parsivad vigadeta. Kontrollitud koodiga.
2. Igal lehel täpselt üks h1, tasemed ei hüppa.
3. Igal lehel unikaalne title ja description, kontrollitud koodiga.
4. Kõik sisemised lingid ja ankrud viitavad olemasolevale failile.
5. HTML-i sildid tasakaalus, kontrollitud parseriga.
6. Ühtegi pikka mõttekriipsu ei ole, kontrollitud koodiga.
7. Koma ei ole rinnastava sidesõna ees. Kaks järelejäänud juhtu on
   kõrvallauset sulgevad, mis on reeglipärane.
8. Kohatäiteid nagu `[NIMI]` koodis ei ole.
9. Kõik pildiviited on olemas või asendatud triibulise kohatäitega.
10. `jagamispilt.png` on päriselt olemas, genereeritud lehe värvide ja
    logoga.
11. Jaluses on täisnimi, õiguslik vorm, registrikood, KMKR, aadress,
    e-post ja telefon.
12. Privaatsusleht on olemas ja lingitud nii vormi juurest kui jalusest.
13. Väljamõeldud fakte, tagasisidet ega numbreid ei ole. Kõik hinnangud
    on need, mis Hange.ee-st tulid. Hinnangute arvu lehel ei nimetata,
    et see ei vananeks uute hinnangute lisandudes.
14. Iga värvipaar vastab kontrastile 4.5:1, kontrollitud arvutusega.
    Madalaim on 5,57.
15. Fookusraam on klaviatuuriga nähtav, `:focus-visible` 2 px aktsent.
16. Murdepunktid loetletud punktis 9.
17. Fondid tulevad kaustast `fondid/`, mitte Google'i serverist.
    Kontrollitud, et õ ä ö ü on latin-alamhulgas ja ž š latin-ext-is.
18. API võtit üheski failis ei ole, ainult `process.env.RESEND_API_KEY`.
19. Vana lehte ei olnud, seega ümbersuunamisi vaja ei ole.

---

## 11. SEO baas, mis otsingutega leitakse

Lehel ei ole ostetud reklaami ega nippe. Baas koosneb kolmest asjast:
iga leht sihib ühte päris küsimust, sisu on eesti keeles ja konkreetne,
ning struktuurandmed ütlevad Google'ile otse, mis ettevõttega on tegu.

### Iga lehe siht

| Leht | Title | Mida sihib |
|---|---|---|
| `index.html` | Arhitektuurne projekteerimine üle Eesti | üldotsing, brändiotsing |
| `teenused.html` | Projekteerimisteenused | teenusepõhised otsingud |
| `tood.html` | Tehtud tööd ja joonised | portfoolio, pildiotsing |
| `tagasiside.html` | Klientide tagasiside | usaldusotsingud, brändi + arvustus |
| `kontakt.html` | Kontakt ja hinnapäring | ostuvalmis otsingud |

### Realistlikud otsingud, kus leht võib kuvada

**Brändiotsingud, tugevaim positsioon.** Siin peaks leht jõudma esikohale
üsna kiiresti, sest konkurentsi ei ole.

- a-maja, a-maja oü, amaja arhitekt
- kaspar lätt arhitekt

**Teenusotsingud, keskmine konkurents.** Nendes on realistlik jõuda
esilehele mõne kuu jooksul, kui Google'i ettevõtteprofiil on ka tehtud.

- eramu projekt, eramu ehitusprojekt, üksikelamu projekteerimine
- juurdeehituse projekt, rekonstrueerimise projekt
- abihoone projekt, aiamaja projekt, saunamaja projekt
- moodulmaja ehitusprojekt
- eelprojekt ehitusteatise mahus, ehitusteatise projekt
- arhitektuurne põhiprojekt, arhitektuurne projekteerimine
- korterelamu projekteerimine, ärihoone projekteerimine

**Pika sabaga otsingud, kus võit on kõige tõenäolisem.** Need on
väiksema mahuga, aga otsija on ostuvalmis.

- kas mul on vaja ehitusluba või ehitusteatis
- kes suhtleb omavalitsusega ehitusloa taotlemisel
- diplomeeritud arhitekt tase 7
- arhitekt kes mõtleb kaasa
- eramu projekt üle eesti

**Kohalikud otsingud.** Siin on praegu suurim puudujääk, vaata allpool.

- arhitekt tallinn, arhitektibüroo tallinn, projekteerija harjumaa

### Mis otsingutega leiab pilte

Pildiotsing käib kolme asja pealt: failinimi, alt-tekst ja `sitemap.xml`
`image:image` plokk, kus on iga pildi pealkiri ja kirjeldus. Kõik kolm on
igal pildil olemas, mis on see osa, mille enamik lehti tegemata jätab.

**Fotod ja visualiseeringud leitakse otsingutega nagu:**

- tume puitfassaad eramu, vertikaalne puitlaudis maja
- punane puitfassaad eramu, punane viilkatusega maja
- päikesepaneelidega eramu, kelpkatus päikesepaneelid
- eramu juurdeehitus puitribifassaad
- korterelamu puitfassaad visualiseering
- suvekohvik projekt, katuseterrassiga kohvik

**Joonised leitakse otsingutega nagu:**

- eramu lõige joonis, sektsioon A-A joonis
- korruse plaan joonis, esimese korruse plaan
- katuseplaan joonis
- eramu vaated joonis, eestvaade mõõtkava 1:50
- konstruktsioonisõlmed joonis, välisseina tarind

Joonised on siin ootamatult väärtuslik vara. Enamik arhitektibüroosid ei
pane jooniseid üldse üles, seetõttu on konkurents nendel otsingutel
väike ja need toovad täpselt õiget tüüpi külastajat, kes teab, mida
projekt sisaldab.

### Mis on tehtud

- Igal lehel unikaalne title ja description, mitte kopeeritud
- Canonical URL igal lehel
- `ProfessionalService` struktuurandmed: nimi, telefon, e-post, aadress,
  KMKR, kutsetunnistus 203786 ja kõik 15 maakonda `areaServed` all
- `Service` ja `Offer` iga kuue teenuse kohta
- `BreadcrumbList` igal alamlehel
- `sitemap.xml` kõigi lehtede ja 21 pildiga
- `robots.txt`, mis lubab indekseerida ja blokeerib `/api/`
- Semantiline HTML, üks h1 lehel, tasemed ei hüppa
- Sisemised lingid sisu sees, mitte ainult menüüs

### Mis on tegemata ja mida see maksab

**Google'i ettevõtteprofiil, kõige suurem üksik võit.** Ilma selleta ei
kuvata lehte kaardil ega kohalikus kolmikus, mis on enamiku
teenuseotsingute puhul see osa, mida päriselt vaadatakse. Tasuta, tund
aega tööd. Juhend on punktis 6.

**Kohanimed piltide juures.** Praegu on ainult suvekohvikul asukoht
teada. Kui saadad ülejäänud objektide asukohad, saab failinimed ja
alt-tekstid täiendada kujul `eramu-punane-puitfassaad-viimsi.webp`. See
avab otsingud stiilis "eramu projekt viimsi", mis on palju vähem
konkurentsi kui üldine "eramu projekt".

**Artiklid.** Jätsin artiklite lehe teadlikult välja, sest sisu ei ole ja
tühi nimekiri kahjustaks. Aga just artiklid oleksid see, mis toob pika
sabaga otsinguid. Kaks kuni kolm sisulist teksti, näiteks "millal
piisab ehitusteatisest ja millal on vaja ehitusluba", tooksid tõenäoliselt
rohkem külastajaid kui kogu ülejäänud leht kokku.

**Aeg.** Uus domeen ei asu esikohale kohe. Indekseerimine võtab
tavaliselt paar nädalat, positsioonid stabiliseeruvad paari kuuga.
Lisa leht Google Search Console'i kohe pärast avaldamist ja esita
`sitemap.xml`. Domain-property puhul käib väljale terve aadress,
URL-prefix-property puhul ainult `sitemap.xml`.
