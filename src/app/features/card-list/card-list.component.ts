import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, CreditCardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements AfterViewInit {
  creditCards: any[] = [];

  private storageService = inject(StorageService);

  ngAfterViewInit(): void {
    this.getCards();
  }

  async getCards() {
    try {
      const cards = await this.storageService.getAllCreditCards();
      if (cards?.length) {
        this.creditCards = [...cards];
      } else {
        // Initialize with a default card if no cards exist
        const defaultCard = { id: 1, username: 'John Doe', number: '**** **** **** 1234', phoneNumber: 1234567890 };
        await this.storageService.addCard(defaultCard);
        this.creditCards = [defaultCard];
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  async deleteCard(id: number) {
    try {
      this.creditCards = this.creditCards.filter((card) => card.id !== id);
      await this.storageService.deleteCreditCard(id);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  async payViaUPI(id: number) {
    console.log('Pay via UPI for card ID:', id);
    // Add your UPI payment logic here
  }

  async addCard(card: any) {
    this.creditCards.push(card);
    try {
      await this.storageService.storeAllCreditCards(this.creditCards);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  }

  async updateCard(updatedCard: any) {
    try {
      // Find and update the existing card
      const index = this.creditCards.findIndex((card) => card.id === updatedCard.id);
      if (index !== -1) {
        this.creditCards[index] = updatedCard;
        await this.storageService.storeAllCreditCards(this.creditCards);
      } else {
        console.error('Card not found for update:', updatedCard.id);
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  }
}
