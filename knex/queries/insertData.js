const knex = require('../config/database');


const features = [
    {
        id: 1,
        plan_id: 1,
        description: 'Feature 3\nFeature 4\nFeature 4\nFeature 4',
        created_at: new Date(),
    },
    {
        id: 2,
        plan_id: 2,
        description: 'Feature 3\nFeature 4\nFeature 4\nFeature 4',
        created_at: new Date(),
    },
    {
        id: 3,
        plan_id: 3,
        description: 'Feature 3\nFeature 4\nFeature 4\nFeature 4',
        created_at: new Date(),
    },
    {
        id: 4,
        plan_id: 4,
        description: 'Feature 3\nFeature 4\nFeature 4\nFeature 4',
        created_at: new Date(),
    }
]

const insertData = async() => {
    const data = [
        {
        id: 1,
        plan: 'mensal',
        name: 'Monthly',
        description: 'individuals',
        order: 1,
        price: 9,
        features: JSON.stringify(features[0]),
        },
        {
            id: 2,
            plan: 'trimestral',
            name: 'Quarterly',
            description: 'Small Enterprises',
            order: 2,
            price: 29,
            features: JSON.stringify(features[1]),
        },
        {
            id: 3,
            plan: 'semester',
            name: 'Semester',
            description: 'Medium Enterprises',
            order: 3,
            price: 49,
            features: JSON.stringify(features[2]),
        },
        {
            id: 4,
            plan: 'annual',
            name: 'Annual',
            description: 'Large Enterprises',
            order: 4,
            price: 99,
            features: JSON.stringify(features[3]),
        }
    ]
    try {
        await knex('plans').insert(data);
        console.log('Dados inseridos com sucesso!')
        knex.destroy();
    } catch (error){
        console.log('Erro ao inserir dados:', error);
        knex.destroy();
    }
}

insertData();