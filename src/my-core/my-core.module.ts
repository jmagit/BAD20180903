import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
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
