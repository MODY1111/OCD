import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Route = "home" | "care" | "team" | "voices" | "clinics" | "faq" | "book";

const routes: Route[] = ["home", "care", "team", "voices", "clinics", "faq", "book"];

type Ctx = { route: Route; go: (r: Route) => void };
const RouterCtx = createContext<Ctx>({ route: "home", go: () => {} });

function readHash(): Route {
  const h = window.location.hash.replace("#/", "").replace("#", "") as Route;
  return routes.includes(h) ? h : "home";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(readHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(readHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r: Route) => {
    window.location.hash = `/${r}`;
    setRoute(r);
    window.scrollTo({ top: 0 });
  };

  return <RouterCtx.Provider value={{ route, go }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);
