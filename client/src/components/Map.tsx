export function Map() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-border shadow-md" style={{ height: '300px', minHeight: '300px' }}>
      <iframe
        title="Mapa ReiBurguer"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120112.14656933805!2d-44.14118145664065!3d-19.818591999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa68f5f3902ba81%3A0x27221b4ff5ba171a!2sRei%20burguer%20c%C3%A9u%20azul!5e0!3m2!1spt-BR!2sbr!4v1764503195735!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
