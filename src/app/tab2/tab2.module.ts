import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage {
  input: string = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondOperand: boolean = false;

  append(value: string) {
    if (this.waitForSecondOperand) {
      this.input = value;
      this.waitForSecondOperand = false;
    } else {
      this.input += value;
    }
  }

  setOperation(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.input);
    } else if (this.operator) {
      const result = this.performCalculation();
      this.input = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondOperand = true;
  }

  calculate() {
    if (this.firstOperand === null || this.operator === null) return;

    const result = this.performCalculation();
    this.input = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
  }

  performCalculation(): number {
    const secondOperand = parseFloat(this.input);
    switch (this.operator) {
      case '+':
        return (this.firstOperand || 0) + secondOperand;
      case '-':
        return (this.firstOperand || 0) - secondOperand;
      case '*':
        return (this.firstOperand || 0) * secondOperand;
      case '/':
        return secondOperand !== 0
          ? (this.firstOperand || 0) / secondOperand
          : NaN;
      default:
        return 0;
    }
  }

  clear() {
    this.input = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
  }
}
