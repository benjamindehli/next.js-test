const environment = process.env.NODE_ENV;
const productionUrl = process.env.PRODUCTION_URL;
const dbClusterUrl = process.env.DB_CLUSTER_URL;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const imageKitId = process.env.NEXT_PUBLIC_IMAGEKIT_ID;

export const isProduction = environment !== "productions";

export const server = !isProduction ? "http://localhost:3000" : productionUrl;

export const dbConnectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbClusterUrl}/${dbName}?retryWrites=true&w=majority`;
export const imageKitUrlEndpoint = `https://ik.imagekit.io/${imageKitId}`;