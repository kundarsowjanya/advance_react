
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://bzggjxxpvxxxpvcixqin.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z2dqeHhwdnh4eHB2Y2l4cWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NDY0MzIsImV4cCI6MjA2MjUyMjQzMn0.nRw281rBGg7HTdHVOEQ2z6fIwyJmWxXGAqqcThQvsx8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase