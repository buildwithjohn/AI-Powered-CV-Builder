import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CvService } from '../../../services/cv.service';
import { Experience } from '../../../models/cv.model';

@Component({
  selector: 'app-step-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class StepExperienceComponent {
  cv = inject(CvService);

  get experience() {
    return this.cv.snapshot.experience;
  }

  drop(event: CdkDragDrop<Experience[]>): void {
    const arr = [...this.experience];
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.cv.reorderExperience(arr);
  }

  update(id: string, field: keyof Experience, value: string): void {
    this.cv.updateExperience(id, { [field]: value });
  }

  add(): void {
    this.cv.addExperience();
  }

  remove(id: string): void {
    this.cv.removeExperience(id);
  }

  prev(): void { this.cv.prev(); }
  next(): void { this.cv.next(); }

  trackById(_: number, item: Experience): string {
    return item.id;
  }
}
