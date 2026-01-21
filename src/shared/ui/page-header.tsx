import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useDashboardHeader } from '@shared/hooks';

export interface PageHeaderProps {
  /**
   * Header title - string yoki custom ReactNode
   */
  title: string | ReactNode;
  /**
   * Header actions (buttons, search, filters)
   */
  actions?: ReactNode;
}

/**
 * PageHeader - Deklarativ header component
 *
 * Usage:
 * ```tsx
 * <PageHeader
 *   title={t('nav.tasks')}
 *   actions={<><SearchInput /><Button>Add</Button></>}
 * />
 * ```
 *
 * Automatic cleanup when component unmounts
 */
export function PageHeader({ title, actions }: PageHeaderProps) {
  const { setHeaderLeft, setHeaderRight } = useDashboardHeader();

  useEffect(() => {
    setHeaderLeft(
      typeof title === 'string' ? (
        <h1 className="text-16-regular md:text-20-medium text-gray-800">
          {title}
        </h1>
      ) : (
        title
      ),
    );
    return () => setHeaderLeft(null);
  }, [title, setHeaderLeft]);

  useEffect(() => {
    setHeaderRight(actions || null);
    return () => setHeaderRight(null);
  }, [actions, setHeaderRight]);

  return null;
}
