import React from 'react';
import { Activity, AlertCircle, CheckCircle2, Film, Sparkles, Video } from 'lucide-react';
import { MovementAssessment } from '../../types';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';

interface MovementCardProps {
  assessment: MovementAssessment;
  showVideoPlayer?: boolean;
}

export const MovementCard: React.FC<MovementCardProps> = ({
  assessment,
  showVideoPlayer = true
}) => {
  const isLive = assessment.is_live_analysis ?? true;

  return (
    <Card className="border-slate-200 overflow-hidden bg-white">
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00A6A6]" />
            <span>AI Movement Observation Card</span>
          </div>
        }
        subtitle="Computer-vision bodyweight squat biomechanics check"
        action={
          isLive ? (
            <Badge variant="teal" size="sm" dot>Live MediaPipe Pose</Badge>
          ) : (
            <Badge variant="warning" size="sm" dot>Demo Fallback Assessment</Badge>
          )
        }
      />

      <CardContent className="space-y-4">
        {/* Video Player or thumbnail */}
        {showVideoPlayer && assessment.video_url && (
          <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video relative flex items-center justify-center border border-slate-200">
            <video
              src={assessment.video_url}
              controls
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&fit=crop&q=80"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
              Pose Tracking: ON
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-teal-50/60 border border-teal-100 p-3 rounded-lg text-center">
            <span className="text-[11px] text-teal-800 font-medium block">Exercise</span>
            <span className="text-sm font-bold text-teal-950 uppercase tracking-wide">
              {assessment.exercise_type}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
            <span className="text-[11px] text-slate-500 font-medium block">Repetitions</span>
            <span className="text-base font-bold text-slate-900">
              {assessment.repetitions} Reps
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
            <span className="text-[11px] text-slate-500 font-medium block">Pose Confidence</span>
            <span className="text-base font-bold text-slate-900">
              {Math.round(assessment.pose_confidence * 100)}%
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center">
            <span className="text-[11px] text-slate-500 font-medium block">Video Quality</span>
            <span className="text-sm font-bold text-slate-900 capitalize">
              {assessment.video_quality}
            </span>
          </div>
        </div>

        {/* Movement Range & Biomechanical Feedback */}
        <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Movement Range:</span>
            <span className="font-semibold text-slate-800 capitalize bg-white px-2 py-0.5 rounded border border-slate-200">
              {assessment.movement_range}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200">
            <span className="text-slate-600 font-medium block mb-1">Observation Notes:</span>
            <p className="text-slate-700 leading-relaxed italic bg-white p-2 rounded border border-slate-100">
              "{assessment.feedback}"
            </p>
          </div>
        </div>

        {/* Ethical / Medical Disclaimer */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-tight">
            <strong>Ethical & Medical Notice:</strong> {assessment.disclaimer || 'AI-assisted movement observation only; not medical advice or official talent assessment.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
