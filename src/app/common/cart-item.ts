import { Product } from './product';


export class CartItem {

    id:number;
    name:string;
    price:number;
    imageUrl:String;
    quantity:number;
    
    constructor(product:Product){
        this.id = product.id;
        this.name=product.name;
        this.imageUrl='/assets/images/'+product.imageName;
        this.price=product.price;
        this.quantity=1;
    }
}
