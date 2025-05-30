const products = [
    {
        id: '01',
        name: 'Red Velvet',
        price: 7000,
        description: 'Torta de chocolate rojo con deliciosa crema a base de queso crema',
        stock: 10,
        img: 'https://via.placeholder.com/300x200?text=Red+Velvet',
        category: 'masvendidos'
    },
    {
        id: '02',
        name: 'Carrot Cake',
        price: 7000,
        description: 'Torta de zanahoria con frosting de queso crema y nueces',
        stock: 15,
        img: 'https://via.placeholder.com/300x200?text=Carrot+Cake',
        category: 'cakes'
    },
    {
        id: '03',
        name: 'ChocoTenteichon',
        price: 7000,
        description: 'Torta de chocolate con relleno de dulce de leche',
        stock: 8,
        img: 'https://via.placeholder.com/300x200?text=ChocoTenteichon',
        category: 'cakes'
    }
];

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                console.log('Enviando productos:', products);
                resolve(products);
            }, 1000);
        } catch (error) {
            reject(new Error('Error al obtener los productos'));
        }
    });
};