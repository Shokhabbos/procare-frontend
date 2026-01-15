import { useOutletContext } from 'react-router-dom';
import type { DashboardOutletContext } from '@app/layouts/dashboard-layout';

/**
 * Hook for pages to set header content
 * Usage in pages:
 *   const { setHeaderLeft, setHeaderRight } = useDashboardHeader();
 *   useEffect(() => {
 *     setHeaderLeft(<h1>Title</h1>);
 *     setHeaderRight(<Button>Action</Button>);
 *   }, []);
 */
export function useDashboardHeader() {
  return useOutletContext<DashboardOutletContext>();
}
