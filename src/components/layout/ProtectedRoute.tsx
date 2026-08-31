import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../common/Button';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentRole, switchRole } = useAuth();

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    const targetRole = allowedRoles[0];
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Role Switch Required</h3>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          This area is designated for <strong>{allowedRoles.join(' / ')}</strong>. You are currently viewing as <strong>{currentRole}</strong>.
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="primary" size="md" onClick={() => switchRole(targetRole)}>
            Switch to {targetRole} Mode
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
