import { trigger, transition, animation, animate, style, useAnimation } from '@angular/animations';

export let zoomIn = trigger('zoomin', [
    transition(':enter', useAnimation(
      animation([
        style({opacity:0, transform:'scale(3,3)'}),
        animate(500)
      ])
    ))
  ]);