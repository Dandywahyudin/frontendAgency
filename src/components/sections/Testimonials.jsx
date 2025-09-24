// src/components/sections/Testimonials.jsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonialsData = [
    {
        quote: "Working with DigiAgency was a game-changer. Their strategies doubled our online engagement in just three months!",
        name: "Sarah Johnson",
        title: "CEO, Tech Innovators",
        img: "https://via.placeholder.com/100x100.png?text=Client+1"
    },
    {
        quote: "The new website they built for us is not only beautiful but also incredibly fast and user-friendly. Our conversion rates have skyrocketed.",
        name: "Mark Lee",
        title: "Founder, Urban Style Co.",
        img: "https://via.placeholder.com/100x100.png?text=Client+2"
    },
    {
        quote: "Their team's creativity and attention to detail are unmatched. They truly understood our brand and brought our vision to life.",
        name: "Emily Chen",
        title: "Marketing Director, HealthFirst",
        img: "https://via.placeholder.com/100x100.png?text=Client+3"
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 px-6 md:px-20 bg-brand-light">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
                <p className="text-gray-600 mb-12">We are trusted by leading brands and startups.</p>
                
                <Carousel
                    plugins={[Autoplay({ delay: 5000 })]}
                    opts={{ align: "start", loop: true }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonialsData.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col items-center text-center p-6">
                                            <img src={testimonial.img} alt={testimonial.name} className="w-24 h-24 rounded-full mb-4" />
                                            <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                                            <span className="font-bold">{testimonial.name}</span>
                                            <span className="text-sm text-gray-500">{testimonial.title}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;