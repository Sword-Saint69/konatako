import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const [activeAdvantage, setActiveAdvantage] = useState(2)
  const [activeInnovation, setActiveInnovation] = useState(0)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeFaq, setActiveFaq] = useState(0)

  const advantages = [
    { text: 'MODERN ARCHITECTURE & TECHNOLOGY' },
    { text: 'EFFICIENT LAYOUT DESIGN' },
    { text: 'SHORT IMPLEMENTATION TIME' },
    { text: 'YEARS OF GUARANTEE' },
    { text: 'MODERN ARCHITECTURE & TECHNOLOGY' }
  ]

  const innovations = [
    { num: '01', title: 'COMFORT & SPACE', desc: 'Alkan house is an 84 m2 residential space with an optimal layout of rooms and modern design.', img: '/innovation_interior.png' },
    { num: '02', title: 'QUALITY & CRAFTSMANSHIP', desc: 'Premium materials built to last generations.', img: '/innovation_interior.png' },
    { num: '03', title: 'WEB3 OWNERSHIP', desc: 'Digital asset ownership and verification platform.', img: '/innovation_interior.png' },
    { num: '04', title: 'ENERGY NET ZERO', desc: 'Fully sustainable footprint with solar array integration.', img: '/innovation_interior.png' },
    { num: '05', title: 'MARKETPLACE', desc: 'Connect with verified real estate assets.', img: '/innovation_interior.png' },
    { num: '06', title: 'AFFORDABLE PRICES', desc: 'Accessible luxury through modular efficiency.', img: '/innovation_interior.png' }
  ]

  const galleryImages = [
    { num: '01', src: '/proj_1.png' },
    { num: '02', src: '/proj_2.png' },
    { num: '03', src: '/proj_3.png' },
    { num: '04', src: '/proj_4.png' }
  ]

  const projectList = [
    { num: '02', name: 'SUNSET PLAZA DRIVE' },
    { num: '03', name: 'HIGH-END VILLA OVERLOOKING' },
    { num: '04', name: 'CLIFFWOOD AVENUE' }
  ]

  const faqs = [
    { q: 'Can the house be modified?', a: 'No. Within a long-running, modifications are not allowed as any modification made will still be entirely on our workmanship.' },
    { q: 'How does the complete construction process work?', a: 'Our team handles everything from foundations to finishing touches. Detailed schedule provided upon signing.' },
    { q: 'Does the building site need to be equipped?', a: 'Yes, basic utilities like water and temporary power must be available at the boundaries.' },
    { q: 'How much do I have to pay and when?', a: 'We follow a milestone-based payment structure. 30% upfront, 40% at lock-up, and 30% upon completion.' },
    { q: 'Do I need a building permit?', a: 'Yes, local permits are required. We assist with all necessary documentation and applications.' }
  ]

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    let ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to('.hero-bg img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // Hero Title reveal
      gsap.fromTo('.hero-content h1', { y: 150, skewY: 10, opacity: 0 }, { y: 0, skewY: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 })

      // Magnetic Buttons
      const buttons = document.querySelectorAll('.hero-cta, .project-cta-arrow, .cta-big-arrow')
      buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
        })
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
        })
      })

      // Image Parallax for gallery
      gsap.utils.toArray('.gallery-card img').forEach(img => {
        gsap.fromTo(img, { y: -50 }, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            scrub: true
          }
        })
      })

      // Standard section reveals
      gsap.fromTo('.testimonial-label, .testimonial-quote, .testimonial-attribution', 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: '.testimonial-section', start: 'top 85%' },
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out'
        }
      )

      gsap.fromTo('.advantages-image-bg', 
        { scale: 1.2, opacity: 0 },
        {
          scrollTrigger: { trigger: '.advantages-section', start: 'top 80%' },
          scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out'
        }
      )

      gsap.fromTo('.cta-headline', 
        { xPercent: -20, opacity: 0 },
        {
          scrollTrigger: { trigger: '.footer-cta', start: 'top 80%', scrub: 1 },
          xPercent: 0, opacity: 1, ease: 'none'
        }
      )
    }, containerRef)

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef}>
      <header className="hero-section">
        <div className="hero-bg">
        <div className="hero-overlay"></div>
      </div>
      
      <nav className="navbar container">
        <div className="nav-left">
          <button className="menu-btn">MENU</button>
        </div>
        <div className="nav-center">
          <span className="logo">KONTAKO</span>
        </div>
        <div className="nav-right">
          <button className="contact-btn">CONTACT US</button>
        </div>
      </nav>

      <div className="hero-content container">
        <div className="text-block">
          <h1 className="headline">
            THE FUTURE<br/>OF HOME LIVING.
          </h1>
          <p className="sub-headline">
            Transform with your dreams. We are ready to help you build the<br/>
            dream property that will be your future.
          </p>
        </div>
        
        <button className="cta-arrow" aria-label="Learn more">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>
      </header>

      <section className="testimonial-section">
        <div className="testimonial-label">
          FOR YOU, FOR YOUR DREAMS
        </div>
        
        <div className="testimonial-quote">
          <span className="quote-mark">&ldquo;</span> Kontako is committed to providing the best service in meeting your property needs for your future <span className="quote-mark">&rdquo;</span>
        </div>
        
        <div className="testimonial-attribution">
          <img src="/avatar_kianna.png" alt="Kianna Curtis" className="testimonial-avatar" />
          <div className="testimonial-author">
            <div className="author-name">Kianna Curtis</div>
            <div className="author-title">Founder Whitestar</div>
          </div>
        </div>
      </section>

      <section className="advantages-section">
        <div className="container">
          <div className="section-label">WHY DOES IT HAVE TO BE KONTAKO?</div>
          
          <div className="advantages-content">
            <div className="advantages-image-bg">
              <div className="adv-image-overlay"></div>
              <h3 className="adv-headline">
                TAKE A BIG STEP INTO<br/>THE FUTURE OF<br/>LIVING
              </h3>
            </div>
            
            <div className="advantages-card">
              <h2 className="advantages-title">OUR ADVANTAGES</h2>
              
              <ul className="advantages-list">
                {advantages.map((adv, idx) => (
                  <li 
                    key={idx} 
                    className={`adv-item ${idx === activeAdvantage ? 'active' : ''}`}
                    onClick={() => setActiveAdvantage(idx)}
                  >
                    <span className="adv-text">{adv.text}</span>
                    {idx === activeAdvantage && <span className="adv-arrow">&rarr;</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="innovations-section">
        <div className="container innovations-container">
          <div className="innovations-left">
            <div className="section-label">INNOVATION ON MULTIPLE LEVELS</div>
            <h2 className="innovation-title">
              {innovations[activeInnovation].title.split(' & ').map((part, i) => (
                <span key={i}>{part}{i === 0 && ' & ' && <br/>}</span>
              ))}
            </h2>
            
            <div className="innovation-image-wrapper">
              <img src={innovations[activeInnovation].img} alt={innovations[activeInnovation].title} className="innovation-image" />
            </div>
            
            <div className="innovation-desc-row">
              <div className="innovation-active-num">{innovations[activeInnovation].num}</div>
              <p className="innovation-desc">{innovations[activeInnovation].desc}</p>
            </div>
          </div>
          
          <div className="innovations-right">
            {innovations.map((inn, idx) => {
              if (idx === activeInnovation) return null;
              return (
                <div 
                  key={inn.num} 
                  className="innovation-tab"
                  onClick={() => setActiveInnovation(idx)}
                >
                  <div className="tab-num">{inn.num}</div>
                  <div className="tab-text-wrapper">
                    <div className="tab-text">{inn.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="section-label">OUR PROJECT</div>
          
          <div className="project-header">
            <h2 className="project-title">PEDRO RESIDENCE</h2>
            <p className="project-subtext">
              Pedro Residence is a comfortable and elegant<br/>
              residence, offering spectacular views from its windows
            </p>
            <button className="project-cta-arrow" aria-label="View project">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="project-gallery-wrapper">
            <div className="gallery-watermark">RESI</div>
            <div className="project-gallery">
              {galleryImages.map((img, idx) => (
                <div key={idx} className={`gallery-card card-${idx}`}>
                  <span className="card-num">{img.num}</span>
                  <img src={img.src} alt={`Project view ${img.num}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="project-list">
            {projectList.map((proj) => (
              <div 
                key={proj.num} 
                className="project-list-item"
                onMouseEnter={() => setHoveredProject(proj.num)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="proj-name">{proj.name}</div>
                <div className="proj-num">{proj.num}</div>
                {hoveredProject === proj.num && (
                  <img src={`/proj_${parseInt(proj.num)}.png`} alt={proj.name} className="proj-hover-img" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <div className="section-label">FAQ'S</div>
            <h2 className="faq-title">COMMON QUESTIONS</h2>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'open' : ''}`}>
                <div 
                  className="faq-question-row" 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <h3 className="faq-question">{faq.q}</h3>
                  <div className="faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {activeFaq === idx ? (
                        <polyline points="18 15 12 9 6 15"></polyline>
                      ) : (
                        <polyline points="6 9 12 15 18 9"></polyline>
                      )}
                    </svg>
                  </div>
                </div>
                <div className="faq-answer-wrapper" style={{ maxHeight: activeFaq === idx ? '100px' : '0' }}>
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="footer-cta">
        <div className="cta-gallery">
          <img src="/proj_1.png" alt="Building 1" className="cta-img" />
          <img src="/proj_2.png" alt="Building 2" className="cta-img" />
          <img src="/proj_3.png" alt="Building 3" className="cta-img" />
          <img src="/proj_4.png" alt="Building 4" className="cta-img" />
        </div>
        
        <div className="cta-text-wrapper container">
          <h2 className="cta-headline">
            LET'S TALK
            <button className="cta-big-arrow" aria-label="Contact us">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </h2>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>KONTAKO<br/>THE FUTURE OF<br/>HOME LIVING</h3>
            </div>
            
            <div className="footer-nav">
              <div className="footer-col">
                <h4>MAIN PAGES</h4>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
              </div>
              <div className="footer-col">
                <h4>ADVANTAGES</h4>
                <a href="#">Innovation</a>
                <a href="#">Projects</a>
                <a href="#">FAQ</a>
              </div>
              <div className="footer-col">
                <h4>CONTACT US</h4>
                <a href="#">Email</a>
                <a href="#">Phone</a>
                <a href="#">Location</a>
              </div>
            </div>
            
            <div className="footer-social">
              <div className="social-icon">IN</div>
              <div className="social-icon">TW</div>
              <div className="social-icon">FB</div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} KONTAKO. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
