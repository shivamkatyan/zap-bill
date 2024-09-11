import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardComponent {
  isEditing: boolean = false;
  @Input() card: any; // Replace `any` with your card model type
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onPayViaUPI: EventEmitter<number> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async saveChanges() {
    this.isEditing = false;
    this.save.emit(this.card);
  }

  deleteCard(id: number) {
    this.onDelete.emit(id);
  }

  payViaUPI(id: number) {
    this.onPayViaUPI.emit(id);
  }
}
