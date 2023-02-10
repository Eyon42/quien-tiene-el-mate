import { useQuery } from "@tanstack/react-query";
import { shortenAddress } from "../utils";

const MateHolder = ({ holder }) => {
  const ensQuery = useQuery({
    queryKey: ["ens", holder.address],
    queryFn: async () => {
      const res = await fetch(
        "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query getByAddress {
              domains(
                where: {resolvedAddress_: {id: "${holder.address}"}}
              ) {
                name
              }
            }`,
          }),
        }
      );
      const { data } = await res.json();
      return data.domains[0]?.name;
    },
  });

  console.log(ensQuery.data);

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
          {ensQuery.data ? (
            <span>{ensQuery.data}</span>
          ) : (
            <>
              <span className="block sm:hidden">
                {shortenAddress(holder.address)}
              </span>
              <span className="sm:block hidden">{holder.address}</span>
            </>
          )}
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

export default MateHolder;
