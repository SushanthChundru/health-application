import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, icon, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-navy-800 border-b border-accent-400/10">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-xl shadow-lg">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-gray-400 text-base md:text-lg max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
