export function PersianBorder({ position = 'top' }: { position?: 'top' | 'bottom' | 'both' }) {
  const tileImage = "https://image.qwenlm.ai/generated-images/0c9ea907-74b3-4e0f-a51f-bf79f1fa1f71/_result.png";

  if (position === 'both') {
    return (
      <>
        <div 
          className="fixed top-0 left-0 right-0 h-16 bg-cover bg-repeat-x z-[5] pointer-events-none"
          style={{ backgroundImage: `url(${tileImage})` }}
        />
        <div 
          className="fixed bottom-0 left-0 right-0 h-16 bg-cover bg-repeat-x rotate-180 z-[5] pointer-events-none"
          style={{ backgroundImage: `url(${tileImage})` }}
        />
      </>
    );
  }

  if (position === 'top') {
    return (
      <div 
        className="fixed top-0 left-0 right-0 h-16 bg-cover bg-repeat-x z-[5] pointer-events-none"
        style={{ backgroundImage: `url(${tileImage})` }}
      />
    );
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-16 bg-cover bg-repeat-x rotate-180 z-[5] pointer-events-none"
      style={{ backgroundImage: `url(${tileImage})` }}
    />
  );
}

export function PersianSideBorder({ position = 'right' }: { position?: 'right' | 'left' }) {
  const sideTileImage = "https://image.qwenlm.ai/generated-images/b0df7df2-eca0-4588-b1dd-2feafd3f25a0/_result.png";

  return (
    <div 
      className={`hidden lg:block fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-16 z-[5] pointer-events-none bg-cover bg-repeat-y`}
      style={{ backgroundImage: `url(${sideTileImage})` }}
    />
  );
}


