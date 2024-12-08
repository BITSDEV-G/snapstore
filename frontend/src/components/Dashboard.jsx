import  { useState } from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Bell, CalendarIcon, LogOut, Menu, Search, Settings, User } from 'lucide-react';

import { DashboardOverview } from './DashboardOverview';
import { ClientBookings } from './ClientBookings';
import FindPhotographer from './FindPhotographer';
import { ClientProfile } from './ClientProfile';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <h1 className={`text-2xl font-bold text-gray-800 dark:text-white ${isSidebarOpen ? '' : 'hidden'}`}>SnapStore</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mt-4">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Dashboard'}
            </Button>
          </Link>
          <Link to="/bookings">
            <Button variant="ghost" className="w-full justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Bookings'}
            </Button>
          </Link>
          <Link to="/find-photographer">
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Find Photographer'}
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              {isSidebarOpen && 'Profile'}
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 mr-4"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">shadcn</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/bookings" element={<ClientBookings />} />
              <Route path="/find-photographer" element={<FindPhotographer />} />
              <Route path="/profile" element={<ClientProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
