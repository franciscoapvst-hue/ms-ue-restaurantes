CREATE TABLE IF NOT EXISTS logs (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp   TIMESTAMPTZ DEFAULT NOW(),
  service     VARCHAR(50)  NOT NULL,
  level       VARCHAR(10)  NOT NULL,
  event       VARCHAR(100) NOT NULL,
  metadata    JSONB,
  ip          VARCHAR(45),
  duration_ms INTEGER
);
