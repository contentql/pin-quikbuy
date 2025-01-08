import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type UserDataType = RequiredDataFromCollectionSlug<'users'>

export type UserImageType = {
  alt: string
  filePath: string
}

// Get current date in ISO string format
const currentDate = new Date().toISOString()

export const usersData: UserDataType[] = [
  {
    email: 'admin@example.com',
    password: 'changeme',
    displayName: 'Admin',
    username: 'admin',
    imageUrl: 0,
    role: ['user', 'admin', 'author'],
    emailVerified: currentDate, // Set current date
    socialLinks: [],
    bio: null,
    _verified: true,
    loginAttempts: 0,
  },
]

export const usersImagesData: UserImageType[] = [
  {
    alt: 'Admin user',
    filePath: path.join(process.cwd(), '/public/images/seed/users/admin.png'),
  },
]
