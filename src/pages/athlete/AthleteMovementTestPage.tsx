import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  Camera,
  CheckCircle2,
  FileVideo,
  Info,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
  Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { MovementAssessment } from '../../types';
import { MovementCard } from '../../components/athlete/MovementCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AthleteMovementTestPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState<MovementAssessment | null>(() => {
    if (!currentUser) return null;
    const existing = store.getMovementAssessments(currentUser.id);
    return existing.length > 0 ? existing[0] : null;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
    }
  };

  const handleRunAnalysis = async () => {
    if (!currentUser) return;
    setIsProcessing(true);

    let isLiveAnalysis = false;
    let analysisData: Partial<MovementAssessment> = {};

    try {
      // Attempt live FastAPI call to local microservice
      if (selectedFile) {
        const formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('exercise_type', 'squat');

        const res = await fetch('http://localhost:8000/analyze-movement', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const json = await res.json();
          isLiveAnalysis = json.is_live_analysis ?? true;
          analysisData = {
            exercise_type: json.exercise_type || 'squat',
            repetitions: json.repetitions || 5,
            video_quality: json.video_quality || 'good',
            pose_confidence: json.pose_confidence || 0.91,
            movement_range: json.movement_range || 'optimal depth detected (>90° knee flexion)',
            feedback: json.feedback || 'Good tempo and spinal alignment detected.',
            disclaimer: json.disclaimer || 'AI-assisted movement observation only; not medical advice or official talent assessment',
            is_live_analysis: isLiveAnalysis
          };
        } else {
          throw new Error('AI service returned non-200');
        }
      } else {
        throw new Error('No uploaded file, using demo fallback');
      }
    } catch (err) {
      // Graceful and clearly labelled Demo Fallback
      isLiveAnalysis = false;
      analysisData = {
        exercise_type: 'squat',
        repetitions: 5,
        video_quality: 'good',
        pose_confidence: 0.89,
        movement_range: 'optimal depth detected (approx. 95° knee angle)',
        feedback: 'Maintained steady repetition cadence and good lumbar neutrality throughout 5 repetitions.',
        disclaimer: 'AI-assisted movement observation only; not medical advice or official talent assessment',
        is_live_analysis: false
      };
    }

    // Save to reactive store
    const created = store.addMovementAssessment({
      athlete_id: currentUser.id,
      video_url: videoPreviewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      exercise_type: analysisData.exercise_type || 'squat',
      repetitions: analysisData.repetitions || 5,
      pose_confidence: analysisData.pose_confidence || 0.89,
      movement_range: analysisData.movement_range || 'optimal depth detected',
      video_quality: analysisData.video_quality || 'good',
      feedback: analysisData.feedback || 'Consistent movement pace detected.',
      disclaimer: analysisData.disclaimer || 'AI-assisted movement observation only; not medical advice or official talent assessment',
      status: 'COMPLETED',
      is_live_analysis: isLiveAnalysis
    });

    setCurrentResult(created);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 border border-teal-200">
          <Activity className="w-3.5 h-3.5 text-[#00A6A6]" />
          <span>Biomechanical Pose Assessment</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
          AI Squat Movement Test
        </h1>
        <p className="text-xs text-slate-500">
          Record standard bodyweight squats for objective movement observation and scout portfolio evidence.
        </p>
      </div>

      {/* Recording Instructions Guidelines */}
      <Card className="border-slate-200 bg-white">
        <CardHeader
          title="Recording Guidelines for Best Pose Accuracy"
          subtitle="Follow these 6 parameters before uploading your video"
        />
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">1. Side-View Angle</span>
              <p className="text-slate-500">Place camera perpendicular to your sagittal plane at hip level.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">2. Full Body Visible</span>
              <p className="text-slate-500">Ensure head to feet remain inside the frame throughout all reps.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">3. Good Lighting</span>
              <p className="text-slate-500">Ensure high contrast between you and the background.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">4. 5 Bodyweight Squats</span>
              <p className="text-slate-500">Perform 5 consecutive repetitions with continuous tempo.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">5. Fixed Camera</span>
              <p className="text-slate-500">Keep camera static without shaking or zooming during the test.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800">6. Short Video (15-30s)</span>
              <p className="text-slate-500">Keep video duration concise for quick MediaPipe inference.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload & Execution Section */}
      <Card className="border-slate-200">
        <CardHeader
          title="Upload or Select Video"
          subtitle="Upload an MP4/WebM video from your device or run with the provided test sample"
        />
        <CardContent className="space-y-6">
          {/* Video Preview */}
          {videoPreviewUrl && (
            <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video relative flex items-center justify-center border border-slate-200">
              <video
                src={videoPreviewUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* File Input Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#12355B] bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-slate-500" />
              <span>{selectedFile ? selectedFile.name : 'Upload Squat Video (.mp4)'}</span>
              <input
                type="file"
                accept="video/mp4,video/webm"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto bg-[#00A6A6] hover:bg-[#008484] text-white border-none shadow-sm"
              isLoading={isProcessing}
              onClick={handleRunAnalysis}
              leftIcon={<Activity className="w-4 h-4" />}
            >
              {isProcessing ? 'Processing Pose Landmarks...' : 'Analyze Movement Biomechanics'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Result Card */}
      {currentResult && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Latest Movement Assessment Card
            </h3>
            {currentResult.is_live_analysis ? (
              <Badge variant="teal" size="sm" dot>Live MediaPipe Output</Badge>
            ) : (
              <Badge variant="warning" size="sm" dot>Demo Fallback Result</Badge>
            )}
          </div>

          <MovementCard assessment={currentResult} showVideoPlayer={false} />
        </div>
      )}
    </div>
  );
};
