const express = require('express');
const cors = require('cors')
require('dotenv').config()
const knex = require('knex')
const config = require('../knexfile');
const connection = knex(config);

const app = express();

app.use(express.json());
app.use(cors());


app.get('/api/plans', async(req, res) => {
    try {
        const plans = await connection('plans as p')
        .select('p.id as plan_id', 'p.plan', 'p.name','p.price', 'p.description', 'p.order as plan_order', 'p.createdAt ', 'p.features');

        const transformedPlans = plans.map(plan => {
            const features = [JSON.parse(plan.features)]
        
            return {
                id: plan.plan_id,
                plan: plan.plan,
                name: plan.name,
                price: plan.price,
                description: plan.description,
                order: plan.plan_order,
                createdAt: plan.plan.createdAt,
                features: features.map(feature => ({
                        id: feature.id,
                        plan_id: feature.plan_id,
                        description: feature.description,
                        order: feature.order,
                        createdAt: feature.created_at,           
               })
            )
         }
    }); 
        res.json(transformedPlans);      
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Erro ao buscar os planos" });
    }
});

app.listen(`${process.env.PORT}`, () => {
    console.log('Server is running')
})
