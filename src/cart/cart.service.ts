import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import { CartItem, CartItemDocument } from '../cart-item/entities/cart-item.entity';
import { Product, ProductDocument } from '../product/entities/product.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cartitemser:CartItemService
  ) {}

  async addProductToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    
   try {
    const cartItem=await this.cartitemser.create(productId,quantity)
    let cart:any = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      cart = (await this.cartModel.create({ user: userId, items: [cartItem] })).populate("items");
    } else {
    
      cart=this.addcartitemTocart(cart._id.toString(),cartItem)
    }


    cart.totalAmount = cart.items.reduce((total, cartItemId) => {
      const cartItem = cart.items.find(item => item._id.toString() === cartItemId.toString());
      return total + (cartItem?.price ?? 0) * (cartItem?.quantity ?? 0);
    }, 0);

    cart.totalQuantity = cart.items.reduce((total, cartItemId) => {
      const cartItem = cart.items.find(item => item._id.toString() === cartItemId.toString());
      return total + (cartItem?.quantity ?? 0);
    }, 0);

    return cart.save();
   } catch (error) {
    
   }
  }


  async addcartitemTocart(cartId: string, cartItemId: string): Promise<Cart | null> {
    return await this.cartModel
      .findByIdAndUpdate(
        cartId,
        { $push: { items: cartItemId } }, 
        { new: true },
      )
      .populate('items') 
      .exec();
  }
 async findCartByUserId(userId){
    let cart:any = await this.cartModel.findOne({ user: userId });
  return cart
  }
}
