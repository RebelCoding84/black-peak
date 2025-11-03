// app/page.tsx
import Hero from "@/components/Hero";
import OutlawShowcase from "@/components/OutlawShowcase"; // toinen osio (Outlaw-kuva)

export default function Page() {
  return (
    <main className="relative w-screen min-h-dvh">
      <Hero />
      <OutlawShowcase /> {/* tähän scrollataan nuolesta */}
    </main>
  );
}
