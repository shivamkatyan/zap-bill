import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../interfaces/card.interface';

@Pipe({
  name: 'upiID',
  standalone: true,
})
export class UpiIDPipe implements PipeTransform {
  transform(card: Card): string {
    const creditCard = card.number;
    const mobileNumber = card.phoneNumber;
    const last4Digits = creditCard.slice(-4);

    const upiIDs: Record<string, string> = {
      'axis': `CC.91${mobileNumber}${last4Digits}@axisbank`,
      'icici': `ccpay.${creditCard}@icici`,
      'au bank': `AUCC${mobileNumber}${last4Digits}@AUBANK`,
      'idfc': `${creditCard}.cc@idfcbank`,
      'amex': creditCard.length === 15 ? `AEBC${creditCard}@SC` : 'Not applicable for 16-digit cards',
      'sbi': `Sbicard.${creditCard}@SBI`,
    };

    return upiIDs[card.bank] || 'UPI ID not available';
  }
}
