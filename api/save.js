import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  const { data, error } = await supabase
    .from("user_inputs")
    .insert([{ user_input: input }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "Saved successfully", data });
}