import Header from "@/components/Header";
import UserTable from "@/components/UserTable";

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <UserTable />
      </div>
    </>
  );
}
