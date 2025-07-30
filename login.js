// Global variables
let currentUser = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
    setupEventListeners();
});

// Initialize login page
function initializeLoginPage() {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        // Redirect to user dashboard if already logged in
        window.location.href = 'user.html';
        return;
    }
    
    // Show login form by default
    showLoginForm();
}

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const signupModal = document.getElementById('signupModal');
        
        if (event.target === signupModal) {
            closeSignupModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSignupModal();
            closeForgotPasswordModal();
            closeOtpModal();
            closeNewPasswordModal();
        }
    });
    
    // Forgot password form submissions
    const emailResetForm = document.getElementById('emailResetForm');
    if (emailResetForm) {
        emailResetForm.addEventListener('submit', handleEmailReset);
    }
    
    const mobileResetForm = document.getElementById('mobileResetForm');
    if (mobileResetForm) {
        mobileResetForm.addEventListener('submit', handleMobileReset);
    }
    
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', handleOtpVerification);
    }
    
    const newPasswordForm = document.getElementById('newPasswordForm');
    if (newPasswordForm) {
        newPasswordForm.addEventListener('submit', handleNewPassword);
    }
    
    // OTP input handling
    setupOtpInputs();
    
    // Password strength checker
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Simulate login process
    showNotification('Logging in...', 'info');
    
    // Simulate API call delay
    setTimeout(() => {
        // For demo purposes, accept any email/password combination
        // In a real app, you would validate against a backend
        if (email && password) {
            loginUser(email, rememberMe);
        } else {
            showNotification('Invalid email or password.', 'error');
        }
    }, 1000);
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const terms = document.getElementById('signupTerms').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please agree to the Terms of Service and Privacy Policy.', 'error');
        return;
    }
    
    // Simulate signup process
    showNotification('Creating account...', 'info');
    
    setTimeout(() => {
        // Create new user data
        const newUser = {
            userId: 'USR-' + Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
            memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
            totalOrders: 0,
            totalSpent: 0,
            loyalty: {
                tier: "Bronze",
                points: 0,
                nextTier: "Silver",
                pointsNeeded: 100
            },
            profileCompletion: 60,
            addresses: [],
            preferences: {
                emailNotifications: true,
                smsNotifications: false,
                marketingNotifications: false
            }
        };
        
        // Save user data and login
        localStorage.setItem('userData', JSON.stringify(newUser));
        loginUser(email, true);
        closeSignupModal();
    }, 1500);
}

// Login user function
function loginUser(email, rememberMe) {
    // Get or create user data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // If no user data exists, create user data with actual name from email
    if (!userData.email) {
        // Extract name from email (before @ symbol)
        const emailName = email.split('@')[0];
        // Convert email name to proper case (e.g., "john.doe" -> "John Doe")
        const nameParts = emailName.split(/[._-]/);
        const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
        const lastName = nameParts.length > 1 ? 
            nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 
            'User';
        
        userData = {
            userId: 'USR-' + Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: emailName,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
            memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
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
    }
    
    // Update email if it's different
    userData.email = email;
    
    // Set login status and user data
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // If remember me is checked, set a longer expiration
    if (rememberMe) {
        localStorage.setItem('loginExpiry', Date.now() + (30 * 24 * 60 * 60 * 1000)); // 30 days
    }
    
    showNotification('Login successful! Redirecting...', 'success');
    
    // Redirect to user dashboard
    setTimeout(() => {
        window.location.href = 'user.html';
    }, 1000);
}

// Fill demo credentials
function fillDemoCredentials() {
    document.getElementById('email').value = 'john.doe@shopeasy.com';
    document.getElementById('password').value = 'demo123';
    document.getElementById('rememberMe').checked = true;
    
    showNotification('Demo credentials filled! Click Sign In to continue.', 'info');
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Toggle signup password visibility
function toggleSignupPassword() {
    const passwordInput = document.getElementById('signupPassword');
    const toggleBtn = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Toggle signup confirm password visibility
function toggleSignupConfirmPassword() {
    const passwordInput = document.getElementById('signupConfirmPassword');
    const toggleBtn = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Show signup modal
function showSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close signup modal
function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const form = document.getElementById('signupForm');
        if (form) {
            form.reset();
        }
    }
}

// Show login form
function showLoginForm() {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.display = 'block';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
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

// Initialize the page
initializeLoginPage();

// Forgot Password Functions
let currentResetMethod = null;
let otpTimer = null;
let otpCountdown = 60;

function showForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'block';
        // Reset forms
        document.getElementById('emailResetForm').style.display = 'none';
        document.getElementById('mobileResetForm').style.display = 'none';
        document.querySelector('.reset-method-selection').style.display = 'block';
    }
}

function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset forms
        const emailForm = document.getElementById('emailResetForm');
        const mobileForm = document.getElementById('mobileResetForm');
        if (emailForm) emailForm.reset();
        if (mobileForm) mobileForm.reset();
    }
}

function selectResetMethod(method) {
    currentResetMethod = method;
    document.querySelector('.reset-method-selection').style.display = 'none';
    
    if (method === 'email') {
        document.getElementById('emailResetForm').style.display = 'block';
    } else if (method === 'mobile') {
        document.getElementById('mobileResetForm').style.display = 'block';
    }
}

function handleEmailReset(event) {
    event.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    // Simulate sending reset email
    showNotification('Sending reset link to your email...', 'info');
    
    setTimeout(() => {
        showNotification('Reset link sent! Please check your email.', 'success');
        closeForgotPasswordModal();
    }, 2000);
}

function handleMobileReset(event) {
    event.preventDefault();
    
    const countryCode = document.getElementById('countryCode').value;
    const mobile = document.getElementById('resetMobile').value;
    
    if (!mobile) {
        showNotification('Please enter your mobile number.', 'error');
        return;
    }
    
    // Simulate sending OTP
    showNotification('Sending OTP to your mobile...', 'info');
    
    setTimeout(() => {
        showOtpModal(`${countryCode} ${mobile}`);
        closeForgotPasswordModal();
    }, 2000);
}

function showOtpModal(target) {
    const modal = document.getElementById('otpModal');
    const targetSpan = document.getElementById('otpTarget');
    
    if (modal && targetSpan) {
        targetSpan.textContent = target;
        modal.style.display = 'block';
        startOtpTimer();
    }
}

function closeOtpModal() {
    const modal = document.getElementById('otpModal');
    if (modal) {
        modal.style.display = 'none';
        stopOtpTimer();
        // Clear OTP inputs
        document.querySelectorAll('.otp-input').forEach(input => {
            input.value = '';
        });
    }
}

function startOtpTimer() {
    otpCountdown = 60;
    updateOtpTimer();
    
    otpTimer = setInterval(() => {
        otpCountdown--;
        updateOtpTimer();
        
        if (otpCountdown <= 0) {
            stopOtpTimer();
            enableResendButton();
        }
    }, 1000);
}

function stopOtpTimer() {
    if (otpTimer) {
        clearInterval(otpTimer);
        otpTimer = null;
    }
}

function updateOtpTimer() {
    const timerSpan = document.getElementById('otpTimer');
    if (timerSpan) {
        timerSpan.textContent = otpCountdown;
    }
}

function enableResendButton() {
    const resendBtn = document.querySelector('.resend-btn');
    if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend OTP';
    }
}

function resendOTP() {
    showNotification('OTP resent!', 'success');
    startOtpTimer();
    const resendBtn = document.querySelector('.resend-btn');
    if (resendBtn) {
        resendBtn.disabled = true;
    }
}

function setupOtpInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Move to next input if value is entered
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // Move to previous input on backspace if current input is empty
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            const numbers = pastedData.replace(/\D/g, '').split('');
            
            otpInputs.forEach((input, i) => {
                if (numbers[i]) {
                    input.value = numbers[i];
                }
            });
        });
    });
}

function handleOtpVerification(event) {
    event.preventDefault();
    
    const otpInputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        showNotification('Please enter the complete 6-digit OTP.', 'error');
        return;
    }
    
    // Simulate OTP verification
    showNotification('Verifying OTP...', 'info');
    
    setTimeout(() => {
        // For demo, accept any 6-digit OTP
        if (otp.length === 6) {
            showNotification('OTP verified successfully!', 'success');
            closeOtpModal();
            showNewPasswordModal();
        } else {
            showNotification('Invalid OTP. Please try again.', 'error');
        }
    }, 1500);
}

function showNewPasswordModal() {
    const modal = document.getElementById('newPasswordModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeNewPasswordModal() {
    const modal = document.getElementById('newPasswordModal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const form = document.getElementById('newPasswordForm');
        if (form) form.reset();
        // Reset password strength
        resetPasswordStrength();
    }
}

function handleNewPassword(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    if (!newPassword || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long.', 'error');
        return;
    }
    
    // Simulate password update
    showNotification('Updating password...', 'info');
    
    setTimeout(() => {
        showNotification('Password updated successfully!', 'success');
        closeNewPasswordModal();
    }, 1500);
}

function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    let strength = 0;
    let strengthClass = 'weak';
    let strengthLabel = 'Weak';
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength >= 4) {
        strengthClass = 'strong';
        strengthLabel = 'Strong';
    } else if (strength >= 2) {
        strengthClass = 'medium';
        strengthLabel = 'Medium';
    }
    
    strengthFill.className = `strength-fill ${strengthClass}`;
    strengthText.className = `strength-text ${strengthClass}`;
    strengthText.textContent = strengthLabel;
}

function resetPasswordStrength() {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (strengthFill) {
        strengthFill.className = 'strength-fill';
    }
    if (strengthText) {
        strengthText.className = 'strength-text';
        strengthText.textContent = 'Weak';
    }
}

function toggleNewPassword() {
    const input = document.getElementById('newPassword');
    const icon = event.target.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function toggleConfirmNewPassword() {
    const input = document.getElementById('confirmNewPassword');
    const icon = event.target.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}