import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

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

const MateApp = () => {
  const tokenDataQuery = useQuery({
    queryKey: ["holder"],
    queryFn: async () => {
      const query = `query getCurrentOwner {
          token(id: "9561") {
            id
            owner {
              id
            }
            transfers {
              from {
                id
              }
            }
          }
        }
      `;
      const res = await fetch(
        "https://api.thegraph.com/subgraphs/name/agustindemarco/bnfts-protocol",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        }
      );
      const { data } = await res.json();

      const history = data.token.transfers.map((t) => t.from.id);
      history.reverse();

      return {
        holder: data.token.owner.id,
        history: history.slice(0, history.length - 1),
      };
    },
  });

  return (
    <>
      <div className="flex gap-12 items-center justify-center flex-col align-middle">
        <img src="/mate.svg" alt="Mate" className="h-64 rounded-full w-64" />
        <CurrentMateHolder holderAddress={tokenDataQuery.data?.holder} />
        <HistoricBoard holderHistory={tokenDataQuery.data?.history} />
      </div>
    </>
  );
};

const CurrentMateHolder = (props) => {
  const holder = {
    address: props.holderAddress || "",
    ens: "",
  };

  return (
    <>
      <h1 className="text-2xl text-center font-gradient accent-gradient uppercase">
        ¿Quién tiene el mate ahora?
      </h1>
      <div className="flex flex-col gap-3">
        <div className="px-1 w-full">
          <div className="flex flex-row items-center text-gray-900rounded-3xl px-8 gap-6 bg-dark rounded-3xl">
            <p className="w-24 xs:w-32 sm:w-96 text-center">Address:</p>
            <div></div>
            <img
              src="/welook.png"
              alt="WeLook"
              className="ml-6 xs:ml-8 h-6 w-auto"
            />
          </div>
        </div>
        <div className=" bg-gradient-to-r from-secondary to-accent rounded-3xl p-0.5">
          <div className="flex flex-col items-center text-gray-900rounded-3xl py-4 px-8 gap-4 bg-dark rounded-3xl">
            <MateHolder holder={holder} />
          </div>
        </div>
      </div>
    </>
  );
};

// utility to shorten an address
const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const MateHolder = ({ holder }) => {
  return (
    <div className="flex flex-row items-center gap-8">
      {holder.ens && (
        <h1 className="text-4xl font-bold text-center">{holder.ens}</h1>
      )}
      <p className="text-center w-24 xs:w-32 sm:w-96">
        <a
          href={"https://polygonscan.com/address/" + holder.address}
          className="hover:text-accent text-gray-400 underline transition-colors"
        >
          <span className="block sm:hidden">
            {shortenAddress(holder.address)}
          </span>
          <span className="sm:block hidden">{holder.address}</span>
        </a>
      </p>
      <div className="border-r border h-8 border-gray-600/80"></div>
      <a href={"https://welook.io/" + holder.address}>
        <button className="border border-1 rounded-full py-2 sm:w-[120px] px-4 xs:px-6 border-primary hover:bg-primary hover:font-bold transition-colors">
          Ver Perfil
        </button>
      </a>
    </div>
  );
};

const HistoricBoard = (props) => {
  const holders = props.holderHistory?.map((address) => ({
    address,
    ens: "",
  }));
  console.log(holders);
  return (
    <>
      <h1 className="text-2xl text-center font-gradient accent-gradient uppercase">
        ¿Quién ya tomó mate?
      </h1>
      <div className="flex flex-col gap-3">
        <div className="px-1 w-full">
          <div className="flex flex-row items-center text-gray-900rounded-3xl px-8 gap-6 bg-dark rounded-3xl">
            <p className="w-24 xs:w-32 sm:w-96 text-center">Address:</p>
            <div></div>
            <img
              src="/welook.png"
              alt="WeLook"
              className="ml-6 xs:ml-8 h-6 w-auto"
            />
          </div>
        </div>
        <div className=" bg-gradient-to-r from-secondary to-accent rounded-3xl p-0.5">
          <div className="flex flex-col items-center text-gray-900rounded-3xl py-6 px-8 gap-6 bg-dark rounded-3xl">
            {holders?.map((holder) => (
              <MateHolder holder={holder} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
