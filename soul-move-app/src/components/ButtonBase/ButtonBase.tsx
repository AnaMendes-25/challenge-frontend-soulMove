import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'xl';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'xl', 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // Classes base otimizadas sem shadow
  const baseClasses = "font-['Inter'] font-semibold flex justify-center items-center gap-2 overflow-hidden rounded-3xl transition-all duration-300 ease-out cursor-pointer active:scale-95";
  
  // Variantes sem sombras, apenas com transição de cor e leve elevação
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white outline outline-1 outline-offset-[-1px] outline-blue-600 hover:bg-blue-700 hover:-translate-y-0.5" 
    : "bg-transparent text-blue-600 outline outline-1 outline-blue-600 hover:bg-blue-50 hover:-translate-y-0.5";

  const sizeClasses = size === 'xl' 
    ? "px-5 py-3 text-base leading-6" 
    : "px-4 py-2 text-sm leading-5";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}