'use client';

import { SIDEBAR_ROUTES } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const role = 'super-admin';

  const { mainSections, bottomSection } = SIDEBAR_ROUTES[role] || {
    mainSections: [],
    bottomSection: { items: [] },
  };

  return (
    <>
      {/* Empty spacer div that matches sidebar width */}
      <div className="w-64 flex-shrink-0" aria-hidden="true"></div>

      {/* Actual fixed sidebar */}
      <nav className="w-64 h-screen bg-background border-r flex flex-col fixed top-0 left-0 z-50">
        {/* Header with Logo and Search */}
        <div className="px-6 py-6">
          <h1 className="text-2xl font-bold">
            <span className="text-primary uppercase">click</span>
            <span className="text-foreground uppercase"> fitness</span>
          </h1>
        </div>

        {/* Scrollable Main Content */}
        <ScrollArea className="flex-1 px-4 pb-4">
          {mainSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Button
                      variant={pathname === item.path ? 'secondary' : 'ghost'}
                      className={`w-full justify-start gap-3 ${
                        pathname === item.path ? 'font-medium' : ''
                      }`}
                      asChild
                    >
                      <a href={item.path}>
                        <span className="text-muted-foreground">{item.icon}</span>
                        {item.name}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollArea>

        <Separator />

        {/* Bottom-aligned Settings and Help */}
        <div className="px-4 py-4">
          <ul className="space-y-1">
            {bottomSection.items.map((item) => (
              <li key={item.path}>
                <Button
                  variant={pathname === item.path ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    pathname === item.path ? 'font-medium' : ''
                  }`}
                  asChild
                >
                  <a href={item.path}>
                    <span className="text-muted-foreground">{item.icon}</span>
                    {item.name}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* User Profile */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatars/john-smith.png" />
              <AvatarFallback className="bg-muted">JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-muted-foreground">Gym Manager</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}