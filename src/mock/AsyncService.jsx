const products = [
    {
        id: '01',
        name: 'Red Velvet',
        price: 7000,
        description: 'Torta de chocolate rojo con deliciosa crema a base de queso crema',
        stock: 10,
        img: 'https://i.postimg.cc/BnnjFgw4/redvelvet.png',
        category: 'masvendidos'
    },
    {
        id: '02',
        name: 'Carrot Cake',
        price: 7000,
        description: 'Torta de zanahoria con frosting de queso crema y nueces',
        stock: 15,
        img: 'https://i.postimg.cc/tJds3mjC/carrotcake.png',
        category: 'cakes'
    },
    {
        id: '03',
        name: 'ChocoTenteichon',
        price: 7000,
        description: 'Torta de chocolate con relleno de dulce de leche',
        stock: 8,
        img: 'https://i.postimg.cc/wTSryfBs/chocotenteichon.png',
        category: 'cakes'
    },
    {
        id: '04',
        name: 'CookieTentacion',
        price: 5000,
        description: 'Galleta de chocolaate rellena de ganache de chocolate',
        stock: 8,
        img: 'https://i.postimg.cc/sXhQXgHW/chococookie.png',
        category: 'cookies'
    },
    {
        id: '06',
        name: 'KinderCookie',
        price: 5000,
        description: 'Galleta de chocolaate kinder rellena de dulce de leche',
        stock: 8,
        img: 'https://i.postimg.cc/cCGK8GPb/kindercookie.png',
        category: 'cookies'
    },
    {
        id: '07',
        name: 'QueenPistacchio',
        price: 5000,
        description: 'Galleta de pistacchio rellena de ganache de pistacchio',
        stock: 8,
        img: 'https://i.postimg.cc/vHMgYMr1/queenpistacho.png',
        category: 'cookies'
    },
    {
        id: '08',
        name: 'CookieRED',
        price: 5000,
        description: 'Galleta de chocolate rojo red velvet rellena de frosting de queso crema',
        stock: 8,
        img: 'https://i.postimg.cc/c4mK6jhF/redvelvetcookie.png',
        category: 'cookies'
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