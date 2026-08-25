ALTER TABLE public.project_enquiries
  ADD COLUMN IF NOT EXISTS project_type TEXT,
  ADD COLUMN IF NOT EXISTS industry TEXT,
  ADD COLUMN IF NOT EXISTS preferred_start_date TEXT,
  ADD COLUMN IF NOT EXISTS engagement_type TEXT,
  ADD COLUMN IF NOT EXISTS social_link TEXT,
  ADD COLUMN IF NOT EXISTS main_challenge TEXT,
  ADD COLUMN IF NOT EXISTS deliverables TEXT,
  ADD COLUMN IF NOT EXISTS target_audience TEXT,
  ADD COLUMN IF NOT EXISTS project_goals TEXT,
  ADD COLUMN IF NOT EXISTS existing_assets TEXT,
  ADD COLUMN IF NOT EXISTS reference_links TEXT,
  ADD COLUMN IF NOT EXISTS additional_info TEXT,
  ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT,
  ADD COLUMN IF NOT EXISTS best_time_to_contact TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS consent BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS source_page TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS landing_page TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS submission_status TEXT NOT NULL DEFAULT 'received',
  ADD COLUMN IF NOT EXISTS attachment_path TEXT,
  ADD COLUMN IF NOT EXISTS dedupe_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS project_enquiries_dedupe_key_key
  ON public.project_enquiries (dedupe_key);

GRANT INSERT ON public.project_enquiries TO anon, authenticated;
GRANT ALL ON public.project_enquiries TO service_role;

DROP POLICY IF EXISTS "Anyone can upload an enquiry attachment" ON storage.objects;
CREATE POLICY "Anyone can upload an enquiry attachment"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'enquiry-uploads');