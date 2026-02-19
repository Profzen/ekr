import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="flex-grow pt-0">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
