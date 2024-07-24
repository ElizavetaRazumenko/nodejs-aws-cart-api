import { UserEntity } from '../users/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartItemEntity } from 'src/cart/entities/cartItem.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { ProductEntity } from 'src/cart/entities/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: [
    UserEntity,
    CartEntity,
    CartItemEntity,
    OrderEntity,
    ProductEntity,
  ],
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  migrationsRun: false,
  logging: true,

  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;