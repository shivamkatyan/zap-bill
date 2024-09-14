import { AfterViewInit, Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Card } from 'src/app/interfaces/card.interface';
import { StorageService } from 'src/app/service/storage.service';
import { CreditCardComponent } from '../credit-card/credit-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CreditCardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements AfterViewInit {
  /**
   * Array of credit cards to display.
   * @type {Array<Card>}
   */
  creditCards: Card[] = [];

  /**
   * Pagination for card display. Current page index and page size.
   * @type {number}
   */
  currentPage: number = 1;
  pageSize: number = 5;

  /**
   * Storage service instance for managing credit card data.
   * @type {StorageService}
   */
  private storageService = inject(StorageService);

  /**
   * For toggling add card form
   */
  addCardMode = false;

  constructor() {}

  /**
   * Lifecycle hook that is called after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.getCards();
  }

  /**
   * Fetches all credit cards from storage and initializes the card list.
   * If no cards are found, a default card is added.
   * @returns {Promise<void>}
   */
  async getCards(): Promise<void> {
    try {
      const cards = await this.storageService.getAllCreditCards();
      if (cards?.length) {
        this.creditCards = [...cards];
      } else {
        const defaultCard: Card = {
          id: 1,
          username: 'Demo Card',
          number: '1234123412341234',
          phoneNumber: 1234567890,
          bank: 'icici',
        };
        await this.storageService.addCard(defaultCard);
        this.creditCards = [defaultCard];
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  /**
   * Deletes a card by its ID and updates the credit card list.
   * @param {number} id - The ID of the card to delete.
   * @returns {Promise<void>}
   */
  async deleteCard(id: number): Promise<void> {
    try {
      this.creditCards = this.creditCards.filter((card) => card.id !== id);
      await this.storageService.deleteCreditCard(id);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  /**
   * Tracks card items by their unique ID to optimize rendering.
   * @param {number} index - Index of the item.
   * @param {Card} card - Card object.
   * @returns {number} - The unique ID of the card.
   */
  trackByCardId(index: number, card: Card): number {
    return card.id;
  }

  /**
   * Adds a new card to the list and stores it in storage.
   * @param {Card} card - The new card to add.
   * @returns {Promise<void>}
   */
  async addCard(card: Card): Promise<void> {
    this.creditCards.push(card);
    try {
      await this.storageService.storeAllCreditCards(this.creditCards);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  }

  /**
   * Updates an existing card's information and stores the updated list in storage.
   * @param {Card} updatedCard - The updated card data.
   * @returns {Promise<void>}
   */
  async updateCard(updatedCard: Card): Promise<void> {
    try {
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

  /**
   * Returns a subset of cards for pagination purposes.
   * @returns {Card[]} - A list of cards for the current page.
   */
  getPaginatedCards(): Card[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.creditCards.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * Moves to the next page.
   */
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.creditCards.length) {
      this.currentPage++;
    }
  }

  /**
   * Moves to the previous page.
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  showAddCardModal() {
    this.addCardMode = true;
  }

  cancelAddCard() {
    this.addCardMode = false;
  }

  async handleAddCard(newCard: Card) {
    await this.addCard(newCard); // Reusing the existing addCard method
    this.addCardMode = false; // Close the form after adding
  }
}
