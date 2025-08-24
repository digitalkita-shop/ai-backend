const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.use(cors());
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