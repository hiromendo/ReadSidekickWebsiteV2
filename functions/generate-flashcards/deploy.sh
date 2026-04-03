#!/bin/bash

# Deploy the generate-flashcards Cloud Function
# Uses GEMINI_API_KEY from Secret Manager (no IAM roles needed)

PROJECT_ID="readsidekick"
REGION="us-central1"

# Build TypeScript first
npm run build

gcloud functions deploy generate-flashcards \
  --project $PROJECT_ID \
  --gen2 \
  --runtime nodejs22 \
  --entry-point generateFlashcards \
  --trigger-http \
  --allow-unauthenticated \
  --region $REGION \
  --memory 512MB \
  --timeout 120s \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --source .

echo ""
echo "Deployment complete!"
echo "Function URL: https://$REGION-$PROJECT_ID.cloudfunctions.net/generate-flashcards"
