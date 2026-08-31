# KhelSetu AI Movement Assessment Service

This service provides computer-vision-based movement observation for grassroots athletes using OpenCV and MediaPipe Pose.

## Features
- Analyzes bodyweight squat videos
- Detects knee and hip joint angles
- Counts valid repetition depth
- Measures landmark visibility and video quality
- Delivers constructive biomechanical feedback with ethical disclaimers (no medical or talent prediction claims)

## Running the Service Locally

```bash
cd ai-service
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

## API Specification

- `GET /`: Health check
- `POST /analyze-movement`:
  - `video`: Video file (MP4/WebM)
  - `exercise_type`: "squat"
