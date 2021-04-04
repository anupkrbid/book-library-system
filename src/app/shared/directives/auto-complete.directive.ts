import { Directive, ElementRef, HostListener, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective implements OnInit {
  private id: string;
  private currentFocus: number;
  private value: string;
  private parentNode: HTMLDivElement;
  private outerDiv: HTMLDivElement = null;
  @Input('appAutoComplete') appAutoComplete: Array<string>;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.id = this.elementRef.nativeElement.id;
  }

  @HostListener('input', ['$event'])
  onInput($event) {
    this.value = this.elementRef.nativeElement.value;
    // close any already open lists of autocompleted values
    this.closeAllLists();
    if (!this.value) {
      return false;
    }
    this.currentFocus = -1;
    this.outerDiv = this.renderer.createElement('div');
    this.renderer.setAttribute(this.outerDiv, 'id', this.id + 'autocomplete-list');
    this.renderer.setAttribute(this.outerDiv, 'class', 'autocomplete-items');
    // append the DIV element as a child of the autocomplete container
    this.parentNode = this.renderer.parentNode(this.elementRef.nativeElement);

    const list = this.appAutoComplete;
    for (let i = 0; i < list.length; i++) {
      // check if the text field value can be found in the list items
      if (list[i].toLowerCase().includes(this.value.toLowerCase())) {
        // create a DIV element for each matching element
        const innerDiv = this.renderer.createElement('div');
        // make the matching letters bold
        const startIndex = list[i].toLowerCase().indexOf(this.value.toLowerCase());
        const textToHeighlight = list[i].substr(startIndex, this.value.length);

        const strong = this.renderer.createElement('strong');
        const highlightedText = this.renderer.createText(textToHeighlight);
        this.renderer.appendChild(strong, highlightedText);

        const nonHighlightedTextLeft = this.renderer.createText(list[i].substr(0, startIndex));
        const nonHighlightedTextRight = this.renderer.createText(list[i].substr(startIndex + this.value.length));

        this.renderer.appendChild(innerDiv, nonHighlightedTextLeft);
        this.renderer.appendChild(innerDiv, strong);
        this.renderer.appendChild(innerDiv, nonHighlightedTextRight);

        // insert a input field that will hold the current array item's value
        const input = this.renderer.createElement('input');
        this.renderer.setAttribute(input, 'type', 'hidden');
        this.renderer.setAttribute(input, 'value', list[i]);
        this.renderer.appendChild(innerDiv, input);

        // execute a function when someone clicks on the item value (DIV element)
        this.renderer.listen(innerDiv, 'click', (e) => {
          // insert the value for the autocomplete text field
          const hiddenInputValue = e.target.querySelector('input').value;
          this.renderer.setProperty(this.elementRef.nativeElement, 'value', hiddenInputValue);
          this.elementRef.nativeElement.dispatchEvent(new Event('input'));

          let parentNode = this.parentNode;
          while (parentNode.tagName.toLowerCase() !== 'form') {
            parentNode = this.renderer.parentNode(parentNode);
          }
          parentNode.dispatchEvent(new Event('submit'));
          // close the list of autocompleted values
          // (or any other open lists of autocompleted values
          this.closeAllLists();
        });
        this.renderer.appendChild(this.outerDiv, innerDiv);
      }
      if (this.outerDiv.querySelectorAll('div').length > 0) {
        this.renderer.appendChild(this.parentNode, this.outerDiv);
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onkeydown(event) {
    let x;
    if (this.outerDiv) {
      x = this.outerDiv.getElementsByTagName('div');
    }
    switch (event.keyCode) {
      case 40: {
        // If the arrow DOWN key is pressed,
        // increase the currentFocus variable
        this.currentFocus++;
        // and and make the current item more visible
        this.addActive(x);
        break;
      }
      case 38: {
        // If the arrow UP key is pressed,
        // decrease the currentFocus variable:
        this.currentFocus--;
        // and and make the current item more visible:
        this.addActive(x);
        break;
      }
      case 13: {
        // If the ENTER key is pressed, not prevent the form from being submitted,
        // event.preventDefault();
        if (this.currentFocus > -1) {
          // and simulate a click on the "active" item
          if (x) {
            x[this.currentFocus].click();
          }
        }
        break;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event) {
    this.closeAllLists(event.target);
  }

  closeAllLists(elem?) {
    // close all autocomplete lists in the document, except the one passed as an argument
    if (this.outerDiv !== elem && elem !== this.elementRef.nativeElement && this.parentNode) {
      if (this.renderer.parentNode(this.outerDiv) === this.parentNode) {
        this.renderer.removeChild(this.parentNode, this.outerDiv);
      }
    }
  }

  addActive(x) {
    // a function to classify an item as "active"
    if (!x) {
      return false;
    }
    // start by removing the "active" class on all items
    this.removeActive(x);
    if (this.currentFocus >= x.length) {
      this.currentFocus = 0;
    }
    if (this.currentFocus < 0) {
      this.currentFocus = (x.length - 1);
    }
    // add class "autocomplete-active"
    this.renderer.addClass(x[this.currentFocus], 'autocomplete-active');
  }

  removeActive(x) {
    // a function to remove the "active" class from all autocomplete items
    for (let i = 0; i < x.length; i++) {
      this.renderer.removeClass(x[i], 'autocomplete-active');
    }
  }

}

// TODO: Add click event on parent.. use event propagation
// TODO: make this directve no rely upon a wrapping form
