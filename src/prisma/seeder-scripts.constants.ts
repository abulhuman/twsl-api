import { UsersSeeder } from 'src/users/seeders/users.seeder';
import { OrdersSeeder } from 'src/orders/seeders/orders.seeder';
import { SeederEntry } from './abstract.seeder';
import { isNotProductionGuard } from './seeder.guards';

const SEEDERS: SeederEntry[] = [
  { constructor: UsersSeeder, guard: isNotProductionGuard },
  { constructor: OrdersSeeder, guard: isNotProductionGuard },
];

export default SEEDERS;
