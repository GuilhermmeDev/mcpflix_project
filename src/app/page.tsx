import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Sidebar />
        <main className="md:ml-6 w-full">
          <Navbar />
          <Content />
        </main>
      </div>
    </>
  );
}
