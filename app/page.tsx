import { Toaster } from "react-hot-toast";
import Tasks from "./_components/tasks/Tasks";


export const revalidate=0;

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <Tasks Tasktitle="All tasks" />
      <Toaster />
    </main>
  );
}
