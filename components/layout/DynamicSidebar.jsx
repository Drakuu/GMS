'use client';

import { SIDEBAR_ROUTES } from '@/lib/routes';
import { usePathname } from 'next/navigation';
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
      <nav className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-50">
        {/* Header with Logo and Search */}
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold">
            <span className="text-red-600 uppercase">click</span>
            <span className="text-black uppercase"> fittness</span>
          </h1>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {mainSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-[0.625rem] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
                        pathname === item.path
                          ? 'bg-red-100 text-red-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom-aligned Settings and Help */}
        <div className="px-4 py-4 border-gray-200">
          <ul className="space-y-1">
            {bottomSection.items.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
                    pathname === item.path
                      ? 'bg-red-100 text-red-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Smith</p>
              <p className="text-xs text-gray-500">Gym Manager</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
