import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CvData, Experience, PersonalDetails } from '../models/cv.model';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

const initialData: CvData = {
  personal: { name: '', role: '', email: '', phone: '', linkedin: '', portfolio: '', summary: '' },
  experience: [{ id: uid(), title: '', company: '', period: '', description: '' }],
  skills: [],
  jobDescription: '',
  aiResult: '',
};

@Injectable({ providedIn: 'root' })
export class CvService {
  private _data = new BehaviorSubject<CvData>(structuredClone(initialData));
  readonly data$ = this._data.asObservable();

  readonly currentStep = signal<number>(0);
  readonly aiStreaming = signal<boolean>(false);

  get snapshot(): CvData {
    return this._data.getValue();
  }

  updatePersonal(patch: Partial<PersonalDetails>): void {
    const d = this.snapshot;
    this._data.next({ ...d, personal: { ...d.personal, ...patch } });
  }

  addExperience(): void {
    const d = this.snapshot;
    this._data.next({
      ...d,
      experience: [...d.experience, { id: uid(), title: '', company: '', period: '', description: '' }],
    });
  }

  updateExperience(id: string, patch: Partial<Experience>): void {
    const d = this.snapshot;
    this._data.next({
      ...d,
      experience: d.experience.map(e => (e.id === id ? { ...e, ...patch } : e)),
    });
  }

  removeExperience(id: string): void {
    const d = this.snapshot;
    if (d.experience.length <= 1) return;
    this._data.next({ ...d, experience: d.experience.filter(e => e.id !== id) });
  }

  reorderExperience(experience: Experience[]): void {
    this._data.next({ ...this.snapshot, experience });
  }

  addSkill(skill: string): void {
    const d = this.snapshot;
    if (!skill.trim() || d.skills.includes(skill.trim())) return;
    this._data.next({ ...d, skills: [...d.skills, skill.trim()] });
  }

  removeSkill(skill: string): void {
    const d = this.snapshot;
    this._data.next({ ...d, skills: d.skills.filter(s => s !== skill) });
  }

  setJobDescription(jd: string): void {
    this._data.next({ ...this.snapshot, jobDescription: jd });
  }

  setAiResult(text: string): void {
    this._data.next({ ...this.snapshot, aiResult: text });
  }

  appendAiResult(chunk: string): void {
    const d = this.snapshot;
    this._data.next({ ...d, aiResult: d.aiResult + chunk });
  }

  goTo(step: number): void {
    if (step <= this.currentStep()) this.currentStep.set(step);
  }

  next(): void {
    if (this.currentStep() < 5) this.currentStep.update(s => s + 1);
  }

  prev(): void {
    if (this.currentStep() > 0) this.currentStep.update(s => s - 1);
  }
}
