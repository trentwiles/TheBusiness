import Sidebar from "./components/customs/Sidebar";
import Order from "./components/customs/Order";

export default function App() {
  const sampleCave: Map<string, number> = new Map();
  sampleCave.set("Carrots", 5.23);
  sampleCave.set("Apples", 10.12);
  return (
    <Sidebar
      children={
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>

          <Order orderItems={sampleCave} orderTitle="hi" client="Joe" id="9183923" />
        </>
      }
    />
  );
}
