import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import {
  CartItem,
  CartItemDocument,
} from '../cart-item/entities/cart-item.entity';
import { Product, ProductDocument } from '../product/entities/product.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cartitemser: CartItemService,
  ) {}
  async addProductToCart(userId: string, addtocart): Promise<Cart> {
    const { productId, quantity } = addtocart;
  
    try {
      // Create the cart item
      const cartItem = await this.cartitemser.create(productId, quantity);
  
      // Try to find the existing cart for the user
      let cart: any = await this.cartModel.findOne({ user: userId });
  
      if (!cart) {
        // If the cart doesn't exist, create a new one with the cart item
        cart = new this.cartModel({ 
          user: userId, 
          items: [cartItem], 
          totalAmount: cartItem.price * cartItem.quantity, // Calculate the total amount immediately
          totalQuantity: cartItem.quantity // Set the total quantity based on the first item
        });
  
        // Save and return the newly created cart
        return cart.save();
      } else {
        // If the cart exists, add the new cart item to the cart
        cart = await this.addcartitemTocart(cart._id.toString(), cartItem._id.toString());
  
        // Recalculate the total amount and total quantity based on updated items
        cart.totalAmount = cart.items.reduce((total, item: any) => {
          return total + (item.price ?? 0) * (item.quantity ?? 0);
        }, 0);
  
        cart.totalQuantity = cart.items.reduce((total, item: any) => {
          return total + (item.quantity ?? 0);
        }, 0);
  
        // Save and return the updated cart
        return cart.save();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  

  async addcartitemTocart(
    cartId: string,
    cartItemId: string,
  ): Promise<Cart | null> {
    return await this.cartModel
      .findByIdAndUpdate(
        cartId,
        { $push: { items: cartItemId } },
        { new: true },
      )
      .populate('items')
      .exec();
  }
  async findCartByUserId(userId) {
    let cart: any = await this.cartModel.findOne({ user: userId });
    return cart;
  }
  async findAll({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate('items')
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartModel.findById(id).populate('items');
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: string, updateCartDto): Promise<Cart> {
    const { items, ...rest } = updateCartDto;

    // Update items if provided
    if (items && items.length > 0) {
      const cartItems = await Promise.all(
        items.map(async (item) => {
          const existingItem = await this.cartItemModel.findById(item._id);
          if (existingItem) {
            return this.cartItemModel.findByIdAndUpdate(item._id, item, {
              new: true,
            });
          } else {
            const newItem = new this.cartItemModel(item);
            return newItem.save();
          }
        }),
      );

      rest.items = cartItems.map((item) => item._id);
    }

    const cart = await this.cartModel
      .findByIdAndUpdate(id, rest, { new: true })
      .populate('items');
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async remove(id: string): Promise<void> {
    const cart = await this.cartModel.findByIdAndDelete(id);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    // Remove associated cart items
    await this.cartItemModel.deleteMany({ _id: { $in: cart.items } });
  }
}
