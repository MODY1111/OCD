import { I18nProvider } from "./i18n";
import { RouterProvider, useRouter } from "./router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import { CarePage, ClinicsPage, FaqPage, TeamPage, VoicesPage } from "./pages/InnerPages";
import { FeaturesBackground } from "./components/FeaturesSection";

function Screen() {
  const { route } = useRouter();

  const page = (() => {
    switch (route) {
      case "care":
        return <CarePage />;
      case "team":
        return <TeamPage />;
      case "voices":
        return <VoicesPage />;
      case "clinics":
        return <ClinicsPage />;
      case "faq":
        return <FaqPage />;
      case "book":
        return <BookPage />;
      default:
        return <HomePage />;
    }
  })();

  return (
    <div className="min-h-screen bg-[#0f0a05]">
      {route !== "home" && route !== "care" && <FeaturesBackground />}
      <Navbar overlay={route === "home"} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <Screen />
      </RouterProvider>
    </I18nProvider>
  );
}
