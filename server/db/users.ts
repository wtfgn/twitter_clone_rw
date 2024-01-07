import { prisma } from './index';

export interface UserData {
  username: string
  email: string
  password: string
  repeatPassword?: string
  name: string
  profileImage?: string
}

export async function createUser(rawUserData: UserData) {
  const finalUserData = {
    ...rawUserData,
    password: bcrypt.hashSync(rawUserData.password, 10),
  };

  const user = await prisma.user.create({
    data: finalUserData,
  });

  return user;
}
