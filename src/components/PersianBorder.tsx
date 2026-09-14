export function PersianBorder({ position = 'top' }: { position?: 'top' | 'bottom' | 'both' }) {
  const tileImage = "https://image.qwenlm.ai/generated-images/0c9ea907-74b3-4e0f-a51f-bf79f1fa1f71/_result.png";

  if (position === 'both') {
    return (
      <>
        <div 
          className="w-full h-20 bg-cover bg-repeat-x"
          style={{ backgroundImage: `url(${tileImage})` }}
        />
        <div 
          className="w-full h-20 bg-cover bg-repeat-x rotate-180 mt-auto"
          style={{ backgroundImage: `url(${tileImage})` }}
        />
      </>
    );
  }

  return (
    <div 
      className={`w-full h-20 bg-cover bg-repeat-x ${position === 'bottom' ? 'rotate-180' : ''}`}
      style={{ backgroundImage: `url(${tileImage})` }}
    />
  );
}

export function PersianSideBorder({ position = 'right' }: { position?: 'right' | 'left' }) {
  const sideTileImage = "https://image.qwenlm.ai/generated-images/b0df7df2-eca0-4588-b1dd-2feafd3f25a0/_result.png";

  return (
    <div 
      className={`hidden lg:block fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-16 z-30 pointer-events-none bg-cover bg-repeat-y`}
      style={{ backgroundImage: `url(${sideTileImage})` }}
    />
  );
}


