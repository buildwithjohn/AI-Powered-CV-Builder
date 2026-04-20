import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';

export const STEPS = [
  { n: '01', label: 'Personal' },
  { n: '02', label: 'Experience' },
  { n: '03', label: 'Skills' },
  { n: '04', label: 'Target Job' },
  { n: '05', label: 'AI Tailor' },
  { n: '06', label: 'Preview' },
];

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class StepperComponent {
  cv = inject(CvService);
  steps = STEPS;

  jump(index: number): void {
    this.cv.goTo(index);
  }

  getProgress(): number {
    return (this.cv.currentStep() / (STEPS.length - 1)) * 100;
  }
}
