import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';

  // * Para manejar los errores del formulario
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  // * Para manejar los errores del formulario
  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorsMessage();
  }

  constructor( private element: ElementRef<HTMLElement>) {
    // console.log(element);
    this.htmlElement = element;
  }


  ngOnInit(): void {
    // console.log('Directiva - NgOnInit');
    this.setStyle();
  }

  setStyle(): void {
    if ( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  // * Para manejar los errores del formulario
  setErrorsMessage():void {
    if ( !this.htmlElement ) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = "";
      return;
    }

    // * Array para determinar que errores va a manejar nuestra etiqueta
    const errors = Object.keys(this._errors);
    console.log(errors);


    if ( errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if ( errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Mínimo ${current} / ${min} caracteres
      `;
      return;
    }

    if ( errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Debe de ser formato email';
      return;
    }
  }

}
