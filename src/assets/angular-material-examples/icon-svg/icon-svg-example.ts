import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

/**
 * @title SVG icons
 */
@Component({
  selector: 'icon-svg-example',
  templateUrl: 'icon-svg-example.html',
})
export class IconSvgExample {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/images/examples/thumbup-icon.svg'));
  }
}
