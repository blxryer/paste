CREATE TABLE pastes (
    id String,
    content String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY id