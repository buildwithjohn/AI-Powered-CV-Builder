import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../services/cv.service';
import { AiService } from '../../../services/ai.service';

@Component({
  selector: 'app-step-ai-tailor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-tailor.html',
  styleUrl: './ai-tailor.scss',
})
export class StepAiTailorComponent implements AfterViewChecked {
  cv = inject(CvService);
  ai = inject(AiService);

  @ViewChild('outputEl') outputEl!: ElementRef<HTMLDivElement>;

  get result(): string  { return this.cv.snapshot.aiResult; }
  get streaming(): boolean { return this.cv.aiStreaming(); }
  get hasResult(): boolean { return !!this.result.trim(); }

  ngAfterViewChecked(): void {
    if (this.outputEl && this.streaming) {
      const el = this.outputEl.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  async regenerate(): Promise<void> {
    await this.ai.tailorCv();
  }

  prev(): void { this.cv.prev(); }
  next(): void { this.cv.next(); }
}
