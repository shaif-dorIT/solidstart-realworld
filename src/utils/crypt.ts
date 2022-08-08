import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { User } from '~/types'

const encodePassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10)

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(password, hashedPassword)

const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '60d' })

const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || 'superSecret')

export { encodePassword, verifyPassword, generateToken, verifyToken }
