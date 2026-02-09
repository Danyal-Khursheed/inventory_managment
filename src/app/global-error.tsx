'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    try {
      Sentry.captureException(error);
    } catch (_) {
      // Sentry may not be configured or may throw; don't crash the error UI
    }
  }, [error]);

  return (
    <html>
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          maxWidth: '480px',
          margin: '0 auto'
        }}
      >
        <h1>Something went wrong</h1>
        <p>
          A client-side error occurred. Check the browser console for details.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre
            style={{
              fontSize: '12px',
              overflow: 'auto',
              background: '#f5f5f5',
              padding: '1rem'
            }}
          >
            {error?.message}
          </pre>
        )}
      </body>
    </html>
  );
}
