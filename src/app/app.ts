import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from './services/cv.service';
import { StepperComponent } from './components/stepper/stepper';
import { StepPersonalComponent } from './components/steps/personal/personal';
import { StepExperienceComponent } from './components/steps/experience/experience';
import { StepSkillsComponent } from './components/steps/skills/skills';
import { StepJobDescriptionComponent } from './components/steps/job-description/job-description';
import { StepAiTailorComponent } from './components/steps/ai-tailor/ai-tailor';
import { StepPreviewComponent } from './components/steps/preview/preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StepperComponent,
    StepPersonalComponent,
    StepExperienceComponent,
    StepSkillsComponent,
    StepJobDescriptionComponent,
    StepAiTailorComponent,
    StepPreviewComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  cv = inject(CvService);
}
