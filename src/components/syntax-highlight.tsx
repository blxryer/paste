'use client';

import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  content: string;
  extension: string;
};

export function SyntaxHighlight({ content, extension }: Props) {
  const extensionMap: Record<string, string> = {
    rb: 'ruby',
    py: 'python',
    pl: 'perl',
    php: 'php',
    scala: 'scala',
    go: 'go',
    xml: 'xml',
    html: 'xml',
    htm: 'xml',
    css: 'css',
    js: 'javascript',
    vbs: 'vbscript',
    lua: 'lua',
    pas: 'delphi',
    java: 'java',
    cpp: 'cpp',
    cc: 'cpp',
    m: 'objectivec',
    vala: 'vala',
    sql: 'sql',
    sm: 'smalltalk',
    lisp: 'lisp',
    ini: 'ini',
    diff: 'diff',
    bash: 'bash',
    sh: 'bash',
    tex: 'tex',
    erl: 'erlang',
    hs: 'haskell',
    md: 'markdown',
    txt: '',
    coffee: 'coffee',
    swift: 'swift'
  };

  const language = extensionMap[extension] || '';

  return (
    <SyntaxHighlighter language={language} style={vs2015} showLineNumbers>
      {content}
    </SyntaxHighlighter>
  );
}
