import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <main className="md:ml-6 w-full">
          <Navbar />
        </main>
      </div>
    </>
  );
}
