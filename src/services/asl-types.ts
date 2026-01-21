export interface TranslationResponse {
  translation: string;
  success: boolean;
  error?: string;
}

export interface SaveResponse {
  success: boolean;
  rowNumber?: number;
  error?: string;
}
