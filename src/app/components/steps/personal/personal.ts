import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from '../../../services/cv.service';

@Component({
  selector: 'app-step-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal.html',
  styleUrl: './personal.scss',
})
export class StepPersonalComponent {
  cv = inject(CvService);
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name:      [this.cv.snapshot.personal.name],
    role:      [this.cv.snapshot.personal.role],
    email:     [this.cv.snapshot.personal.email],
    phone:     [this.cv.snapshot.personal.phone],
    linkedin:  [this.cv.snapshot.personal.linkedin],
    portfolio: [this.cv.snapshot.personal.portfolio],
    summary:   [this.cv.snapshot.personal.summary],
  });

  onFieldChange(field: string, value: string): void {
    this.cv.updatePersonal({ [field]: value });
  }

  next(): void {
    this.cv.updatePersonal(this.form.value);
    this.cv.next();
  }
}
