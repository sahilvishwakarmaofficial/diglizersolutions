DROP POLICY IF EXISTS "Anyone can apply" ON public.career_applications;
DROP POLICY IF EXISTS "Anyone can submit a project enquiry" ON public.project_enquiries;
DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;
REVOKE INSERT ON public.career_applications FROM anon, authenticated;
REVOKE INSERT ON public.project_enquiries FROM anon, authenticated;
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;
DROP POLICY IF EXISTS "Anyone can upload an enquiry attachment" ON storage.objects;