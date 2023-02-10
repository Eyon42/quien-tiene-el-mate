import { useQuery } from "@tanstack/react-query";
import CurrentMateHolder from "./CurrentMateHolder";
import HistoricBoard from "./HistoricBoard";

const MateApp = () => {
  const tokenDataQuery = useQuery({
    queryKey: ["holders"],
    queryFn: async () => {
      const query = `query getOwners {
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

export default MateApp;
