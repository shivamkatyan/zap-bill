import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
})
export class CreditCardComponent {
  @Input() card: any; // Replace `any` with your card model type
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onPayViaUPI: EventEmitter<number> = new EventEmitter();

  isEditing: boolean = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
    // Handle save logic here (call service, update parent, etc.)
  }

  deleteCard(id: number) {
    this.onDelete.emit(id);
  }

  payViaUPI(id: number) {
    this.onPayViaUPI.emit(id);
  }
}
