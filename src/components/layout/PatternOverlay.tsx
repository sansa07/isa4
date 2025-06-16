import React from 'react';

export default function PatternOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-amber-50/30"></div>
    </div>
  );
}