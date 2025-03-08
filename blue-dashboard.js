// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chart
    initializeAnalyticsChart();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize responsive behaviors
    initializeResponsive();
    
    // Set up bar indicator widths for metric cards
    setupMetricBars();
});

// Initialize Analytics Chart
function initializeAnalyticsChart() {
    const chartElement = document.getElementById('analyticsChart');
    
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        
        // Sample data for the chart
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                {
                    label: 'Customers',
                    data: [700, 450, 300, 350, 640, 580, 690, 750],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Users',
                    data: [500, 380, 280, 300, 500, 500, 400, 650],
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: 'rgba(139, 92, 246, 1)',
                    borderWidth: 0,
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }
            ]
        };
        
        // Chart configuration
        const chartConfig = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'white',
                        titleColor: '#1e293b',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: function(tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 800,
                        ticks: {
                            stepSize: 100,
                            color: '#64748b',
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: '#f1f5f9',
                            drawBorder: false
                        }
                    }
                }
            }
        };
        
        // Create the chart
        new Chart(ctx, chartConfig);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Navigation items click
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Table row hover effect
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const orderId = this.cells[0].textContent;
            alert(`You clicked on order #${orderId}`);
        });
        row.style.cursor = 'pointer';
    });
    
    // Header actions
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            alert('Notifications panel would appear here');
        });
    }
    
    const search = document.querySelector('.search');
    if (search) {
        search.addEventListener('click', function() {
            alert('Search panel would appear here');
        });
    }
    
    const appGrid = document.querySelector('.app-grid');
    if (appGrid) {
        appGrid.addEventListener('click', function() {
            alert('App selector would appear here');
        });
    }
}

// Set up metric indicator bars
function setupMetricBars() {
    // Set random widths for indicator bars to simulate data
    const indicatorBars = document.querySelectorAll('.indicator-bar');
    
    indicatorBars.forEach((bar, index) => {
        // Randomize bar widths between 60% and 95%
        const randomWidth = Math.floor(Math.random() * 35) + 60;
        bar.style.width = `${randomWidth}%`;
        
        // Create small bars within the indicator
        const barsCount = 5;
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < barsCount; i++) {
            const smallBar = document.createElement('div');
            smallBar.style.display = 'inline-block';
            smallBar.style.height = '100%';
            smallBar.style.width = `${100/barsCount - 2}%`;
            smallBar.style.margin = '0 1%';
            smallBar.style.backgroundColor = 'currentColor';
            smallBar.style.borderRadius = '2px';
            smallBar.style.opacity = Math.random() > 0.2 ? 1 : 0.5; // Some bars are dimmed
            
            fragment.appendChild(smallBar);
        }
        
        bar.appendChild(fragment);
    });
}

// Initialize responsive behavior
function initializeResponsive() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
        if (e.matches) {
            // Mobile view
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            // Create mobile menu toggle if it doesn't exist
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('div');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Add click event to toggle sidebar
                toggle.addEventListener('click', function() {
                    sidebar.classList.toggle('show');
                    
                    // Adjust main content margin
                    if (sidebar.classList.contains('show')) {
                        mainContent.style.marginLeft = 'var(--sidebar-width)';
                    } else {
                        mainContent.style.marginLeft = '0';
                    }
                });
                
                // Add to the header before the title
                const header = document.querySelector('.header');
                header.insertBefore(toggle, header.firstChild);
            }
        } else {
            // Desktop view
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            // Reset to desktop view
            sidebar.classList.remove('show');
            mainContent.style.marginLeft = 'var(--sidebar-width)';
            
            // Remove mobile toggle if it exists
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.remove();
            }
        }
    }
    
    // Initial check
    handleScreenChange(mediaQuery);
    
    // Add listener for screen size changes
    mediaQuery.addEventListener('change', handleScreenChange);
}

// Simulate data updates (for demo purposes)
function simulateDataUpdates() {
    // Update some values every 30 seconds to make the dashboard feel alive
    setInterval(() => {
        // Update metric values
        document.querySelectorAll('.metric-value').forEach(metricValue => {
            const text = metricValue.textContent;
            const baseValue = parseInt(text.replace(/[^\d]/g, ''));
            
            // Calculate a new value with a small random change
            const change = Math.floor(Math.random() * 100) - 50; // Random -50 to +50
            let newValue = baseValue + change;
            
            // Format with k suffix
            newValue = Math.floor(newValue / 100) / 10;
            metricValue.textContent = `${newValue}k`;
        });
        
        // Update bar widths occasionally
        if (Math.random() > 0.7) {
            setupMetricBars();
        }
        
        console.log('Dashboard data updated at ' + new Date().toLocaleTimeString());
    }, 30000);
}

// Start data simulation (uncomment if you want values to change)
// simulateDataUpdates();