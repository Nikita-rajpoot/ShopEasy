// Global variables
let cart = [];
let currentBuyNowCart = null; // Track buy now items


// DOM elements
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');


// Product Data - Comprehensive product catalog
const products = [
    // Electronics Category
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        price: 299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance."
    },
    {
        id: 3,
        name: "4K Ultra HD Smart TV",
        price: 599.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
        description: "55-inch 4K smart TV with HDR and built-in streaming apps."
    },
    {
        id: 4,
        name: "Laptop Pro 2024",
        price: 1299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        description: "15-inch laptop with latest processor, 16GB RAM, and 512GB SSD."
    },
    {
        id: 5,
        name: "Wireless Gaming Mouse",
        price: 79.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        description: "High-precision gaming mouse with RGB lighting and programmable buttons."
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 149.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        description: "RGB mechanical keyboard with Cherry MX switches and aluminum frame."
    },
    {
        id: 7,
        name: "Wireless Earbuds",
        price: 129.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
        description: "True wireless earbuds with noise cancellation and 24-hour battery life."
    },
    {
        id: 8,
        name: "Tablet Pro",
        price: 499.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        description: "10-inch tablet with high-resolution display and powerful processor."
    },

    // Clothing Category
    {
        id: 9,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Comfortable and stylish cotton t-shirt available in multiple colors and sizes."
    },
    {
        id: 10,
        name: "Designer Denim Jeans",
        price: 79.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Premium denim jeans with perfect fit and modern styling."
    },
    {
        id: 11,
        name: "Casual Hoodie",
        price: 49.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
        description: "Warm and comfortable hoodie perfect for casual wear."
    },
    {
        id: 12,
        name: "Formal Dress Shirt",
        price: 59.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
        description: "Professional dress shirt suitable for office and formal occasions."
    },
    {
        id: 13,
        name: "Winter Coat",
        price: 159.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        description: "Warm winter coat with insulation and water-resistant material."
    },
    {
        id: 14,
        name: "Summer Hat",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop",
        description: "Stylish summer hat with UV protection and breathable material."
    },

    // Women's Fashion
    {
        id: 15,
        name: "Elegant Summer Dress",
        price: 89.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Beautiful summer dress with floral pattern and comfortable fit."
    },
    {
        id: 16,
        name: "Designer Handbag",
        price: 199.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description: "Luxury leather handbag with multiple compartments and elegant design."
    },
    {
        id: 17,
        name: "High Heel Shoes",
        price: 129.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        description: "Elegant high heel shoes perfect for formal occasions."
    },
    {
        id: 18,
        name: "Silk Blouse",
        price: 69.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1564257631407-3deb25e9c8e0?w=400&h=300&fit=crop",
        description: "Premium silk blouse with sophisticated design and comfortable fit."
    },
    {
        id: 51,
        name: "Casual Denim Jacket",
        price: 79.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "Classic denim jacket perfect for layering and casual outings."
    },
    {
        id: 52,
        name: "Floral Maxi Dress",
        price: 119.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Elegant maxi dress with beautiful floral print, perfect for summer events."
    },
    {
        id: 53,
        name: "Leather Ankle Boots",
        price: 149.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        description: "Stylish leather ankle boots with comfortable heel and durable construction."
    },
    {
        id: 54,
        name: "Knit Sweater",
        price: 59.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
        description: "Soft knit sweater perfect for cool weather and casual comfort."
    },
    {
        id: 55,
        name: "Pencil Skirt",
        price: 49.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
        description: "Professional pencil skirt ideal for office wear and formal occasions."
    },
    {
        id: 56,
        name: "Statement Necklace",
        price: 39.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description: "Elegant statement necklace to add glamour to any outfit."
    },
    {
        id: 57,
        name: "Wide Leg Pants",
        price: 89.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Comfortable wide leg pants with modern styling and perfect fit."
    },
    {
        id: 58,
        name: "Crop Top",
        price: 34.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description: "Trendy crop top perfect for summer and casual styling."
    },
    {
        id: 59,
        name: "Midi Dress",
        price: 99.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Elegant midi dress with sophisticated design and comfortable fit."
    },
    {
        id: 60,
        name: "Faux Leather Jacket",
        price: 129.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "Stylish faux leather jacket with modern cut and comfortable fit."
    },
    {
        id: 61,
        name: "Ballet Flats",
        price: 69.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        description: "Comfortable ballet flats perfect for daily wear and office use."
    },
    {
        id: 62,
        name: "Wrap Dress",
        price: 109.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Flattering wrap dress with adjustable fit and elegant design."
    },
    {
        id: 63,
        name: "Chiffon Blouse",
        price: 54.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1564257631407-3deb25e9c8e0?w=400&h=300&fit=crop",
        description: "Lightweight chiffon blouse with delicate details and breathable fabric."
    },
    {
        id: 64,
        name: "High Waist Jeans",
        price: 94.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        description: "Trendy high waist jeans with stretch denim and perfect fit."
    },
    {
        id: 65,
        name: "Evening Gown",
        price: 299.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
        description: "Stunning evening gown perfect for special occasions and formal events."
    },
    {
        id: 66,
        name: "Cardigan Sweater",
        price: 74.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
        description: "Soft cardigan sweater perfect for layering and casual comfort."
    },
    {
        id: 67,
        name: "Pleated Skirt",
        price: 44.99,
        category: "womens-clothing",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcu_xe6l5jjG-tB_2oFtiT3Ku3-xJ7Qmu9KtrB0sC1i4CUR1CnSmBA91nXQSmgCK4QBhOzflY1PPhfkFjhQAOAuYdZBqs4aprB3OYPEzmhwZNaz9coPkcEhQ",
        description: "Classic pleated skirt with timeless design and comfortable fit."
    },
    {
        id: 68,
        name: "Trench Coat",
        price: 189.99,
        category: "womens-clothing",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        description: "Classic trench coat with water-resistant material and timeless style."
    },

    // Men's Fashion
    {
        id: 19,
        name: "Classic Suit",
        price: 299.99,
        category: "mens-clothing",
        image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=300&fit=crop",
        description: "Professional suit perfect for business meetings and formal events."
    },
    {
        id: 20,
        name: "Leather Jacket",
        price: 199.99,
        category: "mens-clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description: "Classic leather jacket with modern styling and comfortable fit."
    },
    {
        id: 21,
        name: "Casual Sneakers",
        price: 89.99,
        category: "mens-clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        description: "Comfortable sneakers perfect for daily wear and casual outings."
    },
    {
        id: 22,
        name: "Polo Shirt",
        price: 39.99,
        category: "mens-clothing",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=300&fit=crop",
        description: "Classic polo shirt made from breathable cotton fabric."
    },

    // Kids' Fashion
    {
        id: 23,
        name: "Kids Cartoon T-Shirt",
        price: 19.99,
        category: "kids-clothing",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop",
        description: "Fun and colorful t-shirt with cartoon designs for kids."
    },
    {
        id: 24,
        name: "Children's Winter Jacket",
        price: 59.99,
        category: "kids-clothing",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        description: "Warm and comfortable winter jacket for children."
    },
    {
        id: 25,
        name: "Kids School Uniform",
        price: 49.99,
        category: "kids-clothing",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Comfortable school uniform with proper fit and durable material."
    },

    // Home & Garden
    {
        id: 26,
        name: "Modern Coffee Table",
        price: 299.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
        description: "Elegant coffee table made from sustainable wood with modern design."
    },
    {
        id: 27,
        name: "Smart LED Light Bulb",
        price: 24.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        description: "WiFi-enabled smart bulb with voice control and customizable colors."
    },
    {
        id: 28,
        name: "Kitchen Mixer",
        price: 149.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        description: "Professional kitchen mixer with multiple attachments and powerful motor."
    },
    {
        id: 29,
        name: "Garden Plant Pots",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        description: "Set of 6 ceramic plant pots perfect for indoor and outdoor gardening."
    },
    {
        id: 30,
        name: "Bedroom Lamp",
        price: 79.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        description: "Elegant bedside lamp with adjustable brightness and modern design."
    },
    {
        id: 31,
        name: "Throw Pillows Set",
        price: 44.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop",
        description: "Set of 4 decorative throw pillows for sofa and bed decoration."
    },
    {
        id: 32,
        name: "Wall Clock",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        description: "Modern wall clock with silent movement and elegant design."
    },
    {
        id: 33,
        name: "Cooking Pan Set",
        price: 89.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        description: "Set of 5 non-stick cooking pans with lids and ergonomic handles."
    },

    // Sports & Fitness
    {
        id: 34,
        name: "Professional Yoga Mat",
        price: 49.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        description: "Non-slip yoga mat with perfect thickness for comfort and stability."
    },
    {
        id: 35,
        name: "Adjustable Dumbbells Set",
        price: 149.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        description: "Space-saving adjustable dumbbells with weight range from 5-50 lbs."
    },
    {
        id: 36,
        name: "Running Shoes",
        price: 119.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "Lightweight running shoes with excellent cushioning and support."
    },
    {
        id: 37,
        name: "Fitness Tracker",
        price: 89.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
        description: "Advanced fitness tracker with heart rate monitor and GPS."
    },
    {
        id: 38,
        name: "Basketball",
        price: 39.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
        description: "Official size basketball with excellent grip and durability."
    },
    {
        id: 39,
        name: "Tennis Racket",
        price: 79.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        description: "Professional tennis racket with comfortable grip and optimal weight."
    },

    // Books & Media
    {
        id: 40,
        name: "Bestselling Novel",
        price: 19.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        description: "Latest bestselling novel with captivating storyline and beautiful cover."
    },
    {
        id: 41,
        name: "Educational Textbook",
        price: 49.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Comprehensive textbook covering essential topics for students."
    },
    {
        id: 42,
        name: "Cookbook Collection",
        price: 34.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
        description: "Beautiful cookbook with 100+ delicious recipes and stunning photography."
    },

    // Beauty & Personal Care
    {
        id: 43,
        name: "Skincare Set",
        price: 79.99,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
        description: "Complete skincare set with cleanser, toner, and moisturizer."
    },
    {
        id: 44,
        name: "Hair Dryer Pro",
        price: 89.99,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1522338146-1115d3d6c383?w=400&h=300&fit=crop",
        description: "Professional hair dryer with multiple heat settings and attachments."
    },
    {
        id: 45,
        name: "Makeup Brush Set",
        price: 39.99,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
        description: "Premium makeup brush set with soft bristles and ergonomic handles."
    },

    // Toys & Games
    {
        id: 46,
        name: "Educational Building Blocks",
        price: 29.99,
        category: "toys",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "Creative building blocks that encourage learning and imagination."
    },
    {
        id: 47,
        name: "Board Game Collection",
        price: 44.99,
        category: "toys",
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
        description: "Family-friendly board games perfect for game nights and gatherings."
    },
    {
        id: 48,
        name: "Remote Control Car",
        price: 59.99,
        category: "toys",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "High-speed remote control car with realistic design and controls."
    },

    // Automotive
    {
        id: 49,
        name: "Car Phone Mount",
        price: 19.99,
        category: "automotive",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "Universal car phone mount with secure grip and adjustable angle."
    },
    {
        id: 50,
        name: "Car Vacuum Cleaner",
        price: 34.99,
        category: "automotive",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "Portable car vacuum cleaner with powerful suction and compact design."
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
        initializePage();
    setupEventListeners();
    loadCartFromStorage();
    displayProducts(products);
});

// Initialize page
function initializePage() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        // User is logged in, show user-specific content
        showLoggedInContent();
    } else {
        // User is not logged in, show guest content
        showGuestContent();
    }
}

// Show content for logged in users
function showLoggedInContent() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Update user info in header
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = `${userData.firstName || 'User'} ${userData.lastName || ''}`;
    }
    
    // Show user-specific elements
    const userElements = document.querySelectorAll('.user-only');
    userElements.forEach(element => {
        element.style.display = 'block';
    });
    
    // Hide guest elements
    const guestElements = document.querySelectorAll('.guest-only');
    guestElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Show content for guest users
function showGuestContent() {
    // Show guest-specific elements
    const guestElements = document.querySelectorAll('.guest-only');
    guestElements.forEach(element => {
        element.style.display = 'block';
    });
    
    // Hide user elements
    const userElements = document.querySelectorAll('.user-only');
    userElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Open user page
function openUserPage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        window.location.href = 'user.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart functionality
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            applyFilters();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCartModal();
        }
    });
}

// Display products
function displayProducts(productsToShow) {
    if (!productsGrid) return;
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>No Products Available</h3>
                <p>We're currently updating our inventory. Please check back later!</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

// Create product card
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="buy-now-btn" onclick="buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
}



// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Product added to cart!', 'success');
}

// Buy now function
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    // Create a single item cart for immediate purchase
    const singleItemCart = [{
        ...product,
        quantity: 1
    }];
    
    // Show payment modal directly for buy now
    showBuyNowPaymentModal(singleItemCart);
}

// Show payment modal for buy now
function showBuyNowPaymentModal(buyNowCart) {
    currentBuyNowCart = buyNowCart; // Set current buy now cart
    createPaymentModal();
    updateBuyNowPaymentDisplay(buyNowCart);
    document.getElementById('paymentModal').style.display = 'block';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    currentBuyNowCart = null; // Clear buy now cart for regular checkout
    showPaymentModal();
}

// Update payment display for buy now
function updateBuyNowPaymentDisplay(buyNowCart) {
    const orderItems = document.getElementById('paymentOrderItems');
    const paymentTotal = document.getElementById('paymentTotal');
    
    if (!orderItems || !paymentTotal) return;
    
    const total = buyNowCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderItems.innerHTML = buyNowCart.map(item => `
        <div class="payment-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    paymentTotal.textContent = `$${total.toFixed(2)}`;
}















// Show payment modal
function showPaymentModal() {
    createPaymentModal();
    updatePaymentDisplay();
    document.getElementById('paymentModal').style.display = 'block';
}

// Create payment modal
function createPaymentModal() {
    if (document.getElementById('paymentModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'paymentModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content payment-modal">
            <div class="modal-header">
                <h3><i class="fas fa-credit-card"></i> Payment</h3>
                <span class="close" onclick="closePaymentModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="payment-container">
                    <div class="order-summary">
                        <h4>Order Summary</h4>
                        <div id="paymentOrderItems"></div>
                        <div class="payment-total">
                            <span>Total:</span>
                            <span id="paymentTotal">$0.00</span>
                        </div>
                    </div>
                    
                    <div class="payment-methods">
                        <h4>Select Payment Method</h4>
                        <div class="payment-options">
                            <div class="payment-option" data-method="card">
                                <input type="radio" name="paymentMethod" id="card" value="card" checked>
                                <label for="card">
                                    <i class="fas fa-credit-card"></i>
                                    Credit/Debit Card
                                </label>
                            </div>
                            <div class="payment-option" data-method="upi">
                                <input type="radio" name="paymentMethod" id="upi" value="upi">
                                <label for="upi">
                                    <i class="fas fa-mobile-alt"></i>
                                    UPI
                                </label>
                            </div>
                            <div class="payment-option" data-method="cod">
                                <input type="radio" name="paymentMethod" id="cod" value="cod">
                                <label for="cod">
                                    <i class="fas fa-money-bill-wave"></i>
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-form" id="cardForm">
                        <h4>Card Details</h4>
                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="3">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="cardName">Cardholder Name</label>
                            <input type="text" id="cardName" placeholder="John Doe">
                        </div>
                    </div>
                    
                    <div class="payment-form" id="upiForm" style="display: none;">
                        <h4><i class="fas fa-mobile-alt"></i> UPI Payment</h4>
                        
                        <div class="upi-methods">
                            <h5>Choose UPI App</h5>
                            <div class="upi-apps">
                                <div class="upi-app" data-app="gpay">
                                    <input type="radio" name="upiApp" id="gpay" value="gpay" checked>
                                    <label for="gpay">
                                        <i class="fab fa-google-pay"></i>
                                        <span>Google Pay</span>
                                    </label>
                                </div>
                                <div class="upi-app" data-app="phonepe">
                                    <input type="radio" name="upiApp" id="phonepe" value="phonepe">
                                    <label for="phonepe">
                                        <i class="fas fa-mobile-alt"></i>
                                        <span>PhonePe</span>
                                    </label>
                                </div>
                                <div class="upi-app" data-app="paytm">
                                    <input type="radio" name="upiApp" id="paytm" value="paytm">
                                    <label for="paytm">
                                        <i class="fas fa-wallet"></i>
                                        <span>Paytm</span>
                                    </label>
                                </div>
                                <div class="upi-app" data-app="amazonpay">
                                    <input type="radio" name="upiApp" id="amazonpay" value="amazonpay">
                                    <label for="amazonpay">
                                        <i class="fab fa-amazon"></i>
                                        <span>Amazon Pay</span>
                                    </label>
                                </div>
                                <div class="upi-app" data-app="bhim">
                                    <input type="radio" name="upiApp" id="bhim" value="bhim">
                                    <label for="bhim">
                                        <i class="fas fa-university"></i>
                                        <span>BHIM</span>
                                    </label>
                                </div>
                                <div class="upi-app" data-app="other">
                                    <input type="radio" name="upiApp" id="other" value="other">
                                    <label for="other">
                                        <i class="fas fa-ellipsis-h"></i>
                                        <span>Other UPI Apps</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="upi-details">
                            <div class="form-group">
                                <label for="upiId">UPI ID</label>
                                <input type="text" id="upiId" placeholder="username@upi" required>
                                <small class="form-help">Enter your UPI ID (e.g., username@upi, mobilenumber@bank)</small>
                            </div>
                            
                            <div class="form-group">
                                <label for="upiName">Full Name</label>
                                <input type="text" id="upiName" placeholder="Enter your full name" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="upiMobile">Mobile Number</label>
                                <input type="tel" id="upiMobile" placeholder="Enter your mobile number" maxlength="10" required>
                            </div>
                        </div>
                        
                        <div class="upi-info">
                            <div class="upi-benefits">
                                <h6><i class="fas fa-info-circle"></i> UPI Benefits:</h6>
                                <ul>
                                    <li>Instant payment processing</li>
                                    <li>No additional charges</li>
                                    <li>Secure and encrypted</li>
                                    <li>24/7 availability</li>
                                    <li>Works with all UPI apps</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="upi-instructions">
                            <h6><i class="fas fa-lightbulb"></i> How to Pay:</h6>
                            <ol>
                                <li>Enter your UPI ID and details</li>
                                <li>Click "Pay with UPI"</li>
                                <li>Complete payment in your UPI app</li>
                                <li>Payment will be processed instantly</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="payment-form" id="codForm" style="display: none;">
                        <h4><i class="fas fa-truck"></i> Cash on Delivery Details</h4>
                        
                        <div class="cod-info">
                            <div class="cod-benefits">
                                <h5><i class="fas fa-check-circle"></i> COD Benefits:</h5>
                                <ul>
                                    <li>Pay only when you receive your order</li>
                                    <li>No advance payment required</li>
                                    <li>Secure and convenient</li>
                                    <li>Available for orders up to ₹10,000</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="customerName">Full Name *</label>
                            <input type="text" id="customerName" placeholder="Enter your full name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="phoneNumber">Phone Number *</label>
                            <input type="tel" id="phoneNumber" placeholder="+91 98765 43210" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="deliveryAddress">Complete Delivery Address *</label>
                            <textarea id="deliveryAddress" placeholder="House/Flat No., Street, Area, Landmark" rows="3" required></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="city">City *</label>
                                <input type="text" id="city" placeholder="Enter your city" required>
                            </div>
                            <div class="form-group">
                                <label for="pincode">Pincode *</label>
                                <input type="text" id="pincode" placeholder="123456" maxlength="6" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="state">State *</label>
                            <select id="state" required>
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="landmark">Landmark (Optional)</label>
                            <input type="text" id="landmark" placeholder="Near hospital, school, etc.">
                        </div>
                        
                        <div class="form-group">
                            <label for="deliveryInstructions">Delivery Instructions (Optional)</label>
                            <textarea id="deliveryInstructions" placeholder="Any special instructions for delivery" rows="2"></textarea>
                        </div>
                        
                        <div class="cod-terms">
                            <div class="form-group">
                                <input type="checkbox" id="codTerms" required>
                                <label for="codTerms" class="checkbox-label">
                                    I agree to pay the full amount in cash when the order is delivered
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-actions">
                        <button onclick="processPayment()" class="pay-btn">
                            <i class="fas fa-lock"></i> Pay Now
                        </button>
                        <button onclick="downloadInvoiceFromPayment()" class="invoice-btn">
                            <i class="fas fa-download"></i> Download Invoice
                        </button>
                        <button onclick="closePaymentModal()" class="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for payment method selection
    setTimeout(() => {
        const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                showPaymentForm(this.value);
            });
        });
        
        // Add input formatting for card number
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s/g, '');
                value = value.replace(/\D/g, '');
                value = value.replace(/(\d{4})/g, '$1 ').trim();
                e.target.value = value;
            });
        }
        
        // Add input formatting for expiry date
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
    }, 100);
}

// Show payment form based on selected method
function showPaymentForm(method) {
    const forms = ['cardForm', 'upiForm', 'codForm'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = formId === method + 'Form' ? 'block' : 'none';
        }
    });
}

// Update payment display
function updatePaymentDisplay() {
    const orderItems = document.getElementById('paymentOrderItems');
    const paymentTotal = document.getElementById('paymentTotal');
    
    if (!orderItems || !paymentTotal) return;
    
    const itemsToShow = currentBuyNowCart || cart;
    const total = itemsToShow.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderItems.innerHTML = itemsToShow.map(item => `
        <div class="payment-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    paymentTotal.textContent = `$${total.toFixed(2)}`;
}

// Process payment
function processPayment() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validate form based on payment method
    if (!validatePaymentForm(selectedMethod)) {
        return;
    }
    
    // Show processing animation
    const payBtn = document.querySelector('.pay-btn');
    const originalText = payBtn.innerHTML;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Simulate successful payment
        showNotification('Payment successful! Order placed successfully!', 'success');
        
        // Generate bill after successful payment
        const itemsToBill = currentBuyNowCart || cart;
        generateAndShowBill(itemsToBill);
        
        // Handle different scenarios
        if (currentBuyNowCart) {
            // Buy now scenario - just close payment modal
            currentBuyNowCart = null;
            closePaymentModal();
        } else {
            // Cart checkout scenario - clear cart and close modals
            cart = [];
            updateCartDisplay();
            updateCartItemsDisplay();
            saveCartToStorage();
            closePaymentModal();
            closeCartModal();
        }
        
        // Reset button
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
    }, 2000);
}

// Validate payment form
function validatePaymentForm(method) {
    if (method === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || cardNumber.length < 16) {
            showNotification('Please enter a valid card number', 'error');
            return false;
        }
        if (!expiryDate || expiryDate.length < 5) {
            showNotification('Please enter a valid expiry date', 'error');
            return false;
        }
        if (!cvv || cvv.length < 3) {
            showNotification('Please enter a valid CVV', 'error');
            return false;
        }
        if (!cardName.trim()) {
            showNotification('Please enter cardholder name', 'error');
            return false;
        }
    } else if (method === 'upi') {
        const upiId = document.getElementById('upiId').value;
        const upiName = document.getElementById('upiName').value;
        const upiMobile = document.getElementById('upiMobile').value;
        const selectedApp = document.querySelector('input[name="upiApp"]:checked');
        
        if (!selectedApp) {
            showNotification('Please select a UPI app', 'error');
            return false;
        }
        
        if (!upiId || !upiId.includes('@')) {
            showNotification('Please enter a valid UPI ID (e.g., username@upi)', 'error');
            return false;
        }
        
        if (!upiName || upiName.trim().length < 2) {
            showNotification('Please enter your full name', 'error');
            return false;
        }
        
        if (!upiMobile || upiMobile.length !== 10 || !/^\d{10}$/.test(upiMobile)) {
            showNotification('Please enter a valid 10-digit mobile number', 'error');
            return false;
        }
    } else if (method === 'cod') {
        const customerName = document.getElementById('customerName').value;
        const phone = document.getElementById('phoneNumber').value;
        const address = document.getElementById('deliveryAddress').value;
        const city = document.getElementById('city').value;
        const pincode = document.getElementById('pincode').value;
        const state = document.getElementById('state').value;
        const codTerms = document.getElementById('codTerms').checked;
        
        if (!customerName.trim()) {
            showNotification('Please enter your full name', 'error');
            return false;
        }
        if (!phone.trim()) {
            showNotification('Please enter phone number', 'error');
            return false;
        }
        if (!address.trim()) {
            showNotification('Please enter delivery address', 'error');
            return false;
        }
        if (!city.trim()) {
            showNotification('Please enter city', 'error');
            return false;
        }
        if (!pincode.trim() || pincode.length !== 6) {
            showNotification('Please enter a valid 6-digit pincode', 'error');
            return false;
        }
        if (!state) {
            showNotification('Please select your state', 'error');
            return false;
        }
        if (!codTerms) {
            showNotification('Please agree to the COD terms', 'error');
            return false;
        }
    }
    
    return true;
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Clear buy now cart when modal is closed
    currentBuyNowCart = null;
}

// Download invoice from payment modal
function downloadInvoiceFromPayment() {
    const itemsToInvoice = currentBuyNowCart || cart;
    
    if (!itemsToInvoice || itemsToInvoice.length === 0) {
        showNotification('No items to generate invoice for', 'error');
        return;
    }
    
    // Generate temporary bill data for download
    const billNumber = generateBillNumber();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const total = itemsToInvoice.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const tempBill = {
        billNumber: billNumber,
        date: currentDate,
        time: currentTime,
        items: itemsToInvoice,
        total: total,
        paymentMethod: 'Pending Payment'
    };
    
    // Temporarily set currentBill for download
    const originalBill = currentBill;
    currentBill = tempBill;
    
    // Download the invoice
    downloadBill();
    
    // Restore original bill
    currentBill = originalBill;
    
    showNotification('Invoice downloaded successfully!', 'success');
}

// Bill generation functions
let currentBill = null;
let billCounter = 1;
let billModal = null;

function generateAndShowBill(items) {
    const billNumber = generateBillNumber();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    currentBill = {
        billNumber: billNumber,
        date: currentDate,
        time: currentTime,
        items: items,
        total: total,
        paymentMethod: getSelectedPaymentMethod()
    };
    
    showBillModal();
}

function generateBillNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const counter = String(billCounter++).padStart(4, '0');
    return `BILL-${year}${month}${day}-${counter}`;
}

function getSelectedPaymentMethod() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (selectedMethod) {
        const method = selectedMethod.value;
        switch(method) {
            case 'card': return 'Credit/Debit Card';
            case 'upi': {
                const selectedApp = document.querySelector('input[name="upiApp"]:checked');
                if (selectedApp) {
                    const appName = selectedApp.value;
                    const appNames = {
                        'gpay': 'Google Pay',
                        'phonepe': 'PhonePe',
                        'paytm': 'Paytm',
                        'amazonpay': 'Amazon Pay',
                        'bhim': 'BHIM',
                        'other': 'UPI App'
                    };
                    return `UPI Payment (${appNames[appName] || 'UPI App'})`;
                }
                return 'UPI Payment';
            }
            case 'cod': return 'Cash on Delivery';
            default: return 'Payment';
        }
    }
    return 'Payment';
}

function showBillModal() {
    if (!billModal) {
        createBillModal();
    }
    billModal.style.display = 'block';
    updateBillDisplay();
}

function createBillModal() {
    const modal = document.createElement('div');
    modal.id = 'billModal';
    modal.className = 'modal bill-modal';
    
    modal.innerHTML = `
        <div class="modal-content bill-content">
            <div class="modal-header bill-header">
                <h2><i class="fas fa-receipt"></i> Order Bill</h2>
                <span class="close" onclick="closeBillModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div id="billContent" class="bill-content-body">
                    <!-- Bill content will be generated here -->
                </div>
                <div class="bill-actions">
                    <button onclick="printBill()" class="print-btn">
                        <i class="fas fa-print"></i> Print Bill
                    </button>
                    <button onclick="downloadBill()" class="download-btn">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                    <button onclick="closeBillModal()" class="close-bill-btn">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    billModal = modal;
}

function updateBillDisplay() {
    if (!currentBill || !billModal) return;
    
    const billContent = document.getElementById('billContent');
    if (!billContent) return;
    
    billContent.innerHTML = `
        <div class="bill-header-info">
            <div class="bill-company">
                <h3>ShopEasy</h3>
                <p>Your trusted online shopping destination</p>
                <p>Email: info@shopeasy.com | Phone: (555) 123-4567</p>
            </div>
            <div class="bill-details">
                <h4>Bill Details</h4>
                <p><strong>Bill No:</strong> ${currentBill.billNumber}</p>
                <p><strong>Date:</strong> ${currentBill.date}</p>
                <p><strong>Time:</strong> ${currentBill.time}</p>
                <p><strong>Payment Method:</strong> ${currentBill.paymentMethod}</p>
            </div>
        </div>
        
        <div class="bill-items">
            <h4>Order Items</h4>
            <table class="bill-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentBill.items.map(item => `
                        <tr>
                            <td>
                                <div class="bill-item-info">
                                    <img src="${item.image}" alt="${item.name}" class="bill-item-image">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="bill-summary">
            <div class="bill-total">
                <h4>Total Amount: $${currentBill.total.toFixed(2)}</h4>
            </div>
            <div class="bill-footer">
                <p>Thank you for shopping with ShopEasy!</p>
                <p>For any queries, contact us at support@shopeasy.com</p>
            </div>
        </div>
    `;
}

function printBill() {
    const printContent = generatePrintContent();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function generatePrintContent() {
    if (!currentBill) return '';
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>ShopEasy Bill - ${currentBill.billNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .bill-header { text-align: center; margin-bottom: 30px; }
                .bill-details { margin-bottom: 20px; }
                .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .bill-table th { background-color: #f8f9fa; }
                .bill-total { text-align: right; font-size: 18px; font-weight: bold; margin: 20px 0; }
                .bill-footer { text-align: center; margin-top: 30px; color: #666; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="bill-header">
                <h2>ShopEasy</h2>
                <p>Your trusted online shopping destination</p>
            </div>
            
            <div class="bill-details">
                <p><strong>Bill No:</strong> ${currentBill.billNumber}</p>
                <p><strong>Date:</strong> ${currentBill.date}</p>
                <p><strong>Time:</strong> ${currentBill.time}</p>
                <p><strong>Payment Method:</strong> ${currentBill.paymentMethod}</p>
            </div>
            
            <table class="bill-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentBill.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="bill-total">
                <h3>Total Amount: $${currentBill.total.toFixed(2)}</h3>
            </div>
            
            <div class="bill-footer">
                <p>Thank you for shopping with ShopEasy!</p>
                <p>For any queries, contact us at support@shopeasy.com</p>
            </div>
        </body>
        </html>
    `;
}

function downloadBill() {
    const content = generateDownloadContent();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ShopEasy_Bill_${currentBill.billNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateDownloadContent() {
    if (!currentBill) return '';
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>ShopEasy Bill - ${currentBill.billNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: white; }
                .bill-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 20px; }
                .bill-details { margin-bottom: 20px; display: flex; justify-content: space-between; }
                .bill-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                .bill-table th { background-color: #f8f9fa; font-weight: bold; }
                .bill-total { text-align: right; font-size: 20px; font-weight: bold; margin: 20px 0; color: #007bff; }
                .bill-footer { text-align: center; margin-top: 30px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
                .bill-item-info { display: flex; align-items: center; gap: 10px; }
                .bill-item-image { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="bill-header">
                <h2 style="color: #007bff; margin: 0;">ShopEasy</h2>
                <p style="margin: 5px 0;">Your trusted online shopping destination</p>
                <p style="margin: 5px 0; font-size: 14px;">Email: info@shopeasy.com | Phone: (555) 123-4567</p>
            </div>
            
            <div class="bill-details">
                <div>
                    <p><strong>Bill No:</strong> ${currentBill.billNumber}</p>
                    <p><strong>Date:</strong> ${currentBill.date}</p>
                </div>
                <div>
                    <p><strong>Time:</strong> ${currentBill.time}</p>
                    <p><strong>Payment Method:</strong> ${currentBill.paymentMethod}</p>
                </div>
            </div>
            
            <table class="bill-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentBill.items.map(item => `
                        <tr>
                            <td>
                                <div class="bill-item-info">
                                    <img src="${item.image}" alt="${item.name}" class="bill-item-image">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="bill-total">
                <h3>Total Amount: $${currentBill.total.toFixed(2)}</h3>
            </div>
            
            <div class="bill-footer">
                <p>Thank you for shopping with ShopEasy!</p>
                <p>For any queries, contact us at support@shopeasy.com</p>
            </div>
        </body>
        </html>
    `;
}

function closeBillModal() {
    if (billModal) {
        billModal.style.display = 'none';
    }
    currentBill = null;
}



// Update cart display
function updateCartDisplay() {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Open cart modal
function openCartModal() {
    if (!cartModal) return;
    
    updateCartItemsDisplay();
    cartModal.style.display = 'block';
}

// Update cart items display
function updateCartItemsDisplay() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartItemsDisplay();
            saveCartToStorage();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartItemsDisplay();
    saveCartToStorage();
    showNotification('Item removed from cart!', 'success');
}

// Close cart modal
function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Search functionality
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    displayProducts(filteredProducts);
}

// Apply filters
function applyFilters() {
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Apply sorting
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayProducts(filteredProducts);
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
} 