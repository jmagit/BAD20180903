import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { SizerComponent } from './components/sizer.component';
import { PIPES_NUMERICOS } from './pipes/numericos.pipe';
import { MIS_VALIDADORES } from './directives/validadores.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PIPES_CADENAS, SizerComponent, PIPES_NUMERICOS, MIS_VALIDADORES],
  exports: [PIPES_CADENAS, SizerComponent, PIPES_NUMERICOS, MIS_VALIDADORES]
})
export class MyCoreModule {
  constructor( @Optional() @SkipSelf() parentModule: MyCoreModule) {
    if (parentModule) {
      const msg = `MyCoreModule) has already been loaded.
        Import MyCoreModule) once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
