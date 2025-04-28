import Header from "@/components/Header";
import PostList from "@/components/PostList";
import UserProfile from "@/components/UserProfile";
import { Separator } from "@/components/ui/separator";

export default function Users() {
  return (
    <>
      <Header title="User" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <UserProfile />
        <Separator orientation="horizontal" className="mb-0 mt-2" />
        <PostList />
      </div>
    </>
  );
}
