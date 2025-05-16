'use client';

import { useRouter } from 'next/navigation';

type FooterProps = {
  canSave?: boolean;
  onSave?: () => void;
  onNew?: () => void;
};

export function Footer({ canSave = false, onSave, onNew }: FooterProps) {
  const router = useRouter();

  const handleNew = () => {
    if (onNew) {
      onNew();
    } else {
      router.push('/');
    }
  };

  return (
    <footer>
      <div className="about">
        <a href="https://github.com/susgee-dev/susgee-paste" target="_blank">
          GitHub
        </a>
      </div>
      <div className="actions">
        <button onClick={onSave} disabled={!canSave}>
          Save
        </button>
        <button onClick={handleNew}>New</button>
      </div>
    </footer>
  );
}
