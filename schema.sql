CREATE TABLE pastes (
    id String,
    content String,
    created_at DateTime DEFAULT now(),
    CONSTRAINT unique_id UNIQUE (id)
) ENGINE = MergeTree()
ORDER BY id
