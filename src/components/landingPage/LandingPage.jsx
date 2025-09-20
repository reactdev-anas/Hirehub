import React from 'react'
import NavBar from '../navBar/NavBar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router'
import companies from '../data/companies.json'
import accordian from '../data/accordian.json'
import Autoplay from 'embla-carousel-autoplay'
import { toast } from "sonner"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCredentials=()=>{
    const getCredentials = JSON.parse(sessionStorage.getItem('loggedInDetail'))
    if( !getCredentials  || getCredentials.role !== 'user'){
    toast.warning("No user logged In, login first")
    navigate('/')
    return
    } else{
      navigate('/find-job')
    }
  }

  const handlePostCredentials=()=>{
     const getCredentials = JSON.parse(sessionStorage.getItem('loggedInDetail'))
     if( !getCredentials  || getCredentials.role !== 'recruiter'){
      toast.warning('No user logged In, login first')
      navigate('/')
     } else {
      navigate('/post-job')
     }
  }
  return (
    <>
      {/* ✅ FULL PAGE OVERFLOW-X FIX */}
      <div className="overflow-x-hidden w-full">

        {/* ✅ HEADER */}
        <header>
          <NavBar />
        </header>

        {/* ✅ HERO SECTION */}
        

        <section role='hero-section' className='w-screen p-5 mt-7 flex items-center justify-between flex-col'>
        <p className="font-semibold text-center text-5xl max-w-2xl tracking-wide leading-tight">
          Find Your Dream Job and Get Hired
        </p>
        <p className="text-lg mt-6 text-muted-foreground">
          Explore thousands of job listings or find the perfect candidate
        </p>
        <div className="btn">
         
            <Button variant='blue' onClick={handleCredentials}>Find Jobs</Button>
         
            <Button variant='red' onClick={handlePostCredentials} >Post Jobs</Button>

        </div>
      </section>

        {/* ✅ COMPANY CAROUSEL */}
        <section
          role="company-carousel"
          className="w-full px-5 sm:px-8 mt-7  overflow-x-hidden"
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full py-4 px-2 sm:py-6 sm:px-6 lg:py-16 lg:px-10"
          >
            <CarouselContent className="flex gap-5 sm:gap-20 items-center">
              {companies.map((company, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 lg:basis-1/6 flex justify-center"
                >
                  <img
                    src={company.path}
                    alt={company.name}
                    className="h-12  sm:h-14 object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Hero Banner */}
        <img src="/companies/hired.jpg" alt="" className='px-3 sm:px-3 md:px-0 lg:px-0 max-h-96 sm:max-h-80 md:max-h-2/3 lg:max-h-2/3 xl:max-h-2/3 mt-8 mx-auto' />


        

        {/* ✅ FAQ ACCORDION */}
        <section
          role="accordion"
          className="w-full px-4 sm:px-8 py-10 mt-7 overflow-x-hidden"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {accordian.map((accor, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-300 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium text-gray-800 transition-all duration-300 break-words">
                    {accor.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-700 bg-white break-words">
                    {accor.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
     

        {/* ✅ FOOTER PLACEHOLDER */}
        <footer role="copy-right" className="w-full py-10 text-center text-gray-500">
          &copy; {new Date().getFullYear()} HireHub. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default LandingPage

