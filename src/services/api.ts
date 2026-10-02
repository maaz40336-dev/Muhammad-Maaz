import { ClientAnalysis } from '../types';

export async function analyzeClient(clientInput: string): Promise<ClientAnalysis> {
  const response = await fetch('/api/analyze-client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientInput }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to analyze client information.');
  }

  return data.analysis;
}

export async function regenerateMessage(
  clientAnalysis: ClientAnalysis,
  stylePreference?: string
): Promise<string> {
  const response = await fetch('/api/regenerate-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientAnalysis, stylePreference }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to regenerate message.');
  }

  return data.generatedMessage;
}
