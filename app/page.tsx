import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-white py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="https://lwteensministrytrainingportal.org/images/itplc-2025-new.png" 
            alt="ITPLC 2025 Logo" 
            className="mx-auto w-96 h-96 object-contain mb-4 animate-fade-in-scale drop-shadow-2xl"
          />
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-text-shimmer">
            NCZ1 ITPLC 2025 Registration Portal
          </h1>
          <p className="text-gray-600 text-xl font-medium tracking-wide">
            International Teens, Pastors' & Leaders Conference
          </p>
        </div>
        <div className="flex justify-end mb-6">
          <Link href="/delegates">
            <Button variant="outline" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              View Delegates
            </Button>
          </Link>
        </div>
        <Card className="shadow-2xl border-t-4 border-blue-500 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
              Delegate Registration Form 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 ITPLC. Built with ❤️ in NCZ1
        </div>
      </div>
    </main>
  );
}