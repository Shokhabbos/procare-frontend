import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { AppProviders } from './providers';
import { router } from './router';

/**
 * Ilova kirish nuqtasi
 */
export function App() {
  return (
    <AppProviders>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="text-lg">Yuklanmoqda...</div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  );
}
