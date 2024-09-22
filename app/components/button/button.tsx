import {Button as ShadCnButton} from '@/components/ui/button.tsx';

import type {ButtonProps} from './common.ts';

export default function Button({children}: ButtonProps) {
  return (
    <ShadCnButton
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transform hover:scale-105"
    >
      {/* Glowing Border Animation */}
      <span className="absolute inset-0 w-full h-full border-2 border-transparent rounded-lg group-hover:border-blue-400 transition-all duration-300 ease-in-out"></span>

      {/* Inner Glowing Effect */}
      <span className="absolute inset-0 w-full h-full bg-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>

      {/* Button Content */}
      <span className="relative z-10">{children}</span>
    </ShadCnButton>
  );
}
