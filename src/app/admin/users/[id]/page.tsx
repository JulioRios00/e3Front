import { PageContainer } from "@/components/layout/page-container";
import { UserDetail } from "@/components/admin/user-detail";
import { USERS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = USERS.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <Link href="/admin" className="flex items-center text-primary mb-4">
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Voltar</span>
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Detalhes do Usuário</h1>
        
        <UserDetail
          id={user.id}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          birthday={user.birthday}
          role={user.role}
          isActive={user.isActive}
          createdAt={user.createdAt}
          onEdit={() => {}}
          onToggleActive={() => {}}
        />
      </div>
    </PageContainer>
  );
}

