import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content" className="intro">
        <p className="intro-audience">For adults who stutter</p>
        <h1>Say it your way.</h1>
        <p className="intro-description">
          Guided programs and everyday practice.
          <br />
          Learn, rehearse, and take your next step.
        </p>
      </main>
      <Footer />
    </div>
  );
}
