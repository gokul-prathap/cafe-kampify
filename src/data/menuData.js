export const INITIAL_MENU = [
    // STEWS
    { id: 's1', name: 'Veg Stew', price: 100, category: 'STEWS', isVeg: true, time: '45 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
    { id: 's2', name: 'Chicken Stew', price: 150, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },
    { id: 's3', name: 'Beef Stew', price: 150, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
    { id: 's4', name: 'Prawns Stew', price: 200, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1559742811-824289511f48?w=400&q=80' },
    { id: 's5', name: 'Fish Stew', price: 300, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },

    // APPETIZERS
    { id: 'a1', name: 'Chicken Nuggets', price: 120, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
    { id: 'a2', name: 'Crab Claw', price: 200, category: 'APPETIZERS', isVeg: false, time: '25 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1534080391025-a7f0e6d23035?w=400&q=80' },
    { id: 'a3', name: 'Fish Finger', price: 150, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1574484284002-952d922257c4?w=400&q=80' },
    { id: 'a4', name: 'Fish Fries', price: 200, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
    { id: 'a5', name: 'French Fries', price: 100, category: 'APPETIZERS', isVeg: true, time: '15 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
    { id: 'a6', name: 'Prawns Lollipop', price: 200, category: 'APPETIZERS', isVeg: false, time: '25 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80' },
    { id: 'a7', name: 'Veg Nuggets', price: 100, category: 'APPETIZERS', isVeg: true, time: '15 min', initialRating: 4.1, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },
    { id: 'a8', name: 'Crispy Happy Potato', price: 100, category: 'APPETIZERS', isVeg: true, time: '20 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80' },

    // MAGGIE
    { id: 'm1', name: 'Maggie Noodles', price: 70, category: 'MAGGIE', isVeg: true, time: '10 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },
    { id: 'm2', name: 'Egg Maggie', price: 100, category: 'MAGGIE', isVeg: false, time: '12 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'm3', name: 'Veg Maggie', price: 80, category: 'MAGGIE', isVeg: true, time: '12 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' },
    { id: 'm4', name: 'Chicken Maggie', price: 120, category: 'MAGGIE', isVeg: false, time: '15 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },

    // KERALA BREADS
    { id: 'b1', name: 'Chapathi', price: 15, category: 'KERALA BREADS', isVeg: true, time: '10 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    { id: 'b2', name: 'Soft Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b3', name: 'Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b4', name: 'Idiyappam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    { id: 'b5', name: 'Porotta', price: 25, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80' },
    { id: 'b6', name: 'Appam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b7', name: 'Healthy Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b8', name: 'Village Appam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },

    // MEALS
    { id: 'ml1', name: 'Veg Meals', price: 80, category: 'MEALS', isVeg: true, time: '20 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'ml2', name: 'Fish Meals', price: 100, category: 'MEALS', isVeg: false, time: '20 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&q=80', optionalRequests: ['Less Spicy', 'No Curry'] },

    // FRUIT REFRESHERS
    { id: 'fr1', name: 'Fresh Lime', price: 40, category: 'BEVERAGES', isVeg: true, time: '10 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr2', name: 'Lime Soda', price: 35, category: 'BEVERAGES', isVeg: true, time: '10 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr3', name: 'Mango Juice(seasonal)', price: 120, category: 'BEVERAGES', isVeg: true, time: '15 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1553115216-0b24dee79999?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr4', name: 'Orange Juice', price: 90, category: 'BEVERAGES', isVeg: true, time: '12 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr5', name: 'Papaya Juice', price: 100, category: 'BEVERAGES', isVeg: true, time: '15 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr6', name: 'Pineapple Juice', price: 80, category: 'BEVERAGES', isVeg: true, time: '12 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1550258114-28a2a471fbd6?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'fr7', name: 'Watermelon Juice', price: 80, category: 'BEVERAGES', isVeg: true, time: '10 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },

    // TEA & COFFEE CLASSICS
    { id: 'tc1', name: 'Black Coffee', price: 15, category: 'HOT DRINKS', isVeg: true, time: '8 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc2', name: 'Black Tea', price: 15, category: 'HOT DRINKS', isVeg: true, time: '5 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice']},
    { id: 'tc3', name: 'Ginger Tea', price: 20, category: 'HOT DRINKS', isVeg: true, time: '8 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc4', name: 'Green Tea', price: 20, category: 'HOT DRINKS', isVeg: true, time: '6 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc5', name: 'Lemon Tea', price: 15, category: 'HOT DRINKS', isVeg: true, time: '6 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc6', name: 'Masala Tea', price: 20, category: 'HOT DRINKS', isVeg: true, time: '8 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1563887556868-f9ac372e3b5b?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc7', name: 'Milk Coffee', price: 20, category: 'HOT DRINKS', isVeg: true, time: '8 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },
    { id: 'tc8', name: 'Milk Tea', price: 20, category: 'HOT DRINKS', isVeg: true, time: '8 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1563887556868-f9ac372e3b5b?w=400&q=80', optionalRequests: ['No Sugar', 'Less Sugar', 'No Ice'] },

    // COLD BEVERAGES
    { id: 'cb1', name: 'Coca Cola', price: 40, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
    { id: 'cb2', name: 'Coca Cola Zero Sugar', price: 70, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.1, available: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
    { id: 'cb3', name: 'Pepsi', price: 40, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-153115216-0b24dee79999?w=400&q=80' },
    { id: 'cb4', name: 'Pepsi Zero Sugar', price: 40, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.0, available: true, image: 'https://images.unsplash.com/photo-153115216-0b24dee79999?w=400&q=80' },
    { id: 'cb5', name: 'Redbull', price: 125, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1622543917551-3b7001d27555?w=400&q=80' },
    { id: 'cb6', name: 'Soda', price: 20, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
    { id: 'cb7', name: 'Sprite', price: 40, category: 'BEVERAGES', isVeg: true, time: '5 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1625772290546-1a72440b849e?w=400&q=80' },
    { id: 'cb8', name: 'Water', price: 20, category: 'BEVERAGES', isVeg: true, time: '2 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80' },

    // TAPIOCA MAGIC
    { id: 'tm1', name: 'Kappa with crab meat mix', price: 300, category: 'TAPIOCA', isVeg: false, time: '35 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
    { id: 'tm2', name: 'Kappa with kakka mix', price: 200, category: 'TAPIOCA', isVeg: false, time: '30 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
    { id: 'tm3', name: 'Kappa with Tuna Curry', price: 150, category: 'TAPIOCA', isVeg: false, time: '30 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1574484284002-952d922257c4?w=400&q=80' },
    { id: 'tm4', name: 'Naadan Kappa and Kaanthaari Chammanthi', price: 60, category: 'TAPIOCA', isVeg: true, time: '20 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'tm5', name: 'Special Fufu kappa', price: 70, category: 'TAPIOCA', isVeg: true, time: '25 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },

    // CRAB CREATIONS
    { id: 'cc1', name: 'Crab Fry', price: 350, category: 'CRAB', isVeg: false, time: '30 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1534080391025-a7f0e6d23035?w=400&q=80' },
    { id: 'cc2', name: 'Crab Masala', price: 350, category: 'CRAB', isVeg: false, time: '35 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },
    { id: 'cc3', name: 'Crab Meat', price: 350, category: 'CRAB', isVeg: false, time: '25 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1534080391025-a7f0e6d23035?w=400&q=80' },
    { id: 'cc4', name: 'Crab Roast', price: 350, category: 'CRAB', isVeg: false, time: '35 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },

    // PRAWN CHOICE
    { id: 'pc1', name: 'Garlic Prawns', price: 350, category: 'PRAWNS', isVeg: false, time: '25 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1559742811-824289511f48?w=400&q=80' },
    { id: 'pc2', name: 'Prawns Fry', price: 300, category: 'PRAWNS', isVeg: false, time: '20 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80' },
    { id: 'pc3', name: 'Prawns Pollichath', price: 350, category: 'PRAWNS', isVeg: false, time: '30 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1559742811-824289511f48?w=400&q=80' },
    { id: 'pc4', name: 'Prawns Roast', price: 300, category: 'PRAWNS', isVeg: false, time: '25 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80' },

    // KERALA STYLE TILAPIA
    { id: 'tl1', name: 'Tilapia Fry', price: 200, category: 'SEAFOOD', isVeg: false, time: '25 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' },
    { id: 'tl2', name: 'Tilapia Mulak Curry', price: 200, category: 'SEAFOOD', isVeg: false, time: '30 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    { id: 'tl3', name: 'Tilapia Pollichathu', price: 250, category: 'SEAFOOD', isVeg: false, time: '35 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },

    // BACKWATER PEARL FISH
    { id: 'pf1', name: 'Karimeen Fry', price: 300, category: 'SEAFOOD', isVeg: false, time: '25 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
    { id: 'pf2', name: 'Karimeen Mappas', price: 300, category: 'SEAFOOD', isVeg: false, time: '35 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },
    { id: 'pf3', name: 'Karimeen Manga Curry', price: 300, category: 'SEAFOOD', isVeg: false, time: '30 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    { id: 'pf4', name: 'Karimeen Mulak Curry', price: 300, category: 'SEAFOOD', isVeg: false, time: '30 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
    { id: 'pf5', name: 'Karimeen Pollichath', price: 350, category: 'SEAFOOD', isVeg: false, time: '35 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1559742811-824289511f48?w=400&q=80' },
    { id: 'pf6', name: 'Karimeen Stew', price: 350, category: 'STEWS', isVeg: false, time: '40 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },

    // KALANJI CURRIES
    { id: 'kj1', name: 'Kalanji Fry', price: 350, category: 'SEAFOOD', isVeg: false, time: '25 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80' },
    { id: 'kj2', name: 'Kalanji Mappas', price: 350, category: 'SEAFOOD', isVeg: false, time: '35 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },
    { id: 'kj3', name: 'Kalanji Manga Curry', price: 350, category: 'SEAFOOD', isVeg: false, time: '30 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    { id: 'kj4', name: 'Kalanji Mulak Curry', price: 350, category: 'SEAFOOD', isVeg: false, time: '30 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
    { id: 'kj5', name: 'Kalanji Pollichath', price: 350, category: 'SEAFOOD', isVeg: false, time: '35 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1559742811-824289511f48?w=400&q=80' },

    // VILLAGE PORK FAVOURITES
    { id: 'pk1', name: 'Chilly Pork', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1602404259679-14-608f82629710?w=400&q=80' },
    { id: 'pk2', name: 'Homestyle Pork Curry', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '35 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },
    { id: 'pk3', name: 'Naadan Pork Roast', price: 350, category: 'MEAT FAVOURITES', isVeg: false, time: '30 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80' },
    { id: 'pk4', name: 'Spicy Pork Vindaloo', price: 350, category: 'MEAT FAVOURITES', isVeg: false, time: '35 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80' },

    // QUACK SPECIALS
    { id: 'dk1', name: 'Duck Curry', price: 350, category: 'MEAT FAVOURITES', isVeg: false, time: '35 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
    { id: 'dk2', name: 'Duck Roast', price: 350, category: 'MEAT FAVOURITES', isVeg: false, time: '30 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80' },
    { id: 'dk3', name: 'Traditional Duck Mappas', price: 400, category: 'MEAT FAVOURITES', isVeg: false, time: '40 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80' },

    // BEEF DELIGHTS
    { id: 'bf1', name: 'Beef Dry Fry', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80' },
    { id: 'bf2', name: 'Beef Fry', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80' },
    { id: 'bf3', name: 'Beef Habibi', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80' },
    { id: 'bf4', name: 'Beef Vindaaloo', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '30 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80' },
    { id: 'bf5', name: 'Chilly Beef', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1602404259679-14-608f82629710?w=400&q=80' },
    { id: 'bf6', name: 'Kerala Beef Roast', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80' },
    { id: 'bf7', name: 'Naadan Beef Curry', price: 230, category: 'MEAT FAVOURITES', isVeg: false, time: '30 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },
    { id: 'bf8', name: 'Uppil Ventha Beef', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80' },

    // HEN'S SPECIALITIES
    { id: 'ch1', name: 'Butter Chicken', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
    { id: 'ch2', name: 'Chicken 65', price: 200, category: 'MEAT FAVOURITES', isVeg: false, time: '15 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
    { id: 'ch3', name: 'Chicken Kondattam', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80' },
    { id: 'ch4', name: 'Chilly Chicken', price: 250, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1602404259679-14-608f82629710?w=400&q=80' },
    { id: 'ch5', name: 'Dragon Chicken', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '22 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
    { id: 'ch6', name: 'Garlic Chicken', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '22 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
    { id: 'ch7', name: 'Green Masala Chicken', price: 300, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },
    { id: 'ch8', name: 'Kerala Chicken Fry', price: 200, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
    { id: 'ch9', name: 'Naadan Chicken Curry', price: 200, category: 'MEAT FAVOURITES', isVeg: false, time: '25 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
    { id: 'ch10', name: 'Pepper Chicken', price: 200, category: 'MEAT FAVOURITES', isVeg: false, time: '20 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },

    // VEG PREPERATIONS
    { id: 'vg1', name: 'Aloo Fry', price: 100, category: 'VEG DELIGHTS', isVeg: true, time: '15 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80' },
    { id: 'vg2', name: 'Aloo Gobi', price: 100, category: 'VEG DELIGHTS', isVeg: true, time: '20 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    { id: 'vg3', name: 'Chilly Gobi', price: 150, category: 'VEG DELIGHTS', isVeg: true, time: '20 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1602404259679-14-608f82629710?w=400&q=80' },
    { id: 'vg4', name: 'Chilly Paneer', price: 180, category: 'VEG DELIGHTS', isVeg: true, time: '20 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80' },
    { id: 'vg5', name: 'Dal Curry', price: 80, category: 'VEG DELIGHTS', isVeg: true, time: '15 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'vg6', name: 'Dal Fry', price: 80, category: 'VEG DELIGHTS', isVeg: true, time: '15 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'vg7', name: 'Gobi Manchurian', price: 150, category: 'VEG DELIGHTS', isVeg: true, time: '22 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1602404259679-14-608f82629710?w=400&q=80' },
    { id: 'vg8', name: "Grandma's Veg Stew", price: 100, category: 'STEWS', isVeg: true, time: '35 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
    { id: 'vg9', name: 'Green Peas Curry', price: 80, category: 'VEG DELIGHTS', isVeg: true, time: '15 min', initialRating: 4.1, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'vg10', name: 'Kadala Curry', price: 80, category: 'VEG DELIGHTS', isVeg: true, time: '20 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'vg11', name: 'Kerala Veg Kuruma', price: 80, category: 'VEG DELIGHTS', isVeg: true, time: '25 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'vg12', name: 'Paneer Masala', price: 200, category: 'VEG DELIGHTS', isVeg: true, time: '25 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80' },

    // STREET-STYLE EGG ITEMS
    { id: 'eg1', name: 'Appam with Egg', price: 50, category: 'EGG & NOODLES', isVeg: false, time: '12 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'eg2', name: 'Boiled Egg', price: 15, category: 'EGG & NOODLES', isVeg: false, time: '5 min', initialRating: 4.1, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg3', name: 'Bread Omlette', price: 50, category: 'EGG & NOODLES', isVeg: false, time: '10 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg4', name: "Bull's Eye (Double)", price: 35, category: 'EGG & NOODLES', isVeg: false, time: '8 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg5', name: "Bull's Eye (Single)", price: 20, category: 'EGG & NOODLES', isVeg: false, time: '6 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg6', name: 'Egg Burji', price: 50, category: 'EGG & NOODLES', isVeg: false, time: '10 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg7', name: 'Egg Curry', price: 40, category: 'EGG & NOODLES', isVeg: false, time: '15 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    { id: 'eg8', name: 'Omlette (Double)', price: 40, category: 'EGG & NOODLES', isVeg: false, time: '8 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
    { id: 'eg9', name: 'Omlette (Single)', price: 25, category: 'EGG & NOODLES', isVeg: false, time: '6 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },

    // NOODLE MANIA
    { id: 'nd1', name: 'Chicken Noodles', price: 220, category: 'EGG & NOODLES', isVeg: false, time: '20 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80', optionalRequests: ['Less Oil', 'Boiled Egg', 'Extra Spicy'] },
    { id: 'nd3', name: 'Mixed Noodles', price: 230, category: 'EGG & NOODLES', isVeg: false, time: '22 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80', optionalRequests: ['Less Oil', 'Boiled Egg', 'Extra Spicy'] },
    { id: 'nd6', name: 'Veg Noodles', price: 180, category: 'EGG & NOODLES', isVeg: true, time: '15 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },
    { id: 'nd2', name: 'Egg Noodles', price: 200, category: 'EGG & NOODLES', isVeg: false, time: '18 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },
    { id: 'nd4', name: 'Mushroom Noodles', price: 180, category: 'EGG & NOODLES', isVeg: true, time: '18 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },
    { id: 'nd5', name: 'Paneer Noodles', price: 180, category: 'EGG & NOODLES', isVeg: true, time: '18 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80' },

    // RICE BOWLS
    { id: 'rb1', name: 'Chicken Fried Rice', price: 220, category: 'RICE BOWLS', isVeg: false, time: '20 min', initialRating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1603133872878-a364b70db654?w=400&q=80', optionalRequests: ['Less Oil', 'Boiled Egg', 'Extra Spicy'] },
    { id: 'rb4', name: 'Mixed Fried Rice', price: 230, category: 'RICE BOWLS', isVeg: false, time: '22 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1603133872878-a364b70db654?w=400&q=80', optionalRequests: ['Less Oil', 'Boiled Egg', 'Extra Spicy'] },
    { id: 'rb2', name: 'Egg Fried Rice', price: 200, category: 'RICE BOWLS', isVeg: false, time: '18 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' },
    { id: 'rb3', name: 'Kerala Rice', price: 50, category: 'RICE BOWLS', isVeg: true, time: '10 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'rb5', name: 'Mushroom Fried Rice', price: 180, category: 'RICE BOWLS', isVeg: true, time: '18 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' },
    { id: 'rb6', name: 'Paneer Fried Rice', price: 180, category: 'RICE BOWLS', isVeg: true, time: '18 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80' },
    { id: 'rb7', name: 'Veg Fried Rice', price: 180, category: 'RICE BOWLS', isVeg: true, time: '15 min', initialRating: 4.2, available: true, image: 'https://images.unsplash.com/photo-1603133872878-a364b70db654?w=400&q=80' }
];

export const CATEGORIES_WITH_ICONS = [
    { id: 'ALL', label: 'Food', icon: '🍔' },
    { id: 'BEVERAGES', label: 'Drinks', icon: '🥤' },
    { id: 'MAGGIE', label: 'Maggie', icon: '🍜' },
    { id: 'HOT DRINKS', label: 'Hot Drinks', icon: '☕' },
    { id: 'MEALS', label: 'Meals', icon: '🍱' },
    { id: 'APPETIZERS', label: 'Starters', icon: '🍟' },
    { id: 'STEWS', label: 'Stews', icon: '🍲' },
    { id: 'KERALA BREADS', label: 'Breads', icon: '🫓' },
    { id: 'RICE BOWLS', label: 'Rice Bowls', icon: '🍚' },
    { id: 'TAPIOCA', label: 'Tapioca', icon: '🪵' },
    { id: 'CRAB', label: 'Crab', icon: '🦀' },
    { id: 'PRAWNS', label: 'Prawns', icon: '🦐' },
    { id: 'SEAFOOD', label: 'Fish Specials', icon: '🐟' },
    { id: 'MEAT FAVOURITES', label: 'Non-Veg', icon: '🍗' },
    { id: 'VEG DELIGHTS', label: 'Veg Dishes', icon: '🥦' },
    { id: 'EGG & NOODLES', label: 'Egg & Noodles', icon: '🍳' }
];