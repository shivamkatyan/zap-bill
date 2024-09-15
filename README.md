# ZapBill

You can find the working demo for ZapBill on GitHub:

[ZapBill Working Demo](https://shivamkatyan.github.io/zap-bill-prod/)

**ZapBill** is a Progressive Web App (PWA) designed for users to securely manage their credit cards and pay their credit card bills using UPI. All data is stored on the user's device via IndexedDB, ensuring no external data collection. The app can be installed directly as a Chrome PWA for easy access.

## Features

- Add, Edit, Delete, and List your credit cards.
- Display UPI IDs associated with each card for quick payments.
- Redirect to Google Pay for bill payment.
- Data is stored offline on the user's device using IndexedDB.
- Progressive Web App (PWA) support – installable on mobile and desktop via Chrome.

## Installation

### On Desktop:
1. Open the app in Google Chrome.
2. Click on the install icon in the address bar (on the right side) to install it as a PWA.

### On Mobile:
1. Open the app in Chrome on your mobile device.
2. Tap on the menu (three dots) and select "Install app" or "Add to Home Screen."

## Usage

1. **Adding a Card**: Navigate to the "Add Card" section and fill in the credit card details for the card.
2. **Editing a Card**: Go to the card list and click the "Edit" button next to the card you want to modify.
3. **Deleting a Card**: From the card list, you can delete any card by clicking the "Delete" button.
4. **Paying a Bill**: Select a credit card and click the "G PAY" button. This will redirect you to the Google Pay app installed on your device for payment.
5. **Offline Data Storage**: All data is stored securely on your device using IndexedDB, meaning no personal information is transmitted over the internet.

## Data Security

- All credit card details and payment information are stored locally on your device using IndexedDB.
- No encryption is implemented in this version, but since the data is stored locally on the user’s device, it remains private.
- The app does not collect or send any data externally.

## Disclaimer

**IMPORTANT**: Before making any large payments, please verify the UPI ID by sending a small amount (e.g., ₹1) to ensure the UPI ID is correct and working properly.

The app solely provides a convenient way to manage your credit card UPI payments and does not validate or verify UPI IDs. You are responsible for ensuring that the UPI ID you enter is correct.

## License

This project is licensed under the MIT License.
