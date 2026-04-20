import { Injectable } from '@angular/core';
import { CvService } from './cv.service';
import { CvData } from '../models/cv.model';

@Injectable({ providedIn: 'root' })
export class AiService {
  constructor(private cv: CvService) {}

  async tailorCv(): Promise<void> {
    const data = this.cv.snapshot;
    this.cv.setAiResult('');
    this.cv.aiStreaming.set(true);

    const prompt = this.buildPrompt(data);

    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          stream: true,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') continue;
          try {
            const obj = JSON.parse(raw);
            if (obj.type === 'content_block_delta' && obj.delta?.text) {
              this.cv.appendAiResult(obj.delta.text);
            }
          } catch {}
        }
      }
    } catch (err: any) {
      this.cv.setAiResult(
        `Could not connect to the AI service.\n\nMake sure the ANTHROPIC_API_KEY environment variable is set in your Vercel project settings.\n\nError: ${err.message}`
      );
    } finally {
      this.cv.aiStreaming.set(false);
    }
  }

  private buildPrompt(data: CvData): string {
    const { personal, experience, skills, jobDescription } = data;
    const expText = experience
      .filter(e => e.title)
      .map(e => `- ${e.title} at ${e.company} (${e.period}):\n  ${e.description}`)
      .join('\n\n') || 'Not provided';

    return `You are an expert CV writer and career coach. A candidate wants to tailor their CV for a specific role.

CANDIDATE INFORMATION:
Name: ${personal.name}
Current Title: ${personal.role}
Summary: ${personal.summary || 'Not provided'}

Work Experience:
${expText}

Skills: ${skills.join(', ') || 'Not provided'}

TARGET JOB DESCRIPTION:
${jobDescription}

Your task:
1. Write a compelling 3-5 sentence tailored professional profile positioning this candidate as an ideal fit. Use language from the job description. Address the employer's key needs directly.
2. Write a "Key Highlights" section with 5-6 bullet points mapping the candidate's actual experience to the job requirements. Use strong action verbs and be specific.

Format your response as:
Profile:
[profile text]

Key Highlights:
[bullet points]

Only use information the candidate provided. Do not invent experience or credentials.`;
  }
}
