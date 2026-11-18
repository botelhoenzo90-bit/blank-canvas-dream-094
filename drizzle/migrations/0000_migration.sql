CREATE TABLE public.buyers (
  email text PRIMARY KEY,
  name text,
  active boolean NOT NULL DEFAULT true,
  platform text,
  last_event text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.buyers TO service_role;
ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;