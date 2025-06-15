import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function ServiceCard({ id, title, description, imageUrl }: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`}>
      <Card className="overflow-hidden border-border hover:border-primary/50 transition-colors duration-300 bg-card mb-4">
        <div className="relative">
          <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-secondary-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

