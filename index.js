const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const corsOptions = {
  origin: [
    "https://ai.google.dev",
    "https://makersuite.google.com",
    "https://aistudio.google.com"
    // tambahkan domain frontend lain jika ada, misalnya Vercel
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.post("/api/save", async (req, res) => {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: "Input is required" });

  const { data, error } = await supabase
    .from("user_inputs")
    .insert([{ user_input: input }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Saved successfully", data });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});