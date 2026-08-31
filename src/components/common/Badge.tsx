import React from 'react';
import { cn } from '../../lib/utils';
import { EventStatus, ResultStatus, UserRole } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'blue' | 'teal' | 'green' | 'warning' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'navy',
  size = 'md',
  className,
  dot = false
}) => {
  const variantStyles = {
    navy: 'bg-[#12355B]/10 text-[#12355B] border-[#12355B]/20',
    blue: 'bg-[#146C94]/10 text-[#146C94] border-[#146C94]/20',
    teal: 'bg-[#00A6A6]/10 text-[#008484] border-[#00A6A6]/20',
    green: 'bg-[#2E8B57]/10 text-[#2E8B57] border-[#2E8B57]/20',
    warning: 'bg-[#F59E0B]/10 text-[#b45309] border-[#F59E0B]/30',
    red: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-medium px-3 py-1.5'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'green' && 'bg-[#2E8B57]',
            variant === 'warning' && 'bg-[#F59E0B]',
            variant === 'red' && 'bg-red-600',
            variant === 'teal' && 'bg-[#00A6A6]',
            variant === 'navy' && 'bg-[#12355B]',
            variant === 'blue' && 'bg-[#146C94]',
            variant === 'gray' && 'bg-slate-400'
          )}
        />
      )}
      {children}
    </span>
  );
};

export const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
  const configs: Record<UserRole, { label: string; variant: BadgeProps['variant'] }> = {
    ATHLETE: { label: 'Athlete', variant: 'teal' },
    ORGANIZER: { label: 'Organizer', variant: 'blue' },
    VERIFIER: { label: 'Verifier', variant: 'green' },
    SCOUT: { label: 'Scout', variant: 'warning' },
    ADMIN: { label: 'Admin', variant: 'navy' }
  };

  const config = configs[role] || { label: role, variant: 'gray' };
  return (
    <Badge variant={config.variant} size="sm" dot>
      {config.label}
    </Badge>
  );
};

export const StatusBadge: React.FC<{ status: EventStatus | ResultStatus | string }> = ({ status }) => {
  let variant: BadgeProps['variant'] = 'gray';
  let label = status;

  switch (status) {
    case 'VERIFIED':
    case 'APPROVED':
    case 'OPEN':
    case 'ACTIVE':
    case 'CONFIRMED':
      variant = 'green';
      label = status === 'VERIFIED' ? 'Verified Official' : status;
      break;
    case 'PENDING_VERIFICATION':
    case 'PENDING':
      variant = 'warning';
      label = 'Pending Review';
      break;
    case 'CORRECTION_REQUIRED':
      variant = 'warning';
      label = 'Correction Needed';
      break;
    case 'REJECTED':
    case 'REVOKED':
    case 'CANCELLED':
      variant = 'red';
      label = status;
      break;
    case 'COMPLETED':
      variant = 'navy';
      label = 'Completed';
      break;
    case 'DRAFT':
      variant = 'gray';
      label = 'Draft';
      break;
  }

  return (
    <Badge variant={variant} size="sm" dot>
      {label}
    </Badge>
  );
};
