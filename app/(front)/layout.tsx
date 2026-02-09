import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export default async function FrontLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
