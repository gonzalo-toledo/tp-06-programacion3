const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const productRouter = require('./routes/products.routes.js')
const userRouter = require('./routes/users.routes.js')

app.use('/productos/', productRouter);
app.use('/usuarios/', userRouter); 

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}
);