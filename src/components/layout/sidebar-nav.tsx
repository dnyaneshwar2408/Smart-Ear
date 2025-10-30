'use client';

import {
  BarChart2,
  GitBranch,
  Home,
  Layers,
  ListChecks,
  PackageSearch,
  ShoppingCart,
  Settings,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/bom-conversion', label: 'BOM Conversion', icon: Wrench },
  { href: '/bom-visualization', label: 'BOM Visualization', icon: Layers },
  {
    href: '/inventory-forecasting',
    label: 'Inventory Forecast',
    icon: PackageSearch,
  },
  { href: '/procurement', label: 'Procurement', icon: ShoppingCart },
  { href: '/sourcing', label: 'Smart Sourcing', icon: ListChecks },
  { href: '/change-management', label: 'Change Management', icon: GitBranch },
  { href: '/reports', label: 'Reports & Analytics', icon: BarChart2 },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}