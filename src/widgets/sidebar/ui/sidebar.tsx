import type { ComponentType, CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  BarChart3,
  Package,
  Settings,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';
import { ProcareBigLogo, ProcareTinyLogo } from '@shared/ui/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shared/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@shared/ui/sidebar';

interface NavSubItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  path?: string;
  children?: NavSubItem[];
}

export function AppSidebar() {
  const location = useLocation();
  const t = useT();
  const { state } = useSidebar();

  const navItems: NavItem[] = [
    {
      label: t('nav.home'),
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      label: t('nav.tasks'),
      icon: CheckSquare,
      path: ROUTES.TASKS,
    },
    {
      label: t('nav.customers'),
      icon: Users,
      path: ROUTES.CUSTOMERS,
    },
    {
      label: t('nav.analytics'),
      icon: BarChart3,
      path: ROUTES.ANALYTICS,
    },
    {
      label: t('nav.products'),
      icon: Package,
      children: [
        {
          label: t('nav.services'),
          path: ROUTES.PRODUCTS.SERVICES,
        },
        {
          label: t('nav.repairParts'),
          path: ROUTES.PRODUCTS.REPAIR_PARTS,
        },
      ],
    },
    {
      label: t('nav.settings'),
      icon: Settings,
      children: [
        {
          label: t('nav.roles'),
          path: ROUTES.SETTINGS.ROLES,
        },
        {
          label: t('nav.branches'),
          path: ROUTES.SETTINGS.BRANCHES,
        },
        {
          label: t('nav.employees'),
          path: ROUTES.SETTINGS.EMPLOYEES,
        },
        {
          label: t('nav.statuses'),
          path: ROUTES.SETTINGS.STATUSES,
        },
        {
          label: t('nav.phones'),
          path: ROUTES.SETTINGS.PHONES,
        },
        {
          label: t('nav.warranty'),
          path: ROUTES.SETTINGS.WARRANTY,
        },
        {
          label: t('nav.offer'),
          path: ROUTES.SETTINGS.OFFER,
        },
      ],
    },
    {
      label: t('nav.telegramBot'),
      icon: MessageSquare,
      children: [
        {
          label: t('nav.templates'),
          path: ROUTES.TELEGRAM_BOT.TEMPLATES,
        },
        {
          label: t('nav.messages'),
          path: ROUTES.TELEGRAM_BOT.MESSAGES,
        },
        {
          label: t('nav.logs'),
          path: ROUTES.TELEGRAM_BOT.LOGS,
        },
      ],
    },
  ];

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (children?: NavSubItem[]) => {
    if (!children) return false;
    return children.some((child) => isActive(child.path));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="!bg-white border border-border-primary !rounded-[14px]"
      style={
        {
          '--sidebar-width': '280px',
          '--sidebar-width-icon': '64px',
          '--sidebar-background': '#ffffff',
          '--sidebar-border': 'var(--border-primary)',
          '--sidebar-offset': '16px',
        } as CSSProperties
      }
    >
      <SidebarHeader className="border-b border-border-primary items-center px-4 pt-4 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="w-full gap-3 !bg-transparent justify-center hover:!bg-transparent !h-20 !p-4"
              asChild
            >
              <Link to={ROUTES.DASHBOARD}>
                {state === 'collapsed' ? (
                  <ProcareTinyLogo size={56} className="text-text-brand" />
                ) : (
                  <ProcareBigLogo
                    width={220}
                    height={72}
                    className="text-text-brand"
                  />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-12-light text-text-description uppercase px-3 mb-4">
            Sahifalar
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) =>
                item.children ? (
                  <Collapsible
                    key={item.label}
                    defaultOpen={isParentActive(item.children)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="text-14-light hover:!bg-bg-brand hover:!text-text-brand data-[state=open]:!bg-bg-brand data-[state=open]:!text-text-brand"
                          isActive={isParentActive(item.children)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                          <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="border-l-2 border-brand-blue ml-3 pl-3">
                          {item.children.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.path)}
                                className="text-14-light hover:!bg-bg-brand hover:!text-text-brand data-[active=true]:!bg-bg-brand data-[active=true]:!text-text-brand"
                              >
                                <Link to={subItem.path}>
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      className="text-14-light hover:!bg-bg-brand hover:!text-text-brand data-[active=true]:!bg-bg-brand data-[active=true]:!text-text-brand"
                    >
                      <Link to={item.path!}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
