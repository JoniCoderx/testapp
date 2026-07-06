import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import FeatureSection from '@/components/FeatureSection';
import { DisclaimerBar, Footer } from '@/components/Disclaimer';

export default function HomePage() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />

        <div className="mt-16">
          <Ticker />
        </div>

        <FeatureSection />

        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
          <DisclaimerBar />
        </section>

        <section className="mx-auto mt-16 max-w-4xl px-4 text-center sm:px-6">
          <div className="glass-strong rounded-3xl p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to read the signal?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/50">
              Open the live terminal and watch influential posts decoded into
              market impact — updated automatically around the clock.
            </p>
            <a href="/dashboard" className="btn-primary mt-6 inline-flex">
              Open the terminal
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
