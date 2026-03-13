import { Suspense } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export default async function FrontLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense>
        <Nav />
      </Suspense>
      <main className="flex-1">{props.children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
