import bcrypt from 'bcrypt';
import { prisma } from '.';
import type { PromiseType } from '@/types/utility';

export interface BaseUserData {
  username: string
  email: string
  password: string
  name: string
  profileImage?: string
}

export interface RegisteredUserData extends BaseUserData {
  repeatPassword: string
}

export type CreatedUserData = PromiseType<ReturnType<typeof createUser>>;

export async function createUser(rawUserData: BaseUserData) {
  const finalUserData = {
    ...rawUserData,
    password: bcrypt.hashSync(rawUserData.password, 10),
  };

  const user = await prisma.user.create({
    data: finalUserData,
  });

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
