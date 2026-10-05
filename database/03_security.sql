-- Enable Row Level Security on all tables
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access (SELECT) for everyone
CREATE POLICY "Allow public read access on genres" 
ON genres FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access on movies" 
ON movies FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access on reviews" 
ON reviews FOR SELECT 
USING (true);

-- Allow public to insert reviews
CREATE POLICY "Allow public insert access on reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);
