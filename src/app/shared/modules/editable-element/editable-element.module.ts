import {NgModule} from '@angular/core';

import {EditableElementComponent} from "./editable-element.component";
import {CommonModule} from "@angular/common";
import {CodemirrorModule} from "ng2-codemirror";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        CodemirrorModule,
        FormsModule
    ],
    declarations: [EditableElementComponent],
    exports: [EditableElementComponent]
})
export class EditableElementModule {
}
