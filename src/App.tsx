import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import { AuthProvider } from "./auth/AuthContext";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Feedback } from "./pages/Feedback";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Login } from "./pages/Login";
import { ASLTranslator } from "./pages/ASLTranslator";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
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
                        <Route
                            path="/privacy"
                            element={
                                <Layout>
                                    <PrivacyPolicy />
                                </Layout>
                            }
                        />
                        <Route
                            path="/terms"
                            element={
                                <Layout>
                                    <TermsOfService />
                                </Layout>
                            }
                        />
                        <Route
                            path="/blog"
                            element={
                                <Layout>
                                    <Blog />
                                </Layout>
                            }
                        />
                        <Route
                            path="/blog/:slug"
                            element={
                                <Layout>
                                    <BlogPost />
                                </Layout>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/englishtoasltranslator"
                            element={
                                <ProtectedRoute>
                                    <ASLTranslator />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </LanguageProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
