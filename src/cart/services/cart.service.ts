import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from '../entities/cartItem.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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

  private userCarts: Record<string, CartEntity> = {};

  async findByUserId(userId: string): Promise<CartEntity> {
    return this.userCarts[ userId ];
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
