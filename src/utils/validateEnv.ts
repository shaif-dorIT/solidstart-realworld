import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  process.env.NODE_ENV === 'Development'
    ? cleanEnv(process.env, {
        NODE_ENV: str(),
        NODE_PORT: port(),
        POSTGRES_HOST: str(),
        POSTGRES_PORT: port(),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_DB: str()
      })
    : cleanEnv(process.env, {
        NODE_ENV: str(),
        DATABASE_URL: str()
      })
}

export default validateEnv
