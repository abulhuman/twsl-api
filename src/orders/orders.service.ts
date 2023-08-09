import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: { ...createOrderDto, status: 'PENDING' },
    });
  }

  findAll({
    sort,
    limit,
  }: {
    sort?: Prisma.OrderOrderByWithRelationInput | undefined;
    limit?: number | undefined;
  }) {
    console.log({
      orderBy: sort ?? undefined,
      take: limit ?? undefined,
    });
    return this.prisma.order.findMany({
      orderBy: sort,
      take: limit ?? undefined,
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      data: updateOrderDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
