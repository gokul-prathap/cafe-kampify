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
    { id: 'm4', name: 'Chicken Maggie', price: 120, category: 'MAGGIE', isVeg: false, time: '15 min', initialRating: 4.6, available: false, image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&q=80' },
  
    // KERALA BREADS
    { id: 'b1', name: 'Chapathi', price: 15, category: 'KERALA BREADS', isVeg: true, time: '10 min', initialRating: 4.3, available: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    { id: 'b2', name: 'Soft Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b3', name: 'Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.4, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b4', name: 'Idiyappam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.6, available: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
    { id: 'b5', name: 'Porotta', price: 25, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80' },
    { id: 'b6', name: 'Appam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
    { id: 'b7', name: 'Healthy Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.2, available: false, image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80' },
  
    // MEALS
    { id: 'ml1', name: 'Veg Meals', price: 80, category: 'MEALS', isVeg: true, time: '20 min', initialRating: 4.5, available: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' },
    { id: 'ml2', name: 'Fish Meals', price: 100, category: 'MEALS', isVeg: false, time: '20 min', initialRating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&q=80' }
  ];
  
  export const CATEGORIES_WITH_ICONS = [
    { id: 'ALL', label: 'Food', icon: '🍔' },
    { id: 'STEWS', label: 'Stews', icon: '🍲' },
    { id: 'APPETIZERS', label: 'Starters', icon: '🍟' },
    { id: 'MAGGIE', label: 'Maggie', icon: '🍜' },
    { id: 'KERALA BREADS', label: 'Breads', icon: '🫓' },
    { id: 'MEALS', label: 'Meals', icon: '🍱' }
  ];