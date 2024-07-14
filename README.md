# iPhone Calculator in Angular


This project is an Angular-based calculator inspired by the iPhone calculator. It supports basic arithmetic operations, square root calculations, and includes a delete button to remove individual digits. It also handles edge cases such as calculations starting with 0.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Square root calculation
- Toggle between positive and negative numbers
- Delete button to remove individual digits
- Proper handling of calculations starting with 0
- Stylish buttons with FontAwesome icons

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Angular CLI installed globally

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yopinheiro/iphone-calculator.git
   cd iphone-calculator
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## Usage

Click the buttons on the calculator to perform calculations. The display will show the current input and results. Use the delete button (`DEL`) to remove the last digit entered. The clear button (`C`) will reset the display.

## Code Structure

- `app.module.ts`: Main module of the application, where FontAwesome icons are configured.
- `app.component.ts` and `app.component.html`: Main component that includes the calculator component.
- `calculator.component.ts`: Contains the logic for the calculator.
- `calculator.component.html`: Template for the calculator layout.
- `calculator.component.css`: Styles for the calculator.

## Adding FontAwesome Icons

The project uses FontAwesome for icons. Icons are added to buttons by importing and using FontAwesome icons.

### Configuration

1. Install FontAwesome packages:

   ```bash
   npm install @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
   ```

2. Configure FontAwesome in `app.module.ts`:

   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms';
   import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
   import { faTrashAlt, faSquareRootAlt, faDivide, faTimes, faMinus, faPlus, faEquals, faPlusMinus } from '@fortawesome/free-solid-svg-icons';

   import { AppComponent } from './app.component';
   import { CalculatorComponent } from './calculator/calculator.component';

   @NgModule({
     declarations: [
       AppComponent,
       CalculatorComponent
     ],
     imports: [
       BrowserModule,
       FormsModule,
       FontAwesomeModule
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule {
     constructor(library: FaIconLibrary) {
       library.addIcons(faTrashAlt, faSquareRootAlt, faDivide, faTimes, faMinus, faPlus, faEquals, faPlusMinus);
     }
   }
   ```

3. Adjust the `CalculatorComponent` to use FontAwesome icons:

   ```typescript
   import { Component } from '@angular/core';
   import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
   import { faTrashAlt, faSquareRootAlt, faDivide, faTimes, faMinus, faPlus, faEquals, faPlusMinus } from '@fortawesome/free-solid-svg-icons';

   @Component({
     selector: 'app-calculator',
     templateUrl: './calculator.component.html',
     styleUrls: ['./calculator.component.css']
   })
   export class CalculatorComponent {
     display: string = '';
     buttons: Array<{ label: string, icon?: IconDefinition }> = [
       { label: 'C' }, { label: 'DEL', icon: faTrashAlt }, { label: '√', icon: faSquareRootAlt }, { label: '/', icon: faDivide },
       { label: '7' }, { label: '8' }, { label: '9' }, { label: '*', icon: faTimes },
       { label: '4' }, { label: '5' }, { label: '6' }, { label: '-', icon: faMinus },
       { label: '1' }, { label: '2' }, { label: '3' }, { label: '+', icon: faPlus },
       { label: '±', icon: faPlusMinus }, { label: '0' }, { label: '.' }, { label: '=', icon: faEquals }
     ];

     onButtonClick(button: { label: string, icon?: IconDefinition }) {
       const value = button.label;
       switch (value) {
         case 'C':
           this.display = '';
           break;
         case 'DEL':
           this.display = this.display.slice(0, -1);
           break;
         case '±':
           if (this.display) {
             if (this.display.startsWith('-')) {
               this.display = this.display.substring(1);
             } else {
               this.display = '-' + this.display;
             }
           }
           break;
         case '√':
           this.calculateSqrt();
           break;
         case '=':
           this.calculateResult();
           break;
         default:
           this.display += value;
           break;
       }
     }

     calculateSqrt() {
       let result = Math.sqrt(parseFloat(this.display));
       this.display = result.toString();
     }

     calculateResult() {
       try {
         this.display = eval(this.display).toString();
       } catch (error) {
         this.display = 'Error';
       }
     }
   }
   ```

4. Adjust the template to render the icons (`calculator.component.html`):

   ```html
   <div class="container">
     <div class="row justify-content-center">
       <div class="col-4">
         <div class="calculator">
           <div class="display">
             <input type="text" [(ngModel)]="display" disabled />
           </div>
           <div class="buttons">
             <button *ngFor="let btn of buttons" (click)="onButtonClick(btn)">
               <ng-container *ngIf="btn.icon; else text">
                 <fa-icon [icon]="btn.icon"></fa-icon>
               </ng-container>
               <ng-template #text>{{ btn.label }}</ng-template>
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
   ```

5. Add CSS for icons (optional):

   ```css
   .calculator {
     margin-top: 50px;
     background-color: #333;
     padding: 20px;
     border-radius: 10px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   }

   .display input {
     width: 100%;
     padding: 10px;
     font-size: 24px;
     text-align: right;
     border: none;
     border-radius: 5px;
     margin-bottom: 20px;
   }

   .buttons {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     gap: 10px;
   }

   .buttons button {
     padding: 20px;
     font-size: 18px;
     border: none;
     border-radius: 5px;
     background-color: #f2f2f2;
     cursor: pointer;
     transition: background-color 0.3s;
   }

   .buttons button fa-icon {
     font-size: 18px;
   }

   .buttons button:hover {
     background-color: #ddd;
   }
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.