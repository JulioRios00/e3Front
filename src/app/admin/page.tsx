import { PageContainer } from "@/components/layout/page-container";
import { UserCard, BirthdayCard } from "@/components/admin/user-cards";
import { USERS, getTodayBirthdays, getWeekBirthdays, calculateAge } from "@/lib/data";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const todayBirthdays = getTodayBirthdays();
  const weekBirthdays = getWeekBirthdays();

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Administração</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="bg-secondary">
              <Filter className="h-5 w-5" />
            </Button>
            <Button size="icon" className="bg-primary text-white">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <h2 className="text-xl text-secondary-foreground mb-4">Usuários Cadastrados</h2>
        
        <div className="space-y-4">
          {USERS.map((user) => (
            <Link href={`/admin/users/${user.id}`} key={user.id}>
              <UserCard
                id={user.id}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                phone={user.phone}
                role={user.role}
                isActive={user.isActive}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Aniversariantes</h2>
        
        {todayBirthdays.length > 0 && (
          <>
            <h3 className="text-xl text-primary font-semibold mb-2">HOJE</h3>
            <div className="space-y-4 mb-6">
              {todayBirthdays.map((user) => (
                <BirthdayCard
                  key={user.id}
                  name={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                  age={calculateAge(user.birthday)}
                />
              ))}
            </div>
          </>
        )}
        
        {weekBirthdays.length > 0 && (
          <>
            <h3 className="text-xl text-primary font-semibold mb-2">ESTA SEMANA</h3>
            <div className="space-y-4">
              {weekBirthdays.map((user) => {
                const birthday = new Date(user.birthday);
                const formattedDate = `${birthday.getDate()} ${birthday.toLocaleString('pt-BR', { month: 'short' })}`;
                
                return (
                  <BirthdayCard
                    key={user.id}
                    name={`${user.firstName} ${user.lastName}`}
                    email={user.email}
                    date={formattedDate}
                  />
                );
              })}
            </div>
          </>
        )}
        
        {todayBirthdays.length === 0 && weekBirthdays.length === 0 && (
          <p className="text-secondary-foreground">Não há aniversariantes hoje ou esta semana.</p>
        )}
      </div>
    </PageContainer>
  );
}

