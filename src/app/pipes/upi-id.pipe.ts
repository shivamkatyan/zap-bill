import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upiID',
  standalone: true,
})
export class UpiIDPipe implements PipeTransform {
  transform(card: { number: string; phoneNumber: string }, bank: string): string {
    const creditCard = card.number;
    const mobileNumber = card.phoneNumber;
    const last4Digits = creditCard.slice(-4);

    const upiIDs: Record<string, string> = {
      Axis: `CC.91${mobileNumber}${last4Digits}@axisbank`,
      ICICI: `ccpay.${creditCard}@icici`,
      'AU Bank': `AUCC${mobileNumber}${last4Digits}@AUBANK`,
      IDFC: `${creditCard}.cc@idfcbank`,
      AMEX: creditCard.length === 15 ? `AEBC${creditCard}@SC` : 'Not applicable for 16-digit cards',
      SBI: `Sbicard.${creditCard}@SBI`,
    };

    return upiIDs[bank] || 'UPI ID not available';
  }
}
