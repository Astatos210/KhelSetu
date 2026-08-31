import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FolderLock,
  Layers,
  ShieldCheck,
  Trophy,
  Users,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    athletes: 0,
    events: 0,
    organizations: 0,
    achievements: 0,
    pendingOrgs: 0,
    auditLogs: 0
  });

  useEffect(() => {
    const loadStats = () => {
      const athletes = store.getProfiles().filter(p => p.role === 'ATHLETE').length;
      const events = store.getEvents().length;
      const orgs = store.getOrganizations();
      const achievements = store.getAchievements().length;
      const auditLogs = store.getAuditLogs().length;

      setStats({
        athletes,
        events,
        organizations: orgs.length,
        achievements,
        pendingOrgs: orgs.filter(o => o.verification_status === 'PENDING').length,
        auditLogs
      });
    };

    loadStats();
    const unsub = store.subscribe(loadStats);
    return () => unsub();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12355B] to-[#146C94] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Platform Governance Cell
              </span>
              <h1 className="text-2xl font-bold font-['Outfit']">
                KhelSetu Administration
              </h1>
              <p className="text-xs text-slate-200">
                Monitoring grassroots sports integrity, organization verification, and immutable audit logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="navy" size="lg" dot>
              Platform Governance Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Athletes</span>
          <span className="text-xl font-bold text-slate-900">{stats.athletes}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Tournaments</span>
          <span className="text-xl font-bold text-slate-900">{stats.events}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Organizations</span>
          <span className="text-xl font-bold text-slate-900">{stats.organizations}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Pending Orgs</span>
          <span className="text-xl font-bold text-amber-600">{stats.pendingOrgs}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Achievements</span>
          <span className="text-xl font-bold text-[#2E8B57]">{stats.achievements}</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block">Audit Entries</span>
          <span className="text-xl font-bold text-slate-900">{stats.auditLogs}</span>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverable className="border-slate-200">
          <div className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#146C94] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Organization Verification Desk</h3>
              <p className="text-xs text-slate-500 mt-1">
                Review and approve district associations, clubs, and collegiate bodies wishing to sanction tournaments.
              </p>
            </div>
            <Link to="/admin/organizations" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full justify-between">
                <span>Manage Organizations ({stats.pendingOrgs} Pending)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card hoverable className="border-slate-200">
          <div className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <FolderLock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Platform Audit Logs & Trail</h3>
              <p className="text-xs text-slate-500 mt-1">
                Inspect immutable historical records of all result submissions, verifications, corrections, and credential updates.
              </p>
            </div>
            <Link to="/admin/audit-log" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full justify-between">
                <span>View Full Audit Trail ({stats.auditLogs} Records)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
