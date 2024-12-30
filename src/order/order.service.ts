import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrderItem,
  OrderItemDocument,
} from 'src/order-items/entities/order-item.entity';
import { Order, OrderDocument } from './entities/order.entity';
import { CartService } from 'src/cart/cart.service';
import {
  CartItem,
  CartItemDocument,
} from 'src/cart-item/entities/cart-item.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product, ProductDocument } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly cartService: CartService,
    @InjectModel(OrderItem.name)
    private orderItemModel: Model<OrderItemDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // async createOrder(userId: string, shippingAddress: string): Promise<Order> {
  //   try {
  //     // Fetch the user's cart
  //    // const cart = await this.cartService.findCartByUserId(userId);

  //     // if (!cart || cart.items.length === 0) {
  //     //   throw new Error('Cart is empty');
  //     // }

  //     const orderItems = await Promise.all(
  //       cart.items.map(async (cartItemId) => {
  //         const cartItem = await this.cartItemModel.findById(cartItemId);
  //         const orderItem = new this.orderItemModel({
  //           product: cartItem.product,
  //           quantity: cartItem.quantity,
  //           price: cartItem.price,
  //         });
  //         return orderItem.save();
  //       }),
  //     );

  //     const totalAmount = orderItems.reduce(
  //       (total, item) => total + item.price * item.quantity,
  //       0,
  //     );

  //     // Create an Order
  //     const order = new this.orderModel({
  //       user: userId,
  //       store: cart.items[0].store, // Assuming store is stored in CartItem
  //       items: orderItems.map((item) => item._id),
  //       totalAmount,
  //       shippingAddress,
  //       status: 'pending',
  //     });

  //     return await order.save();
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
  async createOrder(
    orderItemsData: { product: string; quantity: number; price: number },
    shippingAddress: string,
    contactInfo: { phone: string; email?: string },
    userId?: string
  ): Promise<Order> {
    // try {
    //   if (!orderItemsData || orderItemsData.length === 0) {
    //     throw new Error('Order items are required to create an order');
    //   }

      
    //   const orderItems = await Promise.all(
    //     orderItemsData.map(async (itemData) => {
    //       const orderItem = new this.orderItemModel({
    //         product: itemData.product,
    //         quantity: itemData.quantity,
    //         price: itemData.price,
    //       });
    //       return orderItem.save();
    //     }),
    //   );

      
    //   const totalAmount = orderItems.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0,
    //   );

     
    //   const order = new this.orderModel({
    //     user: userId||null,
    //     items: orderItems.map((item) => item._id),
    //     totalAmount,
    //     shippingAddress,
    //     contactInfo,
    //     status: 'pending',
    //   });

    //   // Save the Order and return it
    //   return await order.save();
    // } catch (error) {
    //   throw new BadRequestException(error.message);
    // }
    try {
      if (!orderItemsData) {
        throw new Error('Order item data is required to create an order');
      }
  
      // Fetch the product to get the associated storeId
      const product = await this.productModel.findById(orderItemsData.product);
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Create and save the OrderItem for the product
      const orderItem = new this.orderItemModel({
        product: orderItemsData.product,
        quantity: orderItemsData.quantity,
        price: orderItemsData.price,
      });
      const savedOrderItem = await orderItem.save();
  
      // Calculate the total amount (for the single product)
      const totalAmount = savedOrderItem.price * savedOrderItem.quantity;
  
      // Create the order for the single product
      const order = new this.orderModel({
        user: userId || null, // Optional userId
        store: product.storeId, // Fetch storeId from the product
        items: [savedOrderItem._id], // Single item in the order
        totalAmount,
        shippingAddress,
        contactInfo,
        status: 'pending',
      });
  
      // Save the Order and return it
      return await order.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findOne(id: string) {
    const user = await this.orderModel.findById(id);
    if (!user) {
      throw new NotFoundException('no user found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateOrderDto) {
    try {
      const user = await this.orderModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: false,
      });
      if (!user) {
        throw new NotFoundException('no user found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    const user = await this.orderModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('no user found to delete');
    }
    return user;
  }

  async findByuser(user: string): Promise<Order[]> {
    return this.orderModel.find({user}).populate("items").exec();
  }

  async findOrdersByStore(storeId: string): Promise<Order[]> {
    return this.orderModel.find({ store: storeId }).populate('items').exec();
  }
  
}
