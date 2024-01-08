import type { CreatedUserData } from '../db/users';

export type TransformedUserData = ReturnType<typeof userTransformer>;

export function userTransformer(user: CreatedUserData) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
  };
}
