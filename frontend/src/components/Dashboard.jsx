import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ChefHat, 
    ClipboardList, 
    BookOpen, 
    SquareKanban, 
    LogOut,
    UserCircle,
    ChevronDown
} from 'lucide-react';

// Data for navigation items
const navItems = [
    { title: 'Orders', path: '/orders', icon: ClipboardList },
    { title: 'Kitchen View', path: '/kitchen', icon: ChefHat },
    { title: 'Menu Management', path: '/menu', icon: BookOpen },
    { title: 'Table Management', path: '/tables', icon: SquareKanban }
];

// Dashboard Card Component
const DashboardCard = ({ item }) => (
    <Link 
      to={item.path}
      className="group text-left bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col"
    >
        <div className={`w-14 h-14 rounded-lg ${item.bgColor} flex items-center justify-center`}>
            <item.icon size={32} className={item.color} />
        </div>
        <div className="mt-4 flex-grow">
            <h2 className="text-xl font-semibold text-slate-800">
                {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
                {item.description}
            </p>
        </div>
        <div className="mt-6 font-semibold text-blue-600 flex items-center gap-2">
            <span>Go to {item.title.split(' ')[0]}</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
    </Link>
);

const Dashboard = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('admin'));
        if (admin && admin.restaurantName) {
            setRestaurantName(admin.restaurantName);
        }
        setTimeout(() => setLoading(false), 300); 
    }, []);

    // Data for dashboard cards, now separate from nav items
    const dashboardCards = [
        { ...navItems[0], description: 'Monitor incoming orders and preparation status in real-time.', color: 'text-amber-500', bgColor: 'bg-amber-50' },
        { ...navItems[1], description: 'View order history, details, and manage customer interactions.', color: 'text-sky-500', bgColor: 'bg-sky-50' },
        { ...navItems[2], description: 'Add, edit, or remove menu items and categories with ease.', color: 'text-violet-500', bgColor: 'bg-violet-50' },
        { ...navItems[3], description: 'Manage table assignments, reservations, and customer seating.', color: 'text-green-500', bgColor: 'bg-green-50' }
    ];

    return (
        <div className="min-h-full bg-slate-50 p-4 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                <main>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                            Welcome Back!
                        </h1>
                        <p className="text-md text-slate-600">
                            Select an option below to manage your restaurant.
                        </p>
                    </div>
                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {dashboardCards.map((item) => (
                            <DashboardCard key={item.title} item={item} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

