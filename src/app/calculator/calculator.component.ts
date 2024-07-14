import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft, faSquareRootAlt, faDivide, faTimes, faMinus, faPlus, faEquals, faPlusMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  display: string = '';
  buttons: Array<{ label: string, icon?: IconDefinition }> = [
    { label: 'C' }, { label: 'DEL', icon: faDeleteLeft }, { label: '√', icon: faSquareRootAlt }, { label: '/', icon: faDivide },
    { label: '7' }, { label: '8' }, { label: '9' }, { label: '*', icon: faTimes },
    { label: '4' }, { label: '5' }, { label: '6' }, { label: '-', icon: faMinus },
    { label: '1' }, { label: '2' }, { label: '3' }, { label: '+', icon: faPlus },
    { label: '±', icon: faPlusMinus }, { label: '0' }, { label: '.' }, { label: '=', icon: faEquals }
  ];

/**
   * Handles button click events.
   * @param button - The button object with label and optional icon.
   */
  onButtonClick(button: { label: string, icon?: IconDefinition }) {
    const value = button.label;

    switch (value) {
      case 'C':
        // Clear the display
        this.display = '';
        break;
      case 'DEL':
        // Delete the last character from the display
        this.display = this.display.slice(0, -1);
        break;
      case '±':
        // Toggle the sign of the number
        if (this.display) {
          if (this.display.startsWith('-')) {
            this.display = this.display.substring(1);
          } else {
            this.display = '-' + this.display;
          }
        }
        break;
      case '√':
        // Calculate the square root
        this.calculateSqrt();
        break;
      case '=':
        // Calculate the result
        this.calculateResult();
        break;
      default:
        // Append the button value to the display
        this.display += value;
        break;
    }
  }

  /**
   * Calculates the square root of the current display value.
   * If the current display value is not a valid number, it sets the display to 'Error'.
   */
  calculateSqrt() {
    // Parse the current display value as a float
    let displayValue = parseFloat(this.display);

    // Calculate the square root of the display value
    let result = Math.sqrt(displayValue);

    // Set the display to the string representation of the calculated result
    this.display = isNaN(result) ? 'Error' : result.toString();
  }

  /**
   * Calculates the result of the current display value.
   * If the current display value is not a valid expression, it sets the display to 'Error'.
   */
  calculateResult() {
    try {
      // Evaluate the display value as a mathematical expression using the eval function
      // The result is coerced to a string and set as the new display value
      this.display = eval(this.display).toString();
    } catch (error) {
      // If an error occurs during evaluation, set the display to 'Error'
      this.display = 'Error';
    }
  }
}
