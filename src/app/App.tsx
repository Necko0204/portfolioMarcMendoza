import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteLoader } from "../components/common/RouteLoader";
import { ThemeProvider } from "../hooks/useTheme";
import { SiteLayout } from "../layouts/SiteLayout";
import { HomePage } from "../pages/HomePage";

const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const ProjectCaseStudyPage = lazy(() => import("../pages/ProjectCaseStudyPage"));
const OperationsPage = lazy(() => import("../pages/OperationsPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function LazyBoundary({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteLoader />}>{children}</Suspense>;
}

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route
                path="projects"
                element={
                  <LazyBoundary>
                    <ProjectsPage />
                  </LazyBoundary>
                }
              />
              <Route
                path="projects/:slug"
                element={
                  <LazyBoundary>
                    <ProjectCaseStudyPage />
                  </LazyBoundary>
                }
              />
              <Route
                path="operations"
                element={
                  <LazyBoundary>
                    <OperationsPage />
                  </LazyBoundary>
                }
              />
              <Route
                path="about"
                element={
                  <LazyBoundary>
                    <AboutPage />
                  </LazyBoundary>
                }
              />
              <Route
                path="contact"
                element={
                  <LazyBoundary>
                    <ContactPage />
                  </LazyBoundary>
                }
              />
              <Route
                path="*"
                element={
                  <LazyBoundary>
                    <NotFoundPage />
                  </LazyBoundary>
                }
              />
            </Route>
            <Route
              path="dashboard"
              element={
                <LazyBoundary>
                  <DashboardPage />
                </LazyBoundary>
              }
            />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
