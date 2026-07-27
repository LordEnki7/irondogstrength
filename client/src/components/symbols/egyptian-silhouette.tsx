import egyptianSilhouetteImg from "@assets/eygpt_1752844613389.jpeg";

// Egyptian Silhouette - represents ancient wisdom and transformation
export default function EgyptianSilhouetteSymbol() {
  return (
    <div className="w-full h-full relative">
      <img 
        src={egyptianSilhouetteImg} 
        alt="Egyptian Silhouette" 
        className="w-full h-full object-contain opacity-30 filter grayscale"
        style={{
          filter: 'grayscale(100%) contrast(150%) brightness(0.3)',
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}