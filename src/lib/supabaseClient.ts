import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL as string;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY as string;

export const supabase = createClient<Database>(projectUrl, apiKey);
