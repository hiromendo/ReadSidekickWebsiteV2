import type posthogLib from 'posthog-js';

let posthogInstance: typeof posthogLib | null = null;

export async function initPostHog(): Promise<typeof posthogLib | null> {
  if (posthogInstance) return posthogInstance;

  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) {
    console.warn('PostHog key not configured');
    return null;
  }

  const { default: posthog } = await import('posthog-js');
  posthog.init(key, {
    api_host: 'https://us.i.posthog.com',
    capture_pageview: false,
    capture_pageleave: false,
    persistence: 'localStorage',
  });

  posthogInstance = posthog;
  return posthog;
}

export function getPostHog(): typeof posthogLib | null {
  return posthogInstance;
}
