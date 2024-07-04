import StoreProvider from "@/redux/storeProvider";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SignInForm from "@/components/SignInForm/SignInForm";
import ProductEnquiryForm from "@/components/ProductEnquiryForm/ProductEnquiryForm";

import "../../public/assets/css/main.css";
import MainMenu from "@/components/MainMenu/MainMenu";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <MainMenu />
          {children}
          <Footer />
          <SignInForm />
          <ProductEnquiryForm />
        </StoreProvider>
      </body>
    </html>
  );
}
