import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cog, HardHat } from 'lucide-react';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'BOMPilot',
  description: 'Intelligent BOM Lifecycle Co-Pilot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased h-full')}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="h-10 w-10 rounded-full p-2 text-sidebar-primary">
                  <HardHat className="h-full w-full" />
                </Button>
                <div className="flex flex-col">
                  <span className="font-headline text-lg font-semibold text-sidebar-primary">
                    BOMPilot
                  </span>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/1/100/100" data-ai-hint="person face" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium text-sidebar-foreground">
                    Admin User
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    admin@bopilot.com
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                  <Cog />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
