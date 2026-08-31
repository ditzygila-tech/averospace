const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ZELAPI_KEY;

if (!API_KEY) {
  console.warn("WARNING: ZELAPI_KEY belum diset.");
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BASE_URL = "https://zelapi.eu.cc/api/v1/premium";

async function zelRequest(endpoint, body) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); }
  catch { data = { status: false, message: text || "Invalid API response" }; }

  if (!response.ok || data.status === false) {
    const error = new Error(data.message || data.error || `ZelAPI error (${response.status})`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

app.post("/api/send", async (req, res) => {
  const email = String(req.body?.email || "").trim();

  if (!email) return res.status(400).json({ status: false, message: "Email wajib diisi." });
  if (!API_KEY) return res.status(500).json({ status: false, message: "Server API key belum dikonfigurasi." });

  try {
    res.json(await zelRequest("send", { email }));
  } catch (err) {
    res.status(err.status || 500).json(err.data || { status: false, message: err.message });
  }
});

app.post("/api/verif", async (req, res) => {
  const email = String(req.body?.email || "").trim();
  const link = String(req.body?.link || "").trim();

  if (!email || !link) {
    return res.status(400).json({ status: false, message: "Email dan verification URL wajib diisi." });
  }

  if (!API_KEY) return res.status(500).json({ status: false, message: "Server API key belum dikonfigurasi." });

  try {
    res.json(await zelRequest("verif", { email, link }));
  } catch (err) {
    res.status(err.status || 500).json(err.data || { status: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AveroSpace running on http://localhost:${PORT}`);
});
