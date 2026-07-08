'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Custom zero-dependency WYSIWYG editor using native contentEditable.
// Designed to match the dark/gold premium aesthetic of the console.
// ═══════════════════════════════════════════════════════════════════════════

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync external value to internal HTML only if we aren't actively typing
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
    handleInput();
  };

  const handleLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      exec('createLink', url);
    }
  };

  const ToolbarButton = ({ icon, onClick, title }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold hover:bg-white/5 rounded-sm transition-colors"
    >
      <i className={`fa-solid ${icon} text-[13px]`} />
    </button>
  );

  return (
    <div className={`w-full bg-black/40 border rounded-sm transition-colors overflow-hidden ${isFocused ? 'border-gold/60' : 'border-white/10'}`}>
      
      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/5 bg-white/[0.02]">
        
        <select
          onChange={(e) => {
            if (e.target.value === 'p') {
              exec('formatBlock', 'P');
            } else {
              exec('formatBlock', e.target.value);
            }
            e.target.value = ''; // reset select
          }}
          className="bg-transparent border border-white/10 text-white/80 text-xs px-2 py-1.5 rounded-sm outline-none cursor-pointer hover:border-gold/50 transition-colors appearance-none"
          title="Format"
          defaultValue=""
        >
          <option value="" disabled className="text-black">Normal</option>
          <option value="H2" className="text-black">Heading 2</option>
          <option value="H3" className="text-black">Heading 3</option>
          <option value="p" className="text-black">Paragraph</option>
          <option value="BLOCKQUOTE" className="text-black">Quote</option>
        </select>
        
        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <ToolbarButton icon="fa-bold" title="Bold" onClick={() => exec('bold')} />
        <ToolbarButton icon="fa-italic" title="Italic" onClick={() => exec('italic')} />
        <ToolbarButton icon="fa-underline" title="Underline" onClick={() => exec('underline')} />
        
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        
        <ToolbarButton icon="fa-list-ul" title="Bullet List" onClick={() => exec('insertUnorderedList')} />
        <ToolbarButton icon="fa-list-ol" title="Numbered List" onClick={() => exec('insertOrderedList')} />
        
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        
        <ToolbarButton icon="fa-link" title="Insert Link" onClick={handleLink} />
        <ToolbarButton icon="fa-eraser" title="Clear Formatting" onClick={() => exec('removeFormat')} />
      </div>

      {/* ── Editable Area ──────────────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full min-h-[300px] max-h-[600px] overflow-y-auto p-5 text-white/90 text-sm font-sans leading-relaxed outline-none prose prose-invert prose-gold prose-sm max-w-none"
        style={{
          // Tailwind prose won't style contentEditable natively without global overrides,
          // so we inject some basic resets here to ensure WYSIWYG behavior matches the frontend.
        }}
      />
      
      {/* 
        Inject raw CSS for the editor content specifically since it doesn't 
        have standard Tailwind classes generated dynamically inside it.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        [contenteditable] h2 { font-family: "Playfair Display Variable", serif; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #fff; }
        [contenteditable] h3 { font-family: "Playfair Display Variable", serif; font-size: 1.25rem; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #fff; }
        [contenteditable] p { margin-bottom: 1rem; }
        [contenteditable] a { color: #d4af37; text-decoration: underline; }
        [contenteditable] ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        [contenteditable] ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        [contenteditable] blockquote { border-left: 2px solid #d4af37; padding-left: 1rem; margin-left: 0; margin-bottom: 1rem; color: rgba(255,255,255,0.7); font-style: italic; }
      `}} />
    </div>
  );
}
