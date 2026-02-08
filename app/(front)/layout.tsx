import { CartProviderWrapper } from "./CartProviderWrapper";
import { CartSummary } from "../components/CartSummary";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export default function FrontLayout(props: LayoutProps<"/">) {
  return (
    <CartProviderWrapper>
      <div className="flex min-h-screen flex-col">
        <Nav cartSummary={<CartSummary />} />
        <main className="flex-1">{props.children}</main>
        <Footer />
      </div>
    </CartProviderWrapper>
  );
}
