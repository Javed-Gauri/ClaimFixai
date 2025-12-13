const API = "/.netlify/functions/server";

async function search() {
  const q = document.getElementById("searchInput").value;
  const res = await fetch(`${API}/api/search/${q}`);
  document.getElementById("searchResult").textContent =
    JSON.stringify(await res.json(), null, 2);
}

async function checkNCCI() {
  const res = await fetch(`${API}/api/ncci/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cpt1: cpt1.value,
      cpt2: cpt2.value,
      context: { encounters: 1, sites: ["arm","leg"], providers: 1 }
    })
  });
  document.getElementById("ncciResult").textContent =
    JSON.stringify(await res.json(), null, 2);
}

async function scoreClaim() {
  const res = await fetch(`${API}/api/claim/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bundled: true,
      modifierAllowed: true,
      appealable: true,
      days: 10,
      timely: 90
    })
  });
  document.getElementById("scoreResult").textContent =
    JSON.stringify(await res.json(), null, 2);
}

async function loadLesson() {
  const res = await fetch(`${API}/api/learning/bundled_no_modifier`);
  document.getElementById("lessonResult").textContent =
    JSON.stringify(await res.json(), null, 2);
}
