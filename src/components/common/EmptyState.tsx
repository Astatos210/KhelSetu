import React from 'react';
import { LucideIcon, FolderSearch, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

// Empty State Component
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderSearch,
  title,
  description,
  actionText,
  onAction,
  className
}) => {
  return (
    <div className={cn('text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 bg-white/60', className)}>
      <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

// Loading State Component
export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading grassroots records...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-10 h-10 border-4 border-[#12355B]/20 border-t-[#12355B] rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>
    </div>
  );
};

// Alert Component
interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className
}) => {
  const configs = {
    info: {
      bg: 'bg-blue-50/80 border-blue-200 text-blue-900',
      icon: Info,
      iconColor: 'text-[#146C94]'
    },
    success: {
      bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      icon: CheckCircle,
      iconColor: 'text-[#2E8B57]'
    },
    warning: {
      bg: 'bg-amber-50/80 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600'
    },
    error: {
      bg: 'bg-red-50/80 border-red-200 text-red-900',
      icon: XCircle,
      iconColor: 'text-red-600'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={cn('flex gap-3 p-4 rounded-xl border', config.bg, className)}>
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', config.iconColor)} />
      <div className="text-sm leading-relaxed">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
};
