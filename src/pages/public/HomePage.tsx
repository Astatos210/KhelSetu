import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Flame,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
  Activity,
  ArrowRight,
  Building2,
  Check
} from 'lucide-react';
import { store } from '../../data/store';
import { Achievement } from '../../types';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const HomePage: React.FC = () => {
  const [sampleAchievement, setSampleAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const achs = store.getAchievements();
    if (achs.length > 0) {
      setSampleAchievement(achs[0]);
    }
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#12355B] via-[#146C94] to-[#12355B] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Grassroots Sports Verification Infrastructure</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] leading-tight sm:leading-tight">
                From Local Performance to <br />
                <span className="text-amber-400 underline decoration-amber-400/40 decoration-wavy decoration-2">
                  Verified Opportunity
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                KhelSetu bridges the gap between grassroots badminton athletes, tournament organizers, independent verifiers, and professional talent scouts with tamper-proof QR achievements and AI movement evidence.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/athlete/events">
                  <Button
                    size="lg"
                    className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold border-none shadow-lg shadow-amber-400/20"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Events
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-xs font-medium"
                    leftIcon={<Users className="w-4 h-4" />}
                  >
                    Explore Demo Personas
                  </Button>
                </Link>
              </div>

              {/* Quick stats pills */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="block text-2xl font-black text-white font-['Outfit']">100%</span>
                  <span className="text-[11px] text-slate-300">Tamper-Proof QR</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white font-['Outfit']">3-Tier</span>
                  <span className="text-[11px] text-slate-300">Independent Review</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white font-['Outfit']">Pose AI</span>
                  <span className="text-[11px] text-slate-300">Squat Observation</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-teal-400 rounded-2xl blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-white text-slate-900 rounded-2xl p-1 shadow-2xl">
                  <div className="bg-slate-50 px-4 py-2.5 rounded-t-xl border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-700">Live Sample Credential</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">KS-PUN-2026-0814</span>
                  </div>

                  <div className="p-3">
                    {sampleAchievement ? (
                      <AchievementCard achievement={sampleAchievement} showActions={true} />
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">Loading sample credential...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three User Groups Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="blue" size="md" className="mb-2">Stakeholders</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
            Built for the Entire Grassroots Ecosystem
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Eliminating fake certificates and giving verified athletes a direct bridge to state trials and scout visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Group 1: Athletes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Grassroots Athletes</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Create a verified sports profile, discover sanctioned tournaments, record podium finishes, and test bodyweight movement with AI.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Verified digital credentials
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Performance passport points
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> AI squat movement assessment
              </li>
            </ul>
            <Link to="/athlete/dashboard">
              <Button variant="outline" size="sm" className="w-full">
                View Athlete View
              </Button>
            </Link>
          </div>

          {/* Group 2: Organizers & Verifiers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#146C94] flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Organizers & Verifiers</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Organizers publish events and record match scores. Certified verifiers review evidence before digital credentials are generated.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Seamless athlete check-in
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Scorecard evidence attachment
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Independent 2-step verification
              </li>
            </ul>
            <Link to="/organizer/dashboard">
              <Button variant="outline" size="sm" className="w-full">
                View Organizer View
              </Button>
            </Link>
          </div>

          {/* Group 3: Scouts & Academies */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Scouts & Academies</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Discover verified prospects across rural and district circles using filters for wins, age group, district, and movement biomechanics.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Filter by verified podium finishes
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Objective movement evidence
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2E8B57]" /> Protected minor athlete privacy
              </li>
            </ul>
            <Link to="/scout/dashboard">
              <Button variant="outline" size="sm" className="w-full">
                View Scout Discovery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Five-Step Complete Workflow Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="green" size="md" className="mb-2">5-Step Process</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              How KhelSetu Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From open grassroots registration to authenticated public QR verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Register for Event',
                desc: 'Athlete creates profile and registers for sanctioned badminton events with instant digital pass.',
                icon: Compass
              },
              {
                step: '02',
                title: 'Record Match Result',
                desc: 'Organizer enters final placement and uploads official match sheet scorecard.',
                icon: Award
              },
              {
                step: '03',
                title: 'Independent Review',
                desc: 'Certified technical verifier approves or rejects result against official rules.',
                icon: FileCheck2
              },
              {
                step: '04',
                title: 'QR Credential Issued',
                desc: 'System mints unique Credential ID and tamper-proof public verification page.',
                icon: QrCode
              },
              {
                step: '05',
                title: 'Scout Discovery',
                desc: 'Coaches and scouts filter verified talent with transparent performance passports.',
                icon: Search
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white rounded-xl p-5 border border-slate-200 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-[#146C94] font-['Outfit'] opacity-80">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Hackathon Demo Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#12355B] to-[#146C94] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ready for Live Evaluation
            </span>
            <h3 className="text-2xl font-bold font-['Outfit']">Test the Full End-to-End Workflow</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl leading-relaxed">
              Switch roles instantly using the top navigation bar to test athlete registration, organizer score entry, verifier approval, and scout discovery.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/login">
              <Button size="md" className="bg-white text-slate-900 hover:bg-slate-100 font-bold border-none">
                Demo Accounts
              </Button>
            </Link>
            <Link to="/verify/KS-PUN-2026-0814">
              <Button size="md" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                Public QR Page
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
