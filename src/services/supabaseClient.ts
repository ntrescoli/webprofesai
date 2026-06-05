import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fhizljhbxuhwxkwnhjli.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoaXpsamhieHVod3hrd25oamxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MTY0MzYsImV4cCI6MjA5NTA5MjQzNn0.6JvGdZu_3YfMhX-SgPk8pJSrjsUmWwAkS-NHBR_tC9I'
export const supabase = createClient(supabaseUrl, supabaseKey)