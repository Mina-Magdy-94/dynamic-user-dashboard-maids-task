import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScaleOnHover]'
})
export class ScaleOnHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.scale('1.05');
    this.setZIndex('2');
    this.setPosition('relative');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.scale('1');
    this.setZIndex('');
    this.setPosition('static');

  }

  private scale(scale: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
  }

  private setZIndex(zIndex: string) {
    this.renderer.setStyle(this.el.nativeElement, 'z-index', zIndex);
  }

  private setPosition(position: string) {
    this.renderer.setStyle(this.el.nativeElement, 'position', position);
  }



}
