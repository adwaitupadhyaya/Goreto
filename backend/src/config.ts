import dotenv from "dotenv";

dotenv.config({
  path: __dirname + "/../.env",
});

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 3000,
    refreshTokenExpiryMS: 30000,
  },
  test: {
    accessToken: process.env.TEST_ACCESS_TOKEN,
    accessTokenSuperAdmin: process.env.TEST_ACCESS_TOKEN_SUPER_ADMIN,
    refreshToken: process.env.TEST_REFRESH_TOKEN,
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;
