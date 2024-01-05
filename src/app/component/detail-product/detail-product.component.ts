import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-detail-product',
    standalone: true,
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.scss',
    imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class DetailProductComponent {

}
