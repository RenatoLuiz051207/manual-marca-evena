import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { manifesto, palette, values, traits } from '../../shared/manual.data';
import { microcopy, situations, energyLevels } from '../expression/expression.data';
import { brandAssets, fonts } from '../identity/identity';
@Component({
  selector: 'ev-reading',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './reading.html',
  styleUrl: './reading.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingPage {
  readonly manifesto = manifesto;
  readonly palette = palette;
  readonly values = values;
  readonly traits = traits;
  readonly situations = situations;
  readonly microcopy = microcopy;
  readonly energyLevels = energyLevels;
  readonly logos = brandAssets.filter(logo => logo.name !== 'Coroa verde');
  readonly fonts = fonts;
  print(): void {
    window.print();
  }
}
