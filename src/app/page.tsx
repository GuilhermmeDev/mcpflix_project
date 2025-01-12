import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Sidebar />
        <main className="md:ml-6 w-full">
          <Navbar />
        </main>
      </div>
    </>
  );
}
