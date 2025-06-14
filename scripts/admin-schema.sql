-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the main admin
INSERT INTO admin_users (email, role) VALUES ('sonishriyash@gmail.com', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Create test_series table
CREATE TABLE IF NOT EXISTS test_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  mentor_id UUID REFERENCES profiles(id),
  duration INTEGER NOT NULL, -- in minutes
  questions INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  price DECIMAL(10,2),
  max_students INTEGER,
  enrolled_count INTEGER DEFAULT 0,
  test_date TIMESTAMP WITH TIME ZONE,
  test_time TIME,
  tags TEXT[],
  syllabus TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create webinars table
CREATE TABLE IF NOT EXISTS webinars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  speaker_id UUID REFERENCES profiles(id),
  webinar_date TIMESTAMP WITH TIME ZONE,
  webinar_time TIME,
  duration INTEGER NOT NULL, -- in minutes
  max_attendees INTEGER,
  attendees_count INTEGER DEFAULT 0,
  category TEXT,
  level TEXT,
  price DECIMAL(10,2),
  topics TEXT[],
  thumbnail_url TEXT,
  is_live BOOLEAN DEFAULT false,
  is_recorded BOOLEAN DEFAULT false,
  recording_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_sessions table
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  mentor_id UUID REFERENCES profiles(id),
  student_id UUID REFERENCES profiles(id),
  session_date TIMESTAMP WITH TIME ZONE,
  session_time TIME,
  duration INTEGER NOT NULL, -- in minutes
  session_type TEXT CHECK (session_type IN ('1-on-1', 'Group', 'Roadmap')),
  price DECIMAL(10,2),
  status TEXT CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')) DEFAULT 'scheduled',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  booking_type TEXT CHECK (booking_type IN ('test', 'webinar', 'mentorship')),
  item_id UUID, -- references test_series, webinars, or mentorship_sessions
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  test_id UUID REFERENCES test_series(id),
  score INTEGER,
  max_score INTEGER,
  percentile DECIMAL(5,2),
  rank INTEGER,
  time_taken INTEGER, -- in minutes
  answers JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_series_mentor ON test_series(mentor_id);
CREATE INDEX IF NOT EXISTS idx_webinars_speaker ON webinars(speaker_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentor ON mentorship_sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_student ON mentorship_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_test ON test_results(test_id);

-- Update profiles table to include mentor information
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_mentor BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mentor_subjects TEXT[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mentor_specialization TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mentor_rating DECIMAL(3,2) DEFAULT 0.0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mentor_experience TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;
