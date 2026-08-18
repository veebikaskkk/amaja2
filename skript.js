(function () {
  "use strict";

  var nupp = document.querySelector(".menuu-nupp");
  var menuu = document.getElementById("peamenuu");
  if (nupp && menuu) {
    var avaSilt = "Ava menüü";
    var sulgeSilt = "Sulge menüü";
    nupp.setAttribute("aria-label", avaSilt);

    function seaMenuu(avatud) {
      menuu.hidden = !avatud;
      nupp.setAttribute("aria-expanded", avatud ? "true" : "false");
      nupp.setAttribute("aria-label", avatud ? sulgeSilt : avaSilt);
      document.body.classList.toggle("menuu-lahti", avatud);
      var t = nupp.querySelector(".menuu-nupp-tekst");
      if (t) t.textContent = avatud ? "Sulge" : "Menüü";
      if (avatud) {
        var esimene = menuu.querySelector("a");
        if (esimene) esimene.focus();
      }
    }

    nupp.addEventListener("click", function () {
      seaMenuu(menuu.hidden);
    });

    menuu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") seaMenuu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menuu.hidden) {
        seaMenuu(false);
        nupp.focus();
      }
    });
  }

  var aasta = document.getElementById("aasta");
  if (aasta) aasta.textContent = String(new Date().getFullYear());

  var tood = document.querySelector("[data-filter-rida]");
  if (tood) {
    tood.addEventListener("click", function (e) {
      var n = e.target.closest("[data-filter]");
      if (!n) return;
      var v = n.getAttribute("data-filter");
      tood.querySelectorAll("[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === n ? "true" : "false");
      });
      document.querySelectorAll("[data-liik]").forEach(function (f) {
        var sobib = v === "koik" || f.getAttribute("data-liik") === v;
        f.hidden = !sobib;
      });
    });
  }

  /* ---------- Valgusti ---------- */
  var lingid = Array.prototype.slice.call(
    document.querySelectorAll(
      ".galerii-joonised a[href], .tookaart a[href], .teenus-pilt a[href], .paar-kaart > a[href]"
    )
  );

  if (lingid.length) {
    var kirjed = lingid.map(function (a) {
      var fig = a.closest("figure");
      var tugev = fig ? fig.querySelector("figcaption strong") : null;
      var pealkiri = tugev ? tugev.textContent.trim() : "";
      var kirjeldus = "";
      if (fig) {
        var cap = fig.querySelector("figcaption");
        if (cap) kirjeldus = cap.textContent.replace(pealkiri, "").trim();
      }
      if (a.classList.contains("slaid")) {
        var slaidid = Array.prototype.slice.call(
          a.parentNode.querySelectorAll("a.slaid")
        );
        pealkiri += ", vaade " + (slaidid.indexOf(a) + 1);
      }
      var img = a.querySelector("img");
      return {
        href: a.getAttribute("href"),
        alt: img ? img.getAttribute("alt") : "",
        pealkiri: pealkiri,
        kirjeldus: kirjeldus
      };
    });

    var kest = document.createElement("div");
    kest.className = "valgusti";
    kest.setAttribute("role", "dialog");
    kest.setAttribute("aria-modal", "true");
    kest.setAttribute("aria-label", "Joonis suurendatult");
    kest.innerHTML =
      '<div class="valgusti-sisu">' +
      '<button type="button" class="valgusti-nupp valgusti-sulge" aria-label="Sulge">\u00D7</button>' +
      '<button type="button" class="valgusti-nupp valgusti-eelmine" aria-label="Eelmine joonis">\u2190</button>' +
      '<button type="button" class="valgusti-nupp valgusti-jargmine" aria-label="Järgmine joonis">\u2192</button>' +
      '<div class="valgusti-raam"><img alt=""></div>' +
      '<p class="valgusti-pealdis"><span class="valgusti-tekst"></span>' +
      '<span class="valgusti-loendur"></span></p>' +
      "</div>";
    document.body.appendChild(kest);

    var pilt = kest.querySelector(".valgusti-raam img");
    var tekst = kest.querySelector(".valgusti-tekst");
    var loendur = kest.querySelector(".valgusti-loendur");
    var sulgeNupp = kest.querySelector(".valgusti-sulge");
    var eelmineNupp = kest.querySelector(".valgusti-eelmine");
    var jargmineNupp = kest.querySelector(".valgusti-jargmine");
    var raam = kest.querySelector(".valgusti-raam");
    var praegu = 0;
    var tagasiFookus = null;

    if (kirjed.length < 2) {
      eelmineNupp.hidden = true;
      jargmineNupp.hidden = true;
    }

    function naitaJoonis(i) {
      praegu = (i + kirjed.length) % kirjed.length;
      var k = kirjed[praegu];
      pilt.setAttribute("src", k.href);
      pilt.setAttribute("alt", k.alt);
      raam.classList.toggle("joonisel", k.href.indexOf("-joonis") !== -1);
      tekst.innerHTML = "";
      var tugev = document.createElement("strong");
      tugev.textContent = k.pealkiri;
      tekst.appendChild(tugev);
      if (k.kirjeldus) {
        tekst.appendChild(document.createTextNode(" " + k.kirjeldus));
      }
      loendur.textContent = praegu + 1 + " / " + kirjed.length;
      raam.scrollTop = 0;
      raam.scrollLeft = 0;
    }

    function ava(i, algataja) {
      tagasiFookus = algataja || null;
      naitaJoonis(i);
      kest.setAttribute("data-avatud", "");
      document.body.classList.add("valgusti-lahti");
      sulgeNupp.focus();
    }

    function sulge() {
      kest.removeAttribute("data-avatud");
      document.body.classList.remove("valgusti-lahti");
      if (tagasiFookus) tagasiFookus.focus();
    }

    lingid.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        ava(i, a);
      });
    });

    sulgeNupp.addEventListener("click", sulge);
    eelmineNupp.addEventListener("click", function () { naitaJoonis(praegu - 1); });
    jargmineNupp.addEventListener("click", function () { naitaJoonis(praegu + 1); });

    kest.addEventListener("click", function (e) {
      if (e.target === kest || e.target.classList.contains("valgusti-sisu")) sulge();
    });

    document.addEventListener("keydown", function (e) {
      if (!kest.hasAttribute("data-avatud")) return;
      if (e.key === "Escape") { sulge(); return; }
      if (kirjed.length < 2) return;
      if (e.key === "ArrowLeft") naitaJoonis(praegu - 1);
      if (e.key === "ArrowRight") naitaJoonis(praegu + 1);
      if (e.key === "Tab") {
        var fookustatavad = [sulgeNupp, eelmineNupp, jargmineNupp].filter(function (n) {
          return !n.hidden;
        });
        var esimene = fookustatavad[0];
        var viimane = fookustatavad[fookustatavad.length - 1];
        if (e.shiftKey && document.activeElement === esimene) {
          e.preventDefault(); viimane.focus();
        } else if (!e.shiftKey && document.activeElement === viimane) {
          e.preventDefault(); esimene.focus();
        }
      }
    });
  }
  /* ---------- Valgusti lõpp ---------- */

  /* ---------- Hinnapäringu vormid ---------- */
  Array.prototype.slice.call(document.querySelectorAll("form[data-paring]")).forEach(seaVorm);

  function seaVorm(vorm) {
    var teade = vorm.querySelector(".vormi-teade");
    var saada = vorm.querySelector("[data-saada]");
    var uuendus = vorm.querySelector("#olemasolev-plokk");

    vorm.addEventListener("change", function (e) {
      if (e.target.name === "liik" && uuendus) {
        uuendus.hidden = e.target.value !== "uuendus";
      }
    });

    vorm.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("viga-vali");
    });

    function naita(tekst, klass) {
      if (!teade) return;
      teade.textContent = tekst;
      teade.className = "vormi-teade " + klass;
      teade.hidden = false;
    }

    function vali(nimi) {
      return vorm.querySelector("[name=" + nimi + "]");
    }

    vorm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (teade) teade.hidden = true;

      var puudu = [];
      ["nimi", "epost", "sonum"].forEach(function (n) {
        var v = vali(n);
        if (v && !v.value.trim()) {
          v.classList.add("viga-vali");
          puudu.push(v);
        }
      });

      var epost = vali("epost");
      if (epost && epost.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(epost.value.trim())) {
        epost.classList.add("viga-vali");
        puudu.push(epost);
      }

      var nousolek = vali("nousolek");
      if (nousolek && !nousolek.checked) {
        naita("Palun kinnitage nõusolek andmete töötlemiseks.", "viga");
        nousolek.focus();
        return;
      }
      if (puudu.length) {
        naita("Palun täitke nimi, e-post ja kirjeldus.", "viga");
        puudu[0].focus();
        return;
      }

      var liikVali = vorm.querySelector("[name=liik]:checked");
      var olemasolev = vali("olemasolev");
      var ettevote = vali("ettevote");
      var telefon = vali("telefon");
      var meepott = vali("veebiaadress");

      saada.disabled = true;
      var vanaTekst = saada.textContent;
      saada.textContent = "Saadan\u2026";

      fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nimi: vali("nimi").value,
          ettevote: ettevote ? ettevote.value : "",
          epost: epost.value,
          telefon: telefon ? telefon.value : "",
          liik: liikVali ? liikVali.value : "",
          olemasolev: olemasolev ? olemasolev.value : "",
          sonum: vali("sonum").value,
          veebiaadress: meepott ? meepott.value : ""
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error("halb vastus");
          window.location.href = "/aitah.html";
        })
        .catch(function () {
          saada.disabled = false;
          saada.textContent = vanaTekst;
          naita("Päringu saatmine ebaõnnestus. Palun helistage +372 5387 4959 või kirjutage aadressil info@a-maja.com.", "viga");
        });
    });
  }
})();
