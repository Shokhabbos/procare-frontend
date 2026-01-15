import type { CSSProperties } from 'react';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, LogOut } from 'lucide-react';
import { ROUTES } from '@shared/constants';
import { useT } from '@shared/lib/i18n';
import { ProcareBigLogo, ProcareTinyLogo } from '@shared/ui/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shared/ui/collapsible';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@shared/ui/sidebar';
import { getNavItems, type NavSubItem } from './sidebar-nav-items';
import { useLogout } from '@features/auth-logout/model/use-logout';

/**
 * Sidebar komponenti - Shadcn Sidebar bilan collapsible
 */
export function Sidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const t = useT();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const navItems = getNavItems(t);

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (children?: NavSubItem[]) => {
    if (!children) return false;
    return children.some((child) => isActive(child.path));
  };

  return (
    <SidebarPrimitive
      collapsible="icon"
      className="!bg-white border border-[#EBECEC] !rounded-xl"
      style={
        {
          '--sidebar-width': '268px',
          '--sidebar-width-icon': '64px',
          '--sidebar-background': '#ffffff',
          '--sidebar-border': '#EBECEC',
          '--sidebar-offset': '16px',
        } as CSSProperties
      }
    >
      {/* Header - Logo */}
      <SidebarHeader className="border-b border-[#EBECEC] items-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex h-24 w-full items-center justify-center group-data-[collapsible=icon]:h-14"
        >
          {state === 'collapsed' ? (
            <ProcareTinyLogo size={16} className="text-[#00BFFF]" />
          ) : (
            <ProcareBigLogo width={99} height={32} className="text-[#00BFFF]" />
          )}
        </Link>
      </SidebarHeader>

      {/* Content - Navigation */}
      <SidebarContent className="p-3 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!py-2">
        <SidebarGroup className="group-data-[collapsible=icon]:!p-0">
          <span className="!text-12-light !text-black-500 text-description whitespace-nowrap inline-block pl-0 pr-3 mb-2 group-data-[collapsible=icon]:hidden">
            {t('nav.pages')}
          </span>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:!gap-1 group-data-[collapsible=icon]:!items-center">
              {navItems.map((item) => {
                const isAppSettings = item.label === t('nav.appSettings');

                return (
                  <Fragment key={item.label}>
                    {isAppSettings && (
                      <span className="!text-12-light !text-black-500 text-description pl-0 pr-3 mt-4 mb-2 group-data-[collapsible=icon]:hidden whitespace-nowrap inline-block">
                        {t('nav.appSettings')}
                      </span>
                    )}
                    {item.children ? (
                      <Collapsible
                        defaultOpen={isParentActive(item.children)}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className="!text-14-light text-body data-[state=open]:!text-gray-900 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center"
                              isActive={isParentActive(item.children)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  '#E6F7FF';
                                e.currentTarget.style.color = '#00BFFF';
                              }}
                              onMouseLeave={(e) => {
                                if (!isParentActive(item.children)) {
                                  e.currentTarget.style.backgroundColor = '';
                                  e.currentTarget.style.color = '';
                                }
                              }}
                              tooltip={
                                state === 'collapsed' ? item.label : undefined
                              }
                            >
                              <span className="text-[#00BFFF]">
                                <item.icon className="w-5 h-5 shrink-0" />
                              </span>
                              <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap inline-block">
                                {item.label}
                              </span>
                              <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                            <SidebarMenuSub
                              className="border-l-2 ml-3 pl-3"
                              style={{ borderColor: '#00BFFF' }}
                            >
                              {item.children.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isActive(subItem.path)}
                                    className="!text-14-light text-body"
                                    style={
                                      isActive(subItem.path)
                                        ? {
                                            backgroundColor: '#E6F7FF',
                                            color: '#00BFFF',
                                          }
                                        : undefined
                                    }
                                  >
                                    <Link
                                      to={subItem.path}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          '#E6F7FF';
                                        e.currentTarget.style.color = '#00BFFF';
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isActive(subItem.path)) {
                                          e.currentTarget.style.backgroundColor =
                                            '';
                                          e.currentTarget.style.color = '';
                                        }
                                      }}
                                    >
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
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.path)}
                          className="!text-14-light text-body group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center"
                          style={
                            isActive(item.path)
                              ? { backgroundColor: '#E6F7FF', color: '#00BFFF' }
                              : undefined
                          }
                          tooltip={
                            state === 'collapsed' ? item.label : undefined
                          }
                        >
                          <Link
                            to={item.path!}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E6F7FF';
                              e.currentTarget.style.color = '#00BFFF';
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive(item.path)) {
                                e.currentTarget.style.backgroundColor = '';
                                e.currentTarget.style.color = '';
                              }
                            }}
                          >
                            <span className="text-[#00BFFF]">
                              <item.icon className="w-5 h-5 shrink-0" />
                            </span>
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.label}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </Fragment>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Logout */}
      <SidebarFooter className="border-t border-[#EBECEC] p-3 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="!text-14-light text-body group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center hover:!bg-red-50 hover:!text-red-600 disabled:opacity-50"
              tooltip={state === 'collapsed' ? t('nav.logout') : undefined}
            >
              <span className="text-red-600">
                <LogOut className="w-5 h-5 shrink-0" />
              </span>
              <span className="group-data-[collapsible=icon]:hidden">
                {t('nav.logout')}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
