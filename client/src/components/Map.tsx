export function Map() {
  // Coordenadas de Céu Azul, MG
  const latitude = -19.4833;
  const longitude = -42.6833;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-border shadow-md">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>
  );
}
