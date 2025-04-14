import { useParams } from "react-router-dom";

export default function SearchResults() {
  const { q } = useParams();
  return (
    <>
      <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {q !== undefined ? `"${q}"` : ""}
      </h1>
      <p className="text-sm text-muted-foreground">10 results in 138ms</p>
    </>
  );
}
