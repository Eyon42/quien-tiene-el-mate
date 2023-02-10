import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import MateApp from "./components/MateApp";

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-dark pt-8 px-4 w-full m-0 h-full min-h-screen text-white">
        <main className="min-h-screen">
          <MateApp />
        </main>
        <div className="flex w-full items-center justify-center mt-8 pb-2">
          <p className="text-gray-500">
            Hecho por{" "}
            <a
              href="https://bestem.dev"
              className="underline hover:text-accent transition-colors"
            >
              Bestem.dev
            </a>
          </p>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
