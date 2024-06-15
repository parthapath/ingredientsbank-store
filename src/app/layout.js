import StoreProvider from "@/redux/storeProvider";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SignInForm from "@/components/SignInForm/SignInForm";

import "../../public/assets/css/main.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <SignInForm />
        </StoreProvider>
      </body>
    </html>
  );
}
