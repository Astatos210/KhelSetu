import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Building2, FileCheck2, Search, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { RoleBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const LoginPage: React.FC = () => {
  const { loginAsDemoRole, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const demoAccounts: {
    role: UserRole;
    name: string;
    email: string;
    description: string;
    avatar: string;
    targetPath: string;
    icon: typeof User;
  }[] = [
    {
      role: 'ATHLETE',
      name: 'Aarav Joshi',
      email: 'athlete@demo.khelsetu.in',
      description: 'Grassroots badminton player. Can register for events, view credentials, and test squat movement.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&q=80',
      targetPath: '/athlete/dashboard',
      icon: User
    },
    {
      role: 'ORGANIZER',
      name: 'Vikram Malhotra',
      email: 'organizer@demo.khelsetu.in',
      description: 'Pune District Sports Academy. Can create tournaments, check in athletes, and submit match scores.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80',
      targetPath: '/organizer/dashboard',
      icon: Building2
    },
    {
      role: 'VERIFIER',
      name: 'Dr. Sunita Rao',
      email: 'verifier@demo.khelsetu.in',
      description: 'State Badminton Technical Official. Can review submitted results, verify evidence, and issue QR achievements.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&fit=crop&q=80',
      targetPath: '/verifier/dashboard',
      icon: FileCheck2
    },
    {
      role: 'SCOUT',
      name: 'Rajesh Kadam',
      email: 'scout@demo.khelsetu.in',
      description: 'Western Zone Talent Scouting Network. Can search and filter verified athletes by district, wins, and movement.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop&q=80',
      targetPath: '/scout/dashboard',
      icon: Search
    },
    {
      role: 'ADMIN',
      name: 'Platform Admin',
      email: 'admin@demo.khelsetu.in',
      description: 'KhelSetu Foundation. Oversees organization verification and complete audit logs.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop&q=80',
      targetPath: '/admin/dashboard',
      icon: Lock
    }
  ];

  const handleDemoLogin = (role: UserRole, targetPath: string) => {
    loginAsDemoRole(role);
    navigate(targetPath);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Match custom email to demo role if available
    const matched = demoAccounts.find(a => a.email.toLowerCase() === emailInput.toLowerCase());
    if (matched) {
      handleDemoLogin(matched.role, matched.targetPath);
    } else {
      // Default to athlete
      handleDemoLogin('ATHLETE', '/athlete/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12355B]/10 text-[#12355B] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          One-Click Hackathon Access
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Select Your Demo Persona
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Experience KhelSetu from all 5 distinct viewpoints. Click any account below to immediately assume that role with seeded test data.
        </p>
      </div>

      {/* 5 Demo Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {demoAccounts.map((account) => {
          const Icon = account.icon;
          return (
            <Card
              key={account.role}
              hoverable
              className="border-slate-200 flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {account.name}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-500">{account.email}</p>
                    </div>
                  </div>
                  <RoleBadge role={account.role} />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {account.description}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full text-xs font-semibold justify-between"
                  onClick={() => handleDemoLogin(account.role, account.targetPath)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  <span>Launch as {account.role}</span>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Standard Email Login Box */}
      <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Custom Credentials Login</h3>
        <p className="text-xs text-slate-500 mb-4">
          Or sign in with any email (defaults to Athlete role if not seeded).
        </p>

        <form onSubmit={handleCustomSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. athlete@demo.khelsetu.in"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            />
          </div>

          <Button type="submit" variant="outline" size="sm" className="w-full text-xs mt-2">
            Sign In with Email
          </Button>
        </form>
      </div>
    </div>
  );
};
