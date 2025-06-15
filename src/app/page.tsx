import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-2">Luthier Services</h1>
        <p className="text-xl text-secondary-foreground mb-8">
          Serviços especializados para seus instrumentos
        </p>
        
        <div className="relative w-64 h-96 mx-auto mb-8">
          <div className="absolute inset-0 rounded-3xl border border-gray-800 bg-secondary">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-32 h-48 mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M12 2C10.5 2 9.5 3 9.5 4.5V5H8.5C7.12 5 6 6.12 6 7.5V8H5C3.89 8 3 8.89 3 10V20C3 21.11 3.89 22 5 22H19C20.11 22 21 21.11 21 20V10C21 8.89 20.11 8 19 8H18V7.5C18 6.12 16.88 5 15.5 5H14.5V4.5C14.5 3 13.5 2 12 2ZM12 4C12.28 4 12.5 4.22 12.5 4.5V5H11.5V4.5C11.5 4.22 11.72 4 12 4ZM7 10H17C17.55 10 18 10.45 18 11V13C18 13.55 17.55 14 17 14H7C6.45 14 6 13.55 6 13V11C6 10.45 6.45 10 7 10ZM7 15H17C17.55 15 18 15.45 18 16V18C18 18.55 17.55 19 17 19H7C6.45 19 6 18.55 6 18V16C6 15.45 6.45 15 7 15Z"
                    fill="#FF4500"
                  />
                </svg>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/services">
                  Entrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

