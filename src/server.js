import { db } from './db/index.js';
import express from 'express';
import morgan from 'morgan';
import { products, sales, sales_detail } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

const PORT= process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json('Hola mundo');
});

app.get('/products', async (req, res) => {
	const products = await db.query.products.findFirst();
		res.json(products);
	});
    app.post('/products', async (req, res) => {
        const product = await db.query.products.findFirst({where: eq(schema.products.name,name)
        });
        if (product) {
            return res.status(400).json({ message: 'Producto ya existente❌' });
        }
        product= await db.insert(schema.products).values(req.body).returning();
        console.log("Producto Creado ✅",product)
        res.json(product);
    });

    app.delete('/products/:id', async (req, res) => {
        const productId = req.params.id;
    
        try {
            await db.query.products.delete({ where: { id: parseInt(productId) } });
            res.json({ message: 'Producto eliminado correctamente ✅' });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ message: 'Hubo un error al eliminar el producto ❌' });
        }
    });


    app.put('/products/:id', async (req, res) => {
        const productId = req.params.id;
        const updatedProductData = req.body;
    
        try {
            const existingProduct = await db.query.products.findFirst({ where: { id: parseInt(productId) } });
    
            if (!existingProduct) {
                return res.status(404).json({ message: 'Producto no encontrado ❌' });
            }
            
            await db.query.products.update({
                where: { id: parseInt(productId) },
                data: updatedProductData
            });
            
            res.json({ message: 'Producto actualizado correctamente ✅' });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ message: 'Hubo un error al actualizar el producto ❌' });
        }
    });
    


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}🎉`);
});

