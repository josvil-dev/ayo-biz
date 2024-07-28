import React from 'react';
import Image from 'next/image';

const Hub: React.FC = () => {
  return (
    <div className="container bg-yellow-500 mx-2 px-4 py-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Introducing Ayo ,Your Business assistant</h1>
          <p className="text-xl mb-6">
           Automated system to help Businesses provide exceptional custoomer service and support
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 border-2 border-white rounded-full text-lg">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hub;