import {NgModule} from '@angular/core';

import {EditableElementComponent} from "./editable-element.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [EditableElementComponent],
    exports: [EditableElementComponent]
})
export class EditableElementModule {
}
