import LoginForm from "@/components/LoginForm";

export default function Dashboard() {
  return (
    <>
      <div className="flex h-screen flex-1 flex-col items-center justify-center gap-4 p-4">
        <LoginForm />
      </div>
    </>
  );
}
