import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { ProductsService } from 'src/app/services/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-product-form',
  templateUrl: './delete-product-form.component.html',
  styleUrls: ['./delete-product-form.component.css']
})
export class DeleteProductFormComponent implements OnInit, OnDestroy {
  @Input() data: any;
  private productSubscriber$: any;

  constructor(
    private productService: ProductsService,
    public activeModal: NgbActiveModal,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  deleteProduct() {
    this.productSubscriber$ = this.productService.deleteProduct(this.data.id).subscribe( () => {
      this.activeModal.close();
      this.toastService.showSuccess('Product successfully deleted.');
    }, () => {
      this.toastService.showError('Error deleting product');
    })
    
  }

  ngOnDestroy() {
    if (this.productSubscriber$)
      this.productSubscriber$.unsubscribe();
  }

}
