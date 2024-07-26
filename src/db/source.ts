import { UserEntity } from '../users/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartItemEntity } from 'src/cart/entities/cartItem.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { ProductEntity } from 'src/cart/entities/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: [
    UserEntity,
    CartEntity,
    CartItemEntity,
    OrderEntity,
    ProductEntity,
  ],
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),

  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  migrationsRun: false,
  logging: true,

  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;