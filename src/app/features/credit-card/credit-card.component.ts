import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardComponent implements OnInit {
  listOfBanks = ['axis', 'icici', 'au bank', 'idfc', 'amex', 'sbi'];
  upiIDs: Record<string, string> = {};

  isEditing: boolean = false;
  @Input() card: any; // Replace `any` with your card model type
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onPayViaUPI: EventEmitter<number> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  private renderer = inject(Renderer2);
  // constructor(private clipboard: Clipboard) {}

  ngOnInit() {
    this.generateUPIIDs();
  }

  generateUPIIDs() {
    const mobileNumber = this.card.mobileNumber;
    const creditCard = this.card.number;
    const last4Digits = creditCard.slice(-4);

    this.upiIDs = {
      Axis: `CC.91${mobileNumber}${last4Digits}@axisbank`,
      ICICI: `ccpay.${creditCard}@icici`,
      'AU Bank': `AUCC${mobileNumber}${last4Digits}@AUBANK`,
      IDFC: `${creditCard}.cc@idfcbank`,
      AMEX: creditCard.length === 15 ? `AEBC${creditCard}@SC` : 'Not applicable for 16-digit cards',
      SBI: `Sbicard.${creditCard}@SBI`,
    };
  }

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

  selectBank(selectedBank: string): void {
    this.card.bank = selectedBank;
    this.card.upiID = this.upiIDs[selectedBank] || ''; // Set the UPI ID based on the selected bank

    // const bankSelector = this.renderer.selectRootElement('#bank-selector');
    // this.renderer.removeAttribute(bankSelector, 'class');
    // this.renderer.addClass(bankSelector, 'dropdown is-active');
  }

  payViaUPI(upiID: string) {
    // this.onPayViaUPI.emit(id);
    this.copyToClipboard(upiID);
    window.location.href = `upi://pay?pa=${upiID}&pn=BankName&cu=INR`;
  }

  copyToClipboard(upiID: string) {
    // this.clipboard.writeText(upiID);
  }
}
