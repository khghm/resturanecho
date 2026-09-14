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


