import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileCode,
  Filter,
  FolderLock,
  Search,
  ShieldCheck,
  User
} from 'lucide-react';
import { store } from '../../data/store';
import { AuditLog } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AdminAuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordType, setSelectedRecordType] = useState('ALL');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = () => {
      setLogs(store.getAuditLogs());
    };
    loadLogs();
    const unsub = store.subscribe(loadLogs);
    return () => unsub();
  }, []);

  const recordTypes = ['ALL', 'RESULT', 'EVENT', 'ACHIEVEMENT', 'ORGANIZATION', 'PROFILE'];

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.performer_name && log.performer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.record_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedRecordType === 'ALL' || log.record_type === selectedRecordType;

    return matchesSearch && matchesType;
  });

  const toggleExpand = (id: string) => {
    setExpandedLogId(prev => (prev === id ? null : id));
  };

  const getActionBadgeVariant = (action: string) => {
    if (action.includes('VERIFIED') || action.includes('APPROVED')) return 'green';
    if (action.includes('SUBMITTED') || action.includes('CREATED')) return 'blue';
    if (action.includes('REJECTED') || action.includes('REVOKED')) return 'red';
    if (action.includes('CORRECTION')) return 'warning';
    return 'navy';
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
          Platform Audit Trail & Verification Logs
        </h1>
        <p className="text-xs text-slate-500">
          Cryptographically recorded state mutations, verifier approvals, score submissions, and credential emissions
        </p>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search audit actions, performer names, or record IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedRecordType}
            onChange={(e) => setSelectedRecordType(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
          >
            {recordTypes.map(t => (
              <option key={t} value={t}>
                {t === 'ALL' ? 'All Record Types' : `Type: ${t}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Logs List */}
      <Card className="border-slate-200">
        <CardHeader
          title={`Immutable Audit Trail (${filteredLogs.length} Events)`}
          subtitle="Click on any log entry to inspect full JSON payload diffs"
        />
        <CardContent className="p-0">
          {filteredLogs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                const badgeVariant = getActionBadgeVariant(log.action);

                return (
                  <div key={log.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-3">
                    <div
                      className="flex items-start justify-between gap-4 cursor-pointer"
                      onClick={() => toggleExpand(log.id)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={badgeVariant} size="sm" dot>
                            {log.action}
                          </Badge>
                          <span className="text-xs font-mono text-slate-500">
                            [{log.record_type}]
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                          <span className="font-semibold text-slate-800">
                            Performed By: {log.performer_name || log.performed_by}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-slate-400 text-[11px]">
                            Target ID: {log.record_id}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">
                            {formatDate(log.created_at)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="p-1 rounded text-slate-400 hover:text-slate-700"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expanded JSON Diff Viewer */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200 text-xs grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in duration-150">
                        <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                          <span className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">Previous Value (Old)</span>
                          <pre>{log.old_value ? JSON.stringify(log.old_value, null, 2) : 'null (Created)'}</pre>
                        </div>

                        <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                          <span className="text-slate-400 block mb-1 text-[10px] uppercase font-bold">New Value (Updated)</span>
                          <pre>{log.new_value ? JSON.stringify(log.new_value, null, 2) : 'null (Deleted)'}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              No audit logs match the current search filter.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
