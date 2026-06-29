import React from "react";

export function SkeletonCard() {
  return (
    <div className="w-full rounded-[var(--radius-cards)] border border-lavender-mist bg-eclipse-black p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-2/5 rounded bg-lavender-mist/40"></div>
          <div className="h-8 w-1/3 rounded bg-lavender-mist/40"></div>
        </div>
        <div className="h-11 w-11 rounded-[var(--radius-inputs)] bg-lavender-mist/40"></div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full border border-lavender-mist bg-eclipse-black rounded-[var(--radius-cards)] overflow-hidden animate-pulse">
      <div className="border-b border-lavender-mist bg-carbon-ink/40 px-6 py-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 flex-1 rounded bg-lavender-mist/40"></div>
        ))}
      </div>
      <div className="divide-y divide-lavender-mist/30 px-6 py-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="py-4 flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 flex-1 rounded bg-lavender-mist/20"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-[var(--radius-cards)] border border-lavender-mist bg-eclipse-black p-6 animate-pulse flex flex-col items-center">
      <div className="h-6 w-1/2 rounded bg-lavender-mist/40 self-start mb-6"></div>
      <div className="h-48 w-48 rounded-full border-[12px] border-lavender-mist/40 flex items-center justify-center mb-6">
        <div className="h-24 w-24 rounded-full bg-eclipse-black"></div>
      </div>
      <div className="flex justify-center gap-4 w-full px-4">
        <div className="h-4 flex-1 rounded bg-lavender-mist/40"></div>
        <div className="h-4 flex-1 rounded bg-lavender-mist/40"></div>
        <div className="h-4 flex-1 rounded bg-lavender-mist/40"></div>
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="rounded-[var(--radius-cards)] border border-lavender-mist bg-eclipse-black p-6 sm:p-8 animate-pulse space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-1/4 rounded bg-lavender-mist/40"></div>
          <div className="h-6 w-1/2 rounded bg-lavender-mist/20"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonComplaint() {
  return (
    <div className="rounded-[var(--radius-cards)] border border-lavender-mist bg-eclipse-black p-6 sm:p-8 animate-pulse space-y-6">
      <div className="space-y-3">
        <div className="h-8 w-2/3 rounded bg-lavender-mist/40"></div>
        <div className="h-4 w-1/3 rounded bg-lavender-mist/40"></div>
      </div>
      <hr className="border-lavender-mist/30" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/6 rounded bg-lavender-mist/40"></div>
            <div className="h-5 w-3/4 rounded bg-lavender-mist/20"></div>
          </div>
        ))}
      </div>
      <hr className="border-lavender-mist/30" />
      <div className="space-y-4">
        <div className="h-6 w-1/4 rounded bg-lavender-mist/40"></div>
        <div className="h-16 w-full rounded bg-lavender-mist/20"></div>
        <div className="h-10 w-24 rounded bg-lavender-mist/40"></div>
      </div>
    </div>
  );
}

