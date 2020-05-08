import { Directive, ElementRef, OnInit, HostBinding, Input, HostListener } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[appLazyLoading]'
})
export class LazyLoadingDirective implements OnInit {

  @HostBinding() @Input() src: string;

  constructor(
    private el: ElementRef
    ) { }

  ngOnInit(): void {
    const dataSrc = this.el.nativeElement.getAttribute('data-src');
    timer(500).subscribe( _ => this.src = dataSrc);
  }

  @HostListener('error')
  setPlaceholder() {
    this.src = 'https://www.cheopstech.cz/wp-content/uploads/2017/06/placeholder-1.png';
  }

}
