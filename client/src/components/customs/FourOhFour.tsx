import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FourOhFour() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-3 flex justify-center items-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>404: Not Found</CardTitle>
            <CardDescription>
              The page you requested was either deleted or never existed in the
              first place...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
