import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, CreditCardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  creditCards = [
    { id: 1, username: 'John Doe', number: '**** **** **** 1234', phoneNumber: 1234567890 },
    { id: 2, username: 'Jane Smith', number: '**** **** **** 5678', phoneNumber: 1234567890 },
  ];

  editCard(id: number) {
    console.log('Edit card:', id);
    // Add your edit logic here
  }

  deleteCard(id: number) {
    console.log('Delete card:', id);
    // Add your delete logic here
  }

  payViaUPI(id: number) {
    console.log('Pay via UPI for card ID:', id);
  }
}
