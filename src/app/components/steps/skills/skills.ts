import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../services/cv.service';

@Component({
  selector: 'app-step-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class StepSkillsComponent {
  cv = inject(CvService);
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  get skills() {
    return this.cv.snapshot.skills;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const input = this.skillInput.nativeElement;
      const val = input.value.replace(',', '').trim();
      if (val) {
        this.cv.addSkill(val);
        input.value = '';
      }
    }
  }

  remove(skill: string): void {
    this.cv.removeSkill(skill);
  }

  focusInput(): void {
    this.skillInput?.nativeElement.focus();
  }

  prev(): void { this.cv.prev(); }
  next(): void { this.cv.next(); }
}
