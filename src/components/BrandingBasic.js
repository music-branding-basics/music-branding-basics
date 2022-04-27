import * as React from 'react';

export default function BrandingBasic({index, title, children}) {
  return (
    <div className="text-center md:max-w-lg mx-auto ">
      <div className="mb-4">
        <div className="inline-block aspect-square w-auto">
          <span className="bg-[#F9F5FF] aspect-square rounded-full block p-1 align-middle flex items-center justify-center">
            <span className="bg-[#F4EBFF] aspect-square rounded-full block w-10 h-10 align-middle flex items-center justify-center text-primary-dark font-bold">
              <span>{index}</span>
            </span>
          </span>
        </div>
      </div>
      <h3 className="text-black font-medium text-base mb-1">{title}</h3>
      <p className="text-sm text-dark">{children}</p>
    </div>
  );
}
