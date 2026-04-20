import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../services/cv.service';
import { CvData } from '../../../models/cv.model';

@Component({
  selector: 'app-step-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
})
export class StepPreviewComponent {
  cv = inject(CvService);
  copied = false;

  get data(): CvData {
    return this.cv.snapshot;
  }

  get filledExperience() {
    return this.data.experience.filter(e => e.title.trim());
  }

  print(): void {
    window.print();
  }

  copyText(): void {
    const el = document.getElementById('cv-preview-content');
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  prev(): void { this.cv.prev(); }
}
