import React, { useState } from 'react';
import {
  Building2,
  Check,
  Eye,
  EyeOff,
  MapPin,
  Save,
  ShieldCheck,
  Trophy,
  User,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { MovementCard } from '../../components/athlete/MovementCard';
import { PerformancePassport } from '../../components/athlete/PerformancePassport';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AthleteProfile: React.FC = () => {
  const { currentUser, updateCurrentUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: currentUser?.full_name || '',
    age_group: currentUser?.age_group || 'U-19',
    gender: currentUser?.gender || 'Male',
    district: currentUser?.district || 'Pune',
    state: currentUser?.state || 'Maharashtra',
    institution: currentUser?.institution || '',
    academy: currentUser?.academy || '',
    sport: currentUser?.sport || 'Badminton',
    position: currentUser?.position || 'Men Singles Specialist',
    bio: currentUser?.bio || '',
    is_public: currentUser?.is_public ?? true
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const achievements = currentUser ? store.getAchievements(currentUser.id) : [];
  const movements = currentUser ? store.getMovementAssessments(currentUser.id) : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePublic = () => {
    const newVal = !formData.is_public;
    setFormData(prev => ({ ...prev, is_public: newVal }));
    updateCurrentUserProfile({ is_public: newVal });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">Athlete Profile & Records</h1>
          <p className="text-xs text-slate-500">Manage your grassroots sports profile, visibility, and credentials</p>
        </div>

        {/* Public / Private Toggle */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-600 font-medium">Profile Visibility:</span>
          <button
            type="button"
            onClick={handleTogglePublic}
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              formData.is_public
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 border border-slate-300'
            }`}
          >
            {formData.is_public ? <Eye className="w-3.5 h-3.5 text-[#2E8B57]" /> : <EyeOff className="w-3.5 h-3.5" />}
            {formData.is_public ? 'Public (Scout Discoverable)' : 'Private'}
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      <Card className="border-slate-200">
        <CardHeader
          title="Personal & Sports Details"
          subtitle="Keep your sports profile updated for tournament eligibility and scout discovery"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sport</label>
                <input
                  type="text"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  disabled
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age Category</label>
                <select
                  name="age_group"
                  value={formData.age_group}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                >
                  <option value="U-15">U-15 (Under 15)</option>
                  <option value="U-17">U-17 (Under 17)</option>
                  <option value="U-19">U-19 (Under 19)</option>
                  <option value="Senior">Senior</option>
                  <option value="Open">Open</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Educational Institution / College</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g. Fergusson College"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sports Academy / Club</label>
                <input
                  type="text"
                  name="academy"
                  value={formData.academy}
                  onChange={handleChange}
                  placeholder="e.g. Shivaji Nagar Badminton Club"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Playing Position / Discipline</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Men Singles Specialist, Doubles / Mixed"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sports Bio / Background</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Describe your training experience, playstyle, and competition goals..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {savedMessage && <span className="text-emerald-600 font-bold">✓ Profile updated successfully!</span>}
              </span>
              <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Verified Achievements */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>My Verified Achievements ({achievements.length})</span>
        </h2>
        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(ach => (
              <AchievementCard key={ach.id} achievement={ach} showActions={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No achievements issued yet. Register and compete in sanctioned tournaments to earn verified credentials.
          </div>
        )}
      </div>

      {/* AI Movement Assessment */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00A6A6]" />
          <span>AI Movement Observation</span>
        </h2>
        {movements.length > 0 ? (
          <MovementCard assessment={movements[0]} showVideoPlayer={true} />
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No movement test uploaded yet.{' '}
            <a href="/athlete/movement-test" className="text-[#146C94] underline font-medium">
              Take AI squat test now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
