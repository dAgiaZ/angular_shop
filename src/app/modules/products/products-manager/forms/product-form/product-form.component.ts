import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() data: any;
  productForm: FormGroup;
  private updSubscriber: any;
  private createSubscriber: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private productsServices: ProductsService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required]
    });
    this.productForm.patchValue(this.data);
  }

  async save() {
    if (this.data.operation === 'new') {
      this.createSubscriber = this.productsServices.createProduct(this.productForm.value).subscribe( product => {
        this.toastService.showSuccess('Product successfully created.');
        this.activeModal.close(true);
      },
      () => {
        this.toastService.showError('Error while creating a product, try later');
      })
    } else if (this.data.operation === 'edit') {
      this.updSubscriber = this.productsServices.updateProduct(this.productForm.value, this.data.id).subscribe( product => {
        this.toastService.showSuccess('Product successfully updated.');
        this.activeModal.close(true);
      },
      () => {
        this.toastService.showError('Error while updating a product, try later');
      })
    }
  }

  ngOnDestroy() {
    if (this.createSubscriber)
      this.createSubscriber.unsubscribe();
    if (this.updSubscriber)
      this.updSubscriber.unsubscribe();
  }

}
