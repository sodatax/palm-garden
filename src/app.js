import express from 'express';
import session from 'express-session';
import defaultRouter from './routers/default.routes.js';
import productRouter from './routers/products.routes.js';
import productPageRouter from './routers/productPage.routes.js';
import cartRouter from './routers/cart.routes.js';

//configure Express.js app
const app = express();

app.use(session({
    secret: "6e092445-b4df-451c-837d-29934b81c1bd",
    resave: false,
    saveUnitialized: true,
    cookie: {
        httpOnly: true, //don't allow access through JS
        secure: false, //requires HTTPS?
        maxAge: 20 * 60 * 1000 //20 minute timeout
    }
}));

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", defaultRouter);
app.use("/products", productPageRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

export default app;