import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { UpiIDPipe } from 'src/app/pipes/upi-id.pipe';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, UpiIDPipe, NgClass, UpperCasePipe],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardComponent implements OnInit, OnChanges {
  /**
   * List of available banks for selection.
   * @type {string[]}
   */
  listOfBanks = ['axis', 'icici', 'au bank', 'idfc', 'amex', 'sbi'];

  /**
   * BehaviorSubject to manage the editing state.
   * @type {BehaviorSubject<boolean>}
   */
  private isEditingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable that emits the editing state.
   * @type {Observable<boolean>}
   */
  isEditing$ = this.isEditingSubject.asObservable();

  /**
   * Reactive form for managing credit card details.
   * @type {FormGroup}
   */
  cardForm: FormGroup;

  /**
   * Selected bank for the current card.
   * @type {string}
   */
  selectedBank: string = '';

  /**
   * Input property for the card data.
   * @type {any}
   */
  @Input() card: Card;

  /**
   * Input property for the card data.
   * @type {any}
   */
  @Input() enableEditMode: boolean;

  /**
   * Output event emitter to handle card deletion.
   * @type {EventEmitter<number>}
   */
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  /**
   * Output event emitter to handle saving the card details.
   * @type {EventEmitter<any>}
   */
  @Output() save: EventEmitter<any> = new EventEmitter();

  /**
   * FormBuilder instance for creating form groups and controls.
   * @type {FormBuilder}
   */
  private fb = inject(FormBuilder);

  /**
   * upi id possible values
   */
  upiIDs: Record<string, string> = {};

  /**
   * Flag to manage dropdown state
   */
  isDropdownActive: boolean = false;

  /**
   * element ref of upi id field
   */
  @ViewChild('upiId') upiId: ElementRef;

  /**
   * Initializes the component by setting up the form and generating UPI IDs.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.enableEditMode && !this.isEditingSubject.value) {
      this.isEditingSubject.next(true);
    }
  }

  /**
   * Initializes the reactive form for the credit card.
   * @private
   */
  private initializeForm(): void {
    this.cardForm = this.fb.group({
      username: [this.card?.username || '', Validators.required],
      phoneNumber: [this.card?.phoneNumber || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      number: [this.card?.number || '', [Validators.required, Validators.pattern(/^[0-9]{12,16}$/)]],
      bank: [this.card?.bank || '', Validators.required],
    });
  }

  /**
   * Toggles the editing state of the component.
   */
  toggleEdit(): void {
    this.isEditingSubject.next(!this.isEditingSubject.value);
  }

  /**
   * Saves changes to the credit card details if the form is valid.
   * Emits the updated card data via the `save` output event.
   */
  saveChanges(): void {
    if (this.cardForm.valid) {
      this.isEditingSubject.next(false);
      const updatedCard = { ...this.card, ...this.cardForm.value, upiID: this.upiIDs[this.selectedBank] };
      this.save.emit(updatedCard);
    }
  }

  /**
   * Emits an event to delete the current card.
   * @param id - The ID of the card to delete.
   */
  deleteCard(id: number): void {
    this.onDelete.emit(id);
  }

  /**
   * Selects a bank and updates the form's bank value.
   * @param selectedBank - The selected bank name.
   */
  selectBank(selectedBank: string): void {
    this.selectedBank = selectedBank;
    this.isDropdownActive = false;
    this.cardForm.patchValue({ bank: selectedBank });
  }

  /**
   * Initiates a payment via UPI by emitting the UPI ID.
   * Also navigates the user to the UPI payment link.
   * @param upiID - The UPI ID for the payment.
   */
  payViaUPI(): void {
    const id: string = this.upiId.nativeElement.innerText;
    const BankName: string = this.card.bank?.toUpperCase();
    window.location.href = `tez://upi/pay?pa=${id}&pn=${BankName}&cu=INR`;
  }

  /**
   * Tracks items by bank name in `ngFor` loops to optimize rendering.
   * @param index - The index of the item in the array.
   * @param bank - The current bank name.
   * @returns The unique identifier for each bank (its name).
   */
  trackByFn(index: number, bank: string): string {
    return bank;
  }
}
