export async function handler(event) {
  const path = event.path.replace("/.netlify/functions/server", "");

  if (path.startsWith("/api/search/")) {
    return json({ type: "SEARCH", value: path.split("/").pop() });
  }

  if (path === "/api/ncci/check") {
    return json({
      bundled: true,
      modifierAllowed: true,
      suggestedModifier: { mod: "-XS", reason: "Separate structure" }
    });
  }

  if (path === "/api/claim/score") {
    return json({ score: 82, risk: "LOW" });
  }

  if (path === "/api/learning/bundled_no_modifier") {
    return json({
      title: "Bundled CPTs",
      why_failed: "NCCI bundling without modifier",
      how_to_fix: ["Apply modifier", "Ensure documentation"]
    });
  }

  return json({ message: "API Running" });
}

function json(data) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
}
