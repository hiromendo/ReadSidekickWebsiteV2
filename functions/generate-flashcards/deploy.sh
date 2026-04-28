#!/bin/bash
set -euo pipefail

# Deploy the generate-flashcards Cloud Function.
# GEMINI_API_KEY is read from .env.yaml in this directory (gitignored).

PROJECT_ID="readsidekick"
REGION="us-central1"
ENV_FILE=".env.yaml"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Error: ${ENV_FILE} not found. Copy .env.yaml.example and fill in GEMINI_API_KEY." >&2
  exit 1
fi

deploy_function() {
  local name="$1"
  local entry_point="$2"
  local runtime="$3"
  local service_account="$4"
  shift 4
  echo "Deploying ${name}..."
  gcloud functions deploy "${name}" \
    --gen2 \
    --project="${PROJECT_ID}" \
    --region="${REGION}" \
    --runtime="${runtime}" \
    --source=. \
    --entry-point="${entry_point}" \
    --trigger-http \
    --allow-unauthenticated \
    --env-vars-file="${ENV_FILE}" \
    --clear-secrets \
    --service-account="${service_account}" \
    "$@"
}

# Build TypeScript first
npm run build

deploy_function \
  generate-flashcards \
  generateFlashcards \
  nodejs22 \
  readsidekick@appspot.gserviceaccount.com \
  --memory=512MB \
  --timeout=120s

echo ""
echo "Deployment complete!"
echo "Function URL: https://${REGION}-${PROJECT_ID}.cloudfunctions.net/generate-flashcards"
