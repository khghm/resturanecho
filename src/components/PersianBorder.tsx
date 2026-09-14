export function PersianBorder() {
  const topImage = "https://image.qwenlm.ai/generated-images/0c9ea907-74b3-4e0f-a51f-bf79f1fa1f71/_result.png";
  const sideImage = "https://image.qwenlm.ai/generated-images/b0df7df2-eca0-4588-b1dd-2feafd3f25a0/_result.png";

  return (
    <>
      {/* Top Border */}
      <div 
        className="w-full h-12 sm:h-16 bg-cover bg-center bg-repeat-x flex-shrink-0"
        style={{ 
          backgroundImage: `url(${topImage})`,
          backgroundSize: 'auto 100%'
        }}
      />
      
      {/* Side Borders - Desktop Only */}
      <div 
        className="hidden lg:block fixed top-0 right-0 h-full w-12 z-[1] pointer-events-none bg-cover bg-repeat-y"
        style={{ 
          backgroundImage: `url(${sideImage})`,
          backgroundSize: '100% auto'
        }}
      />
      <div 
        className="hidden lg:block fixed top-0 left-0 h-full w-12 z-[1] pointer-events-none bg-cover bg-repeat-y"
        style={{ 
          backgroundImage: `url(${sideImage})`,
          backgroundSize: '100% auto'
        }}
      />
      
      {/* Bottom Border */}
      <div 
        className="w-full h-12 sm:h-16 bg-cover bg-center bg-repeat-x flex-shrink-0"
        style={{ 
          backgroundImage: `url(${topImage})`,
          backgroundSize: 'auto 100%',
          transform: 'scaleY(-1)'
        }}
      />
    </>
  );
}
