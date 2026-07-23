"use client"

import Hero from "./hero"
import About from "./about"
import Services from "./services"
import FeaturedProjects from "./featured-projects"
import Investment from "./investment"
import Partners from "./partners"
import ContactForm from "./contact-form"

export default function HomeContent() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <Investment />
      <Partners />
      <ContactForm />
    </main>
  )
}
