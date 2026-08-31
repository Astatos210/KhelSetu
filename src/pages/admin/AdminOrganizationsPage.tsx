import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Check, CheckCircle2, ShieldAlert, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Organization } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AdminOrganizationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const loadOrgs = () => {
      setOrganizations(store.getOrganizations());
    };
    loadOrgs();
    const unsub = store.subscribe(loadOrgs);
    return () => unsub();
  }, []);

  const handleUpdateStatus = (orgId: string, status: 'VERIFIED' | 'REJECTED') => {
    if (!currentUser) return;
    store.updateOrganizationStatus(orgId, status, currentUser.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin Overview
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
          Organization Verification Management
        </h1>
        <p className="text-xs text-slate-500">
          Verify sports clubs, district associations, and academic bodies to authorize event sanctioning
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader
          title={`Registered Organizations (${organizations.length})`}
          subtitle="Governing bodies and tournament hosts"
        />
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={org.verification_status} />
                    <span className="text-xs text-slate-500 font-medium">Type: {org.organization_type}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">
                    {org.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>District: <strong>{org.district}, {org.state}</strong></span>
                    <span>•</span>
                    <span>Contact: {org.contact_email}</span>
                    <span>•</span>
                    <span>Registered: {formatDate(org.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {org.verification_status !== 'VERIFIED' && (
                    <Button
                      variant="success"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleUpdateStatus(org.id, 'VERIFIED')}
                      leftIcon={<Check className="w-4 h-4" />}
                    >
                      Approve Body
                    </Button>
                  )}

                  {org.verification_status !== 'REJECTED' && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleUpdateStatus(org.id, 'REJECTED')}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
