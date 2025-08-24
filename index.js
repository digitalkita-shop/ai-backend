const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Logging awal
console.log("✅ Supabase client initialized");
console.log("🌐 Allowed origins:", [
  "https://ai.google.dev",
  "https://makersuite.google.com",
  "https://aistudio.google.com"
  "https://digitalkita-prompt-engineer-556526195905.us-west1.run.app/"

]);

const corsOptions = {
  origin: [
    "https://ai.google.dev",
    "https://makersuite.google.com",
    "https://aistudio.google.com"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json()); // Penting: pastikan JSON parser aktif

app.post("/api/save", async (req, res) => {
  console.log("📩 Request masuk ke /api/save");

  // Log full body
  console.log("🧾 Request body:", req.body);

  const { input } = req.body;

  if (!input) {
    console.warn("⚠️ Field 'input' kosong atau tidak dikirim");
    return res.status(400).json({ error: "Input is required" });
  }

  // Log sebelum kirim ke Supabase
  console.log("📤 Menyimpan ke Supabase:", { user_input: input });

  const { data, error } = await supabase
    .from("user_inputs")
    .insert([{ user_input: input }]);

  if (error) {
    console.error("❌ Gagal simpan ke Supabase:", error);
    return res.status(500).json({ error: error.message });
  }

  console.log("✅ Data berhasil disimpan ke Supabase:", data);

  res.json({ message: "Saved successfully", data });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
