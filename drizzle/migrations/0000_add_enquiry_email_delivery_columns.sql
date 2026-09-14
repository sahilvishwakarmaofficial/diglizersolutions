ALTER TABLE public.project_enquiries
  ADD COLUMN IF NOT EXISTS email_delivery_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_provider_id text,
  ADD COLUMN IF NOT EXISTS email_error text;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS email_delivery_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_provider_id text,
  ADD COLUMN IF NOT EXISTS email_error text;