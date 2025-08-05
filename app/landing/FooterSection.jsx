'use client';
import Link from "next/link";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const GymLanding = () => {
    return (
        < footer className = "bg-primary py-12" >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-black mb-4">PowerGym</h3>
                        <p className="text-black/80">
                            Transform your life with our world-class fitness programs and expert guidance.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-black/80 hover:text-black">About</Link></li>
                            <li><Link href="#" className="text-black/80 hover:text-black">Programs</Link></li>
                            <li><Link href="#" className="text-black/80 hover:text-black">Trainers</Link></li>
                            <li><Link href="#" className="text-black/80 hover:text-black">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-black mb-4">Contact Info</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 text-black mr-2" />
                                <span className="text-black/80">(555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 text-black mr-2" />
                                <span className="text-black/80">info@powergym.com</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-black mr-2" />
                                <span className="text-black/80">123 Fitness St, City</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-black mb-4">Hours</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 text-black mr-2" />
                                <span className="text-black/80">Mon-Fri: 5AM-11PM</span>
                            </div>
                            <div className="text-black/80 ml-6">Sat-Sun: 7AM-9PM</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-black/20 pt-8 text-center">
                    <p className="text-black/80">© 2024 PowerGym. All rights reserved.</p>
                </div>
            </div>
            </footer >
    );
};

export default GymLanding;