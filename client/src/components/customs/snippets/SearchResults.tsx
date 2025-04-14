import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type result = {
  title: string;
  path: string;
};

export default function SearchResults() {
  const { q } = useParams();
  const [results, setResults] = useState<result[]>();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    // when q changes fire the search
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/orders`, {
      method: "POST",
      body: JSON.stringify({ q: q }),
    })
      .then((response) => response.json())
      .then((data: result[]) => setResults(data));

    setIsloading(false);
  }, [q]);

  return (
    <>
      <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {q !== undefined ? `"${q}"` : ""}
      </h1>
      <p className="text-sm text-muted-foreground">10 results in 138ms</p>
    </>
  );
}
