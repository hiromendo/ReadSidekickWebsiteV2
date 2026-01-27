#!/bin/bash

# Deploy the save-to-sheets Cloud Function

PROJECT_ID="readsidekick"
REGION="us-central1"

gcloud functions deploy save-to-sheets \
  --project $PROJECT_ID \
  --gen2 \
  --runtime nodejs20 \
  --entry-point saveToSheets \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_SHEET_ID=1ywB1XVVlWLQqqoxKvUjvRQQyeqJ63_XmsU01cCMBbbo \
  --service-account sheets-writer@readsidekick.iam.gserviceaccount.com \
  --region $REGION \
  --source .

echo ""
echo "Deployment complete!"
echo "Function URL: https://us-central1-readsidekick.cloudfunctions.net/save-to-sheets"
