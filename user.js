// Global variables
let userData = null;
let currentTab = 'dashboard';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUserPage();
    setupEventListeners();
});

// Initialize user page
function initializeUserPage() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Load initial content
    loadDashboardContent();
    
    // Setup forms
    setupForms();
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const addAddressModal = document.getElementById('addAddressModal');
        if (event.target === addAddressModal) {
            closeAddAddressModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAddAddressModal();
        }
    });
}

// Load user data from localStorage
function loadUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        userData = JSON.parse(storedData);
        updateUserInterface();
    } else {
        // Create default user data if none exists
        userData = {
            userId: 'USR-2024-001',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@shopeasy.com',
            username: 'demouser',
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
            memberSince: 'January 2024',
            totalOrders: 12,
            totalSpent: 2450,
            loyalty: {
                tier: "Gold",
                points: 1250,
                nextTier: "Platinum",
                pointsNeeded: 750
            },
            profileCompletion: 85,
            addresses: [
                {
                    id: 1,
                    type: 'Home',
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    country: 'US',
                    isDefault: true
                }
            ],
            preferences: {
                emailNotifications: true,
                smsNotifications: false,
                marketingNotifications: false
            }
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}

// Update user interface with loaded data
function updateUserInterface() {
    if (!userData) return;
    
    // Update header avatar
    const headerAvatar = document.getElementById('headerAvatar');
    if (headerAvatar) {
        headerAvatar.src = userData.avatar;
    }
    
    // Update user hero section
    const userAvatarLarge = document.getElementById('userAvatarLarge');
    if (userAvatarLarge) {
        userAvatarLarge.src = userData.avatar;
    }
    
    // Update user name and email in the main user details section
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    
    const userEmail = document.getElementById('userEmail');
    if (userEmail) {
        userEmail.textContent = userData.email;
    }
    
    // Update stats
    const totalOrders = document.getElementById('totalOrders');
    if (totalOrders) {
        totalOrders.textContent = userData.totalOrders;
    }
    
    const totalSpent = document.getElementById('totalSpent');
    if (totalSpent) {
        totalSpent.textContent = `$${userData.totalSpent.toLocaleString()}`;
    }
    
    const memberSince = document.getElementById('memberSince');
    if (memberSince) {
        memberSince.textContent = userData.memberSince;
    }
    
    // Update summary stats
    const summaryOrders = document.getElementById('summaryOrders');
    if (summaryOrders) {
        summaryOrders.textContent = `${userData.totalOrders} orders`;
    }
    
    const summarySpent = document.getElementById('summarySpent');
    if (summarySpent) {
        summarySpent.textContent = `$${userData.totalSpent.toLocaleString()}`;
    }
    
    // Update settings form
    updateSettingsForm();
}

// Update settings form with user data
function updateSettingsForm() {
    if (!userData) return;
    
    const settingsFirstName = document.getElementById('settingsFirstName');
    const settingsLastName = document.getElementById('settingsLastName');
    const settingsEmail = document.getElementById('settingsEmail');
    const settingsPhone = document.getElementById('settingsPhone');
    const settingsUserId = document.getElementById('settingsUserId');
    
    if (settingsFirstName) settingsFirstName.value = userData.firstName;
    if (settingsLastName) settingsLastName.value = userData.lastName;
    if (settingsEmail) settingsEmail.value = userData.email;
    if (settingsPhone) settingsPhone.value = userData.phone || '';
    if (settingsUserId) settingsUserId.value = userData.userId;
    
    // Update notification preferences
    const emailNotifications = document.getElementById('emailNotifications');
    const smsNotifications = document.getElementById('smsNotifications');
    const marketingNotifications = document.getElementById('marketingNotifications');
    
    if (emailNotifications) emailNotifications.checked = userData.preferences.emailNotifications;
    if (smsNotifications) smsNotifications.checked = userData.preferences.smsNotifications;
    if (marketingNotifications) marketingNotifications.checked = userData.preferences.marketingNotifications;
}

// Setup forms
function setupForms() {
    // Account form
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', handleAccountUpdate);
    }
    

}

// Switch tab function
function switchTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to selected tab
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Load content based on tab
    switch (tabName) {
        case 'dashboard':
            loadDashboardContent();
            break;
        case 'orders':
            loadOrdersContent();
            break;
        case 'wishlist':
            loadWishlistContent();
            break;
        case 'addresses':
            loadAddressesContent();
            break;
    }
}

// Load dashboard content
function loadDashboardContent() {
    // Dashboard content is already loaded in HTML
    // You can add dynamic content loading here if needed
}

// Load recent orders
function loadRecentOrders() {
    const ordersList = document.getElementById('recentOrdersList');
    if (!ordersList) return;
    
    const recentOrders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 299.99,
            items: ['Wireless Headphones', 'Smart Watch']
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 149.99,
            items: ['T-Shirt', 'Jeans']
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Processing',
            total: 89.99,
            items: ['Yoga Mat']
        }
    ];
    
    const ordersHTML = recentOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <h4>${order.id}</h4>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <p class="order-date">${order.date}</p>
            <p class="order-items">${order.items.join(', ')}</p>
            <p class="order-total">$${order.total}</p>
        </div>
    `).join('');
    
    ordersList.innerHTML = ordersHTML;
}

// Load activity feed
function loadActivityFeed() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [
        {
            type: 'order',
            message: 'Order ORD-001 delivered successfully',
            time: '2 hours ago'
        },
        {
            type: 'login',
            message: 'Logged in from new device',
            time: '1 day ago'
        },
        {
            type: 'profile',
            message: 'Updated profile information',
            time: '3 days ago'
        }
    ];
    
    const activityHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.type === 'order' ? 'shopping-bag' : activity.type === 'login' ? 'sign-in-alt' : 'user-edit'}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
    
    activityList.innerHTML = activityHTML;
}

// Load orders content
function loadOrdersContent() {
    const ordersSection = document.getElementById('ordersSection');
    if (!ordersSection) return;
    
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 299.99,
            items: ['Wireless Headphones', 'Smart Watch']
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 149.99,
            items: ['T-Shirt', 'Jeans']
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Processing',
            total: 89.99,
            items: ['Yoga Mat']
        }
    ];
    
    const ordersHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <h4>${order.id}</h4>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Items:</strong> ${order.items.join(', ')}</p>
                <p><strong>Total:</strong> $${order.total}</p>
            </div>
            <div class="order-actions">
                <button class="btn btn-primary" onclick="viewOrderDetails('${order.id}')">View Details</button>
                <button class="btn btn-secondary" onclick="trackOrder('${order.id}')">Track Order</button>
            </div>
        </div>
    `).join('');
    
    ordersSection.innerHTML = ordersHTML;
}

// Load wishlist content
function loadWishlistContent() {
    const wishlistSection = document.getElementById('wishlistSection');
    if (!wishlistSection) return;
    
    const wishlistItems = [
        {
            id: 1,
            name: 'Wireless Earbuds',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
        }
    ];
    
    const wishlistHTML = wishlistItems.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <p class="price">$${item.price}</p>
                <div class="wishlist-actions">
                    <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                    <button class="btn btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    wishlistSection.innerHTML = wishlistHTML;
}

// Load addresses content
function loadAddressesContent() {
    const addressesSection = document.getElementById('addressesSection');
    if (!addressesSection) return;
    
    const addresses = userData.addresses || [];
    
    const addressesHTML = addresses.map(address => `
        <div class="address-card">
            <div class="address-header">
                <h4>${address.type}</h4>
                ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <div class="address-details">
                <p>${address.street}</p>
                <p>${address.city}, ${address.state} ${address.zipCode}</p>
                <p>${address.country}</p>
            </div>
            <div class="address-actions">
                <button class="btn btn-primary" onclick="editAddress(${address.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteAddress(${address.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    addressesSection.innerHTML = addressesHTML;
}

// Handle account update
function handleAccountUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Update user data
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.email = email;
    userData.phone = phone;
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update interface
    updateUserInterface();
    
    showToast('Profile updated successfully!', 'success');
}



// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="toast-icon fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Avatar and profile functions
function toggleAvatarMenu() {
    const dropdown = document.getElementById('avatarDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function editProfile() {
    switchTab('settings');
    showToast('Edit profile section opened', 'info');
}

function changeAvatar() {
    // Create file input for avatar upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newAvatar = e.target.result;
                userData.avatar = newAvatar;
                localStorage.setItem('userData', JSON.stringify(userData));
                updateUserInterface();
                showToast('Avatar updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Tab switching and content loading functions
function switchTab(tabName) {
    // Remove active class from all tabs and panels
    const tabs = document.querySelectorAll('.nav-tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to selected tab and panel
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedPanel = document.getElementById(tabName);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedPanel) selectedPanel.classList.add('active');
    
    // Load content based on tab
    switch (tabName) {
        case 'dashboard':
            loadDashboardContent();
            break;
        case 'orders':
            loadOrdersContent();
            break;
        case 'wishlist':
            loadWishlistContent();
            break;
        case 'addresses':
            loadAddressesContent();
            break;
        case 'settings':
            loadSettingsContent();
            break;
    }
}

// Load dashboard content
function loadDashboardContent() {
    loadRecentOrders();
    loadActivityFeed();
}

// Load recent orders
function loadRecentOrders() {
    const recentOrders = document.getElementById('recentOrders');
    if (!recentOrders) return;
    
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 299.99,
            items: ['Wireless Headphones', 'Smart Watch']
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 149.99,
            items: ['T-Shirt', 'Jeans']
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Processing',
            total: 89.99,
            items: ['Yoga Mat']
        }
    ];
    
    const ordersHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <h4>${order.id}</h4>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <p class="order-date">${order.date}</p>
            <p class="order-items">${order.items.join(', ')}</p>
            <p class="order-total">$${order.total}</p>
        </div>
    `).join('');
    
    recentOrders.innerHTML = ordersHTML;
}

// Load activity feed
function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    const activities = [
        {
            type: 'order',
            message: 'Order ORD-001 delivered successfully',
            time: '2 hours ago'
        },
        {
            type: 'login',
            message: 'Logged in from new device',
            time: '1 day ago'
        },
        {
            type: 'profile',
            message: 'Updated profile information',
            time: '3 days ago'
        }
    ];
    
    const activityHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.type === 'order' ? 'shopping-bag' : activity.type === 'login' ? 'sign-in-alt' : 'user-edit'}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
    
    activityFeed.innerHTML = activityHTML;
}

// Load orders content
function loadOrdersContent() {
    const ordersGrid = document.getElementById('ordersGrid');
    if (!ordersGrid) return;
    
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 299.99,
            items: ['Wireless Headphones', 'Smart Watch']
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 149.99,
            items: ['T-Shirt', 'Jeans']
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Processing',
            total: 89.99,
            items: ['Yoga Mat']
        }
    ];
    
    const ordersHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <h4>${order.id}</h4>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Items:</strong> ${order.items.join(', ')}</p>
                <p><strong>Total:</strong> $${order.total}</p>
            </div>
            <div class="order-actions">
                <button class="btn btn-primary" onclick="viewOrderDetails('${order.id}')">View Details</button>
                <button class="btn btn-secondary" onclick="trackOrder('${order.id}')">Track Order</button>
            </div>
        </div>
    `).join('');
    
    ordersGrid.innerHTML = ordersHTML;
}

// Load wishlist content
function loadWishlistContent() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    if (!wishlistGrid) return;
    
    const wishlistItems = [
        {
            id: 1,
            name: 'Wireless Earbuds',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
        }
    ];
    
    const wishlistHTML = wishlistItems.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <p class="price">$${item.price}</p>
                <div class="wishlist-actions">
                    <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                    <button class="btn btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    wishlistGrid.innerHTML = wishlistHTML;
}

// Load addresses content
function loadAddressesContent() {
    const addressesGrid = document.getElementById('addressesGrid');
    if (!addressesGrid) return;
    
    const addresses = userData.addresses || [];
    
    const addressesHTML = addresses.map(address => `
        <div class="address-card">
            <div class="address-header">
                <h4>${address.type}</h4>
                ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <div class="address-details">
                <p>${address.street}</p>
                <p>${address.city}, ${address.state} ${address.zipCode}</p>
                <p>${address.country}</p>
            </div>
            <div class="address-actions">
                <button class="btn btn-primary" onclick="editAddress(${address.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteAddress(${address.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    addressesGrid.innerHTML = addressesHTML;
}

// Load settings content
function loadSettingsContent() {
    // Settings content is already loaded in HTML
    updateSettingsForm();
}

// Address management functions
function openAddAddressModal() {
    const modal = document.getElementById('addAddressModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeAddAddressModal() {
    const modal = document.getElementById('addAddressModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const form = document.getElementById('addAddressForm');
        if (form) {
            form.reset();
        }
    }
}

// Add address form handler
function setupAddressForm() {
    const addAddressForm = document.getElementById('addAddressForm');
    if (addAddressForm) {
        addAddressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const newAddress = {
                id: Date.now(),
                type: formData.get('type'),
                street: formData.get('street'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipCode: formData.get('zipCode'),
                country: formData.get('country'),
                isDefault: formData.get('isDefault') === 'on'
            };
            
            // Add to user data
            if (!userData.addresses) {
                userData.addresses = [];
            }
            userData.addresses.push(newAddress);
            
            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Close modal and reload addresses
            closeAddAddressModal();
            loadAddressesContent();
            showToast('Address added successfully!', 'success');
        });
    }
}

// Order management functions
function viewOrderDetails(orderId) {
    showToast(`Viewing details for order ${orderId}`, 'info');
}

function trackOrder(orderId) {
    showToast(`Tracking order ${orderId}`, 'info');
}

function filterOrders() {
    const filter = document.getElementById('orderFilter').value;
    showToast(`Filtering orders by: ${filter}`, 'info');
}

// Wishlist management functions
function addToCart(productId) {
    showToast('Product added to cart!', 'success');
}

function removeFromWishlist(productId) {
    showToast('Product removed from wishlist!', 'success');
}

function clearWishlist() {
    if (confirm('Are you sure you want to clear your wishlist?')) {
        showToast('Wishlist cleared!', 'success');
    }
}

// Address management functions
function editAddress(addressId) {
    showToast(`Editing address ${addressId}`, 'info');
}

function deleteAddress(addressId) {
    if (confirm('Are you sure you want to delete this address?')) {
        userData.addresses = userData.addresses.filter(addr => addr.id !== addressId);
        localStorage.setItem('userData', JSON.stringify(userData));
        loadAddressesContent();
        showToast('Address deleted successfully!', 'success');
    }
}

// Settings functions
function copyUserId() {
    const userId = document.getElementById('settingsUserId');
    if (userId) {
        navigator.clipboard.writeText(userId.value).then(() => {
            showToast('User ID copied to clipboard!', 'success');
        });
    }
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize additional event listeners
document.addEventListener('DOMContentLoaded', function() {
    setupAddressForm();
    setupCountrySearch();
    
    // Close avatar dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('avatarDropdown');
        if (dropdown && !e.target.closest('.user-avatar')) {
            dropdown.classList.remove('show');
        }
    });
});

// Setup country search functionality
function setupCountrySearch() {
    const countrySearch = document.getElementById('countrySearch');
    const countrySelect = document.getElementById('addressCountry');
    
    if (countrySearch && countrySelect) {
        countrySearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const options = countrySelect.querySelectorAll('option');
            
            options.forEach(option => {
                const countryName = option.textContent.toLowerCase();
                if (countryName.includes(searchTerm) || option.value === '') {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
            
            // If search is empty, show all options
            if (searchTerm === '') {
                options.forEach(option => {
                    option.style.display = '';
                });
            }
        });
        
        // Clear search when modal is closed
        countrySearch.addEventListener('blur', function() {
            setTimeout(() => {
                countrySearch.value = '';
                const options = countrySelect.querySelectorAll('option');
                options.forEach(option => {
                    option.style.display = '';
                });
            }, 200);
        });
    }
} 