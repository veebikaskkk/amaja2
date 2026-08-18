const piirang = new Map();

function puhasta(v, max) {
  return String(v == null ? "" : v)
    .slice(0, max)
    .replace(/[<>&"']/g, function (c) {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c];
    })
    .trim();
}

function lubatud(ip) {
  const nyyd = Date.now();
  const aken = 60 * 60 * 1000;
  const kirje = piirang.get(ip) || [];
  const varsked = kirje.filter((t) => nyyd - t < aken);
  if (varsked.length >= 5) return false;
  varsked.push(nyyd);
  piirang.set(ip, varsked);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "tundmatu";
  if (!lubatud(ip)) {
    return res.status(429).json({ ok: false });
  }

  const k = req.body || {};

  if (k.veebiaadress) {
    return res.status(200).json({ ok: true });
  }

  const nimi = puhasta(k.nimi, 120);
  const epost = puhasta(k.epost, 160);
  const sonum = puhasta(k.sonum, 5000);
  const ettevote = puhasta(k.ettevote, 160);
  const telefon = puhasta(k.telefon, 60);
  const olemasolev = puhasta(k.olemasolev, 200);
  const liigid = { uus: "Uus hoone", uuendus: "Olemasoleva uuendus", muu: "Muu" };
  const liik = liigid[k.liik] || "Uus hoone";

  if (!nimi || !epost || !sonum) {
    return res.status(400).json({ ok: false });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(epost)) {
    return res.status(400).json({ ok: false });
  }

  const read = [
    ["Nimi", nimi],
    ["Ettevõte", ettevote],
    ["E-post", epost],
    ["Telefon", telefon],
    ["Töö laad", liik],
    ["Olemasolev objekt", olemasolev],
  ]
    .filter(function (r) { return r[1]; })
    .map(function (r) { return "<p><strong>" + r[0] + ":</strong> " + r[1] + "</p>"; })
    .join("");

  const html =
    "<h2>Uus hinnapäring amaja.ee lehelt</h2>" +
    read +
    "<h3>Kirjeldus</h3><p>" +
    sonum.replace(/\n/g, "<br>") +
    "</p>";

  try {
    const vastus = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.SAATJA,
        to: [process.env.SAAJA],
        reply_to: epost,
        subject: "Hinnapäring: " + nimi + (ettevote ? " (" + ettevote + ")" : ""),
        html: html,
      }),
    });

    if (!vastus.ok) {
      console.error("Resend viga", vastus.status);
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (viga) {
    console.error("Saatmise viga", viga && viga.message);
    return res.status(500).json({ ok: false });
  }
}
