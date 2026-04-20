import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvService } from '../../../services/cv.service';
import { AiService } from '../../../services/ai.service';

@Component({
  selector: 'app-step-job-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description.html',
  styleUrl: './job-description.scss',
})
export class StepJobDescriptionComponent {
  cv = inject(CvService);
  ai = inject(AiService);

  get jd(): string {
    return this.cv.snapshot.jobDescription;
  }

  onInput(value: string): void {
    this.cv.setJobDescription(value);
  }

  prev(): void { this.cv.prev(); }

  async generate(): Promise<void> {
    this.cv.next();
    await this.ai.tailorCv();
  }
}
