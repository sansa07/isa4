import { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { ProtectedRoute } from "./lib/protected-route";
import Sidebar from "./components/layout/Sidebar";
import MobileHeader from "./components/layout/MobileHeader";
import MobileNav from "./components/layout/MobileNav";
import PatternOverlay from "./components/layout/PatternOverlay";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import HomePage from "./pages/home";
import AuthPage from "./pages/auth-page";
import VerifyEmail from "./pages/verify-email";
import NotFound from "./pages/not-found";

// Lazy loaded pages
const AdminPanel = lazy(() => import("./pages/admin"));
const PrayerTimes = lazy(() => import("./pages/PrayerTimes"));
const DailyWisdom = lazy(() => import("./pages/DailyWisdom"));
const QuranHadith = lazy(() => import("./pages/QuranHadith"));
const DuaRequests = lazy(() => import("./pages/DuaRequests"));
const Communities = lazy(() => import("./pages/Communities"));
const Events = lazy(() => import("./pages/Events"));
const Profile = lazy(() => import("./pages/Profile"));
const Explore = lazy(() => import("./pages/Explore"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"
        />
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-emerald-600 dark:text-emerald-400 font-medium"
        >
          Yükleniyor...
        </motion.p>
      </motion.div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Switch>
            <ProtectedRoute path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/verify-email" component={VerifyEmail} />
            <ProtectedRoute path="/admin" component={AdminPanel} />
            <ProtectedRoute path="/prayer-times" component={PrayerTimes} />
            <ProtectedRoute path="/daily-wisdom" component={DailyWisdom} />
            <ProtectedRoute path="/quran-hadith" component={QuranHadith} />
            <ProtectedRoute path="/dua-requests" component={DuaRequests} />
            <ProtectedRoute path="/communities" component={Communities} />
            <ProtectedRoute path="/events" component={Events} />
            <ProtectedRoute path="/profile/:id?" component={Profile} />
            <ProtectedRoute path="/explore" component={Explore} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

function App() {
  const [location] = useLocation();
  const isAuthPage = location === "/auth" || location === "/verify-email";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="islamic-green" storageKey="theme-mode">
          {isAuthPage ? (
            <Router />
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 relative transition-colors duration-300">
              <PatternOverlay />
              <Sidebar />
              <MobileHeader />
              <main className="lg:ml-72 pb-20 lg:pb-10 relative z-10">
                <motion.div 
                  className="container mx-auto px-4 py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Router />
                </motion.div>
              </main>
              <MobileNav />
            </div>
          )}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;