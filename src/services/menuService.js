import axios from 'axios'

const MENU_URL = 'https://dummyjson.com/products/category/groceries?limit=30'

const menuDetails = {
  16: {
    name: 'Burrata & manzana',
    category: 'Entradas',
    description: 'Manzana fresca, burrata cremosa, miel de la casa y hojas tiernas.',
    image: 'photo-1512621776951-a57141f2eefd',
    tag: 'De temporada',
  },
  17: {
    name: 'Bife de la casa',
    category: 'Principales',
    description: 'Corte a la parrilla, papas doradas y mantequilla de hierbas.',
    image: 'photo-1544025162-d76694265947',
    tag: 'Favorito',
  },
  19: {
    name: 'Pollo al fuego',
    category: 'Principales',
    description: 'Pollo marinado 24 horas, cremoso de choclo y limón tatemado.',
    image: 'photo-1532550907401-a500c9a57435',
    tag: 'De la casa',
  },
  20: {
    name: 'Papas bravas',
    category: 'Entradas',
    description: 'Papas crujientes, alioli de ajo rostizado y nuestra salsa brava.',
    image: 'photo-1573080496219-bb080dd4f877',
    tag: 'Para compartir',
  },
  21: {
    name: 'Ensalada de estación',
    category: 'Entradas',
    description: 'Pepino fresco, palta, hierbas, limón y vinagreta de la casa.',
    image: 'photo-1540420773420-3366772f4999',
    tag: '',
  },
  23: {
    name: 'Huevos de campo',
    category: 'Desayuno',
    description: 'Huevos cremosos, pan de masa madre y tomates confitados.',
    image: 'photo-1525351484163-7529414344d8',
    tag: 'Brunch',
  },
  24: {
    name: 'Pesca a la brasa',
    category: 'Principales',
    description: 'Pesca del día, vegetales al fuego y mantequilla cítrica.',
    image: 'photo-1519708227418-c8fd9a32b7a2',
    tag: 'Pesca del día',
  },
  25: {
    name: 'Pimiento relleno',
    category: 'Principales',
    description: 'Pimiento asado, arroz especiado y queso fresco gratinado.',
    image: 'photo-1511690743698-d9d85f2fbf38',
    tag: '',
  },
  26: {
    name: 'Ajíes de temporada',
    category: 'Entradas',
    description: 'Ajíes verdes al carbón, queso suave y miel picante.',
    image: 'photo-1547592180-85f173990554',
    tag: 'Un poco picante',
  },
  27: {
    name: 'Tostada de miel',
    category: 'Postres',
    description: 'Pan brioche dorado, miel floral y crema batida.',
    image: 'photo-1484723091739-30a097e8f929',
    tag: '',
  },
  28: {
    name: 'Helado artesanal',
    category: 'Postres',
    description: 'Helado de temporada, hecho en casa todos los días.',
    image: 'photo-1563805042-7684c019e1cb',
    tag: 'Hecho en casa',
  },
  29: {
    name: 'Jugo recién hecho',
    category: 'Bebidas',
    description: 'Fruta fresca exprimida al momento, sin azúcar añadida.',
    image: 'photo-1622597467836-f3285f2131b8',
    tag: 'Natural',
  },
  30: {
    name: 'Kiwi & crema',
    category: 'Postres',
    description: 'Kiwi fresco con crema de vainilla y granola crocante.',
    image: 'photo-1488477181946-6428a0291777',
    tag: '',
  },
  31: {
    name: 'Limonada de la casa',
    category: 'Bebidas',
    description: 'Limón recién exprimido, hierbabuena y un toque de jengibre.',
    image: 'photo-1622597467836-f3285f2131b8',
    tag: 'Refrescante',
  },
  32: {
    name: 'Latte de avena',
    category: 'Bebidas',
    description: 'Espresso de origen, leche cremosa y una pizca de canela.',
    image: 'photo-1461023058943-07fcbe16d735',
    tag: '',
  },
  33: {
    name: 'Frutos del bosque',
    category: 'Postres',
    description: 'Frutos rojos frescos, yogur batido y crocante de avena.',
    image: 'photo-1490474418585-ba9bad8fd0ea',
    tag: 'De temporada',
  },
  34: {
    name: 'Café de especialidad',
    category: 'Bebidas',
    description: 'Café de altura, tostado localmente y preparado al momento.',
    image: 'photo-1509042239860-f550ce710b93',
    tag: 'Origen local',
  },
  35: {
    name: 'Papas al romero',
    category: 'Entradas',
    description: 'Papas nativas, romero fresco y alioli de limón.',
    image: 'photo-1518013431117-eb1465fa5752',
    tag: '',
  },
  37: {
    name: 'Tostada de huerta',
    category: 'Desayuno',
    description: 'Masa madre, cebolla caramelizada, palta y hierbas frescas.',
    image: 'photo-1525351484163-7529414344d8',
    tag: 'Brunch',
  },
  38: {
    name: 'Bowl de arroz criollo',
    category: 'Principales',
    description: 'Arroz de la casa, vegetales al fuego y salsa criolla.',
    image: 'photo-1512621776951-a57141f2eefd',
    tag: 'Vegetariano',
  },
  39: {
    name: 'Soda artesanal',
    category: 'Bebidas',
    description: 'Soda fría con frutas y hierbas de estación.',
    image: 'photo-1461023058943-07fcbe16d735',
    tag: '',
  },
  40: {
    name: 'Fresas con crema',
    category: 'Postres',
    description: 'Fresas de estación, crema fresca y crumble de vainilla.',
    image: 'photo-1490474418585-ba9bad8fd0ea',
    tag: 'Favorito',
  },
  42: {
    name: 'Agua de la casa',
    category: 'Bebidas',
    description: 'Agua fresca con cítricos y hierbas aromáticas.',
    image: 'photo-1622597467836-f3285f2131b8',
    tag: '',
  },
}

const excludedProductIds = new Set([18, 22, 36, 41])

export async function getMenu(signal) {
  const response = await axios.get(MENU_URL, { signal })
  const products = response.data?.products

  if (!Array.isArray(products)) {
    throw new Error('La respuesta del menú no tiene el formato esperado.')
  }

  return products
    .filter((product) => !excludedProductIds.has(product.id) && menuDetails[product.id])
    .map((product) => ({
      id: product.id,
      name: menuDetails[product.id].name,
      category: menuDetails[product.id].category,
      description: menuDetails[product.id].description,
      image: `https://images.unsplash.com/${menuDetails[product.id].image}?auto=format&fit=crop&w=800&q=85`,
      price: Math.round(product.price * 2.4 + 7),
      tag: menuDetails[product.id].tag,
    }))
}
