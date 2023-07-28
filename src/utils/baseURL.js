const MODE = import.meta.env.MODE;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const baseUrl = MODE === "development" ? "http://localhost:4000" : SERVER_URL;

export default baseUrl;
