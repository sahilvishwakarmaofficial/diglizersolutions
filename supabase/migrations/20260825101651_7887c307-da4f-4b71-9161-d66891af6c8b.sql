ALTER TABLE public.career_applications
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS work_type text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS experience text;