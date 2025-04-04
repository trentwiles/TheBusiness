import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

export default function WelcomeHero() {
  return (
    <>
      {/* Title */}
      <div className="mt-5 max-w-2xl text-center mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Business
        </h1>
      </div>
      {/* End Title */}
      <div className="mt-5 max-w-3xl text-center mx-auto">
        <p className="text-xl text-muted-foreground">
          Order any grocery item and have them delivered to your doorstep by a reputable driver in
          your area. Yes, it really is that easy.
        </p>
      </div>
      {/* Buttons */}
      <div className="mt-8 gap-3 flex justify-center">
        <Link to="/login">
          <Button size={"lg"}>Login</Button>
        </Link>
        <Link to="/about">
          <Button size={"lg"} variant={"outline"}>
            Learn more
          </Button>
        </Link>
      </div>
      {/* End Buttons */}
      <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <span className="text-sm text-muted-foreground">
              Project By <a href="https://trentwil.es" target="_blank">Trent Wiles</a>
            </span>
            <svg
              className="h-5 w-5 text-muted-foreground"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
              href="https://github.com/trentwiles/TheBusiness"
              target="_blank"
            >
              Source Code
              <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          </div>
      {/* End Hero */}
    </>
  );
}
