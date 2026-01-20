import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Feedback } from "./pages/Feedback";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <LanguageProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/feedback"
                        element={
                            <Layout>
                                <Feedback />
                            </Layout>
                        }
                    />
                </Routes>
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
