// components/layout/SuperAdminSidebar.jsx
'use client';
import { SIDEBAR_ROUTES } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const role = "super-admin";
  const routes = SIDEBAR_ROUTES[role] || [];
  console.log("the routes are", routes)

  return (
    <nav className="w-64 h-full px-3 py-6 bg-background border-r z-10">
      <div className="space-y-1">
        {routes.map((route) => (
          route.children ? (
            <Accordion key={route.path} type="single" collapsible>
              <AccordionItem value={route.name}>
                <AccordionTrigger className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                  {route.icon}
                  <span>{route.name}</span>
                </AccordionTrigger>
                <AccordionContent className="ml-6 pl-2 border-l">
                  {route.children.map((child) => (
                    <a
                      key={child.path}
                      href={child.path}
                      className={`block p-2 rounded-md ${pathname === child.path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                    >
                      {child.name}
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <a
              key={route.path}
              href={route.path}
              className={`flex items-center gap-2 p-2 rounded-md ${pathname === route.path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            >
              {route.icon}
              {route.name}
            </a>
          )
        ))}
      </div>
    </nav>
  );
}