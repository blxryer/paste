'use client';

import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');

  const handleSave = useCallback(() => {
    if (!content.trim()) return;

    console.log(content);
  }, [content]);

  const keyboardSaveHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    },
    [handleSave]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardSaveHandler);

    return () => {
      document.removeEventListener('keydown', keyboardSaveHandler);
    };
  }, [keyboardSaveHandler]);

  return (
    <>
      <textarea
        aria-label="Content input"
        autoFocus
        spellCheck="false"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <footer>
        <div className="about">
          <a href="https://github.com/susgee-dev/susgee-paste" target="_blank">
            GitHub
          </a>
        </div>
        <div className="actions">
          <button onClick={handleSave} disabled={!content.trim()}>
            Save
          </button>
          <button>New</button>
        </div>
      </footer>
    </>
  );
}
