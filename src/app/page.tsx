'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState('');

  const handleNew = useCallback(() => {
    setContent('');
    router.refresh();
  }, [router]);

  const handleSave = useCallback(() => {
    if (!content.trim()) return;

    fetch('/api/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('failed to save paste');
      })
      .then((data) => {
        router.push(`/${data.id}`);
      })
      .catch((error) => {
        console.error('error saving paste:', error);
      });
  }, [content, router]);

  const keyboardClickHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }

      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        handleNew();
      }
    },
    [handleSave, handleNew]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyboardClickHandler);

    return () => {
      document.removeEventListener('keydown', keyboardClickHandler);
    };
  }, [keyboardClickHandler]);

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
          <button onClick={handleNew}>New</button>
        </div>
      </footer>
    </>
  );
}
