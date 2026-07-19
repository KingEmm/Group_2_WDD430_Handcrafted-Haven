"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { MailIcon } from "@/components/ui/icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="bg-ivory">
      <Container className="pb-20">
        <div className="mx-auto max-w-2xl border border-beige bg-white/40 px-6 py-12 text-center">
          <MailIcon className="mx-auto h-7 w-7 text-gold" />
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-espresso">
            Stay Inspired
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">
            Join our newsletter for stories, new pieces and special offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-beige bg-white px-4 py-3 text-sm text-espresso placeholder:text-stone/70 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors hover:bg-gold-dark"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
