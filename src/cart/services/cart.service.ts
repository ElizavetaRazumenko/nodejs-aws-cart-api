import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from '../entities/cartItem.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ProductEntity } from '../entities/product.entity';
import { CartStatuses } from '../models';
import { CartEntity } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async findByUserId(userId: string) {
    return await this.cartRepository.findOne({
      where: {
        status: CartStatuses.OPEN, user: {
        id: userId
        } 
      },
      relations: {
        items: {
          product: true
        }
      },
    });
  }

  async createByUserId(userId: string) {
    const cart = this.cartRepository.create({
      status: CartStatuses.OPEN
    });

    cart.user = new UserEntity({
      id: userId
    });

    const createdCart = await this.cartRepository.save(cart);

    return await this.cartRepository.findOne({
      where: {
        id: createdCart.id
      },
      relations: {
        items: {
          product: true
        }
      },
    });
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = this.findByUserId(userId);

    return userCart ?? this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    cartItem: Partial<CartItemEntity>,
  ) {
    const cart = await this.findOrCreateByUserId(userId);

    if (cartItem.count === 1) {
      const newItem = new CartItemEntity(cartItem);
      const product = new ProductEntity(cartItem.product);

      newItem.product = product;
      newItem.cart = cart;

      await this.cartItemsRepository.save(newItem);
    } else {
      const itemToUpdate = await this.cartItemsRepository.findOne({
        where: {
          product: {
            id: cartItem.product.id
          }
        },
      });

      await this.cartItemsRepository.update(
        {
          id: itemToUpdate.id
        },
        {
          count: cartItem.count,
        },
      );
    }

    return await this.cartRepository.findOne({
      where: {
        id: cart.id
      },
      relations: {
        items: {
          product: true
        }
      },
    });
  }

  async removeByUserId(userId: string) {
    const userCart = await this.cartRepository.findOne({
      where: {
        status: CartStatuses.OPEN, user: {
        id: userId
      }
    },
    });

    if (!userCart) {
      throw new NotFoundException('User cart not found');
    }

    userCart.status = CartStatuses.ORDERED;

    await this.cartRepository.save(userCart);
  }

}
