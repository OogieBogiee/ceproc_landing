export const es = {
  meta: {
    title: 'Asociación CEPROC - Promoviendo el desarrollo sostenible',
    description: 'CEPROC Asociación: Transformando comunidades a través del desarrollo sostenible.',
  },
  nav: {
    logoAlt: 'Logo de CEPROC',
    homeLabel: 'Ir al inicio',
    menuLabel: 'Menú',
    closeLabel: 'Cerrar',
    links: [
      { href: '#inicio', label: 'Inicio', icon: 'fa-house' },
      { href: '#acerca', label: 'Acerca de nosotros', icon: 'fa-users' },
      { href: '#portafolio', label: 'Portafolio', icon: 'fa-briefcase' },
      { href: '#contacto', label: 'Contacto', icon: 'fa-phone' },
    ],
  },
  hero: {
    title: 'CEPROC',
    text: 'Sitio en construcción. Próximamente encontrarás aquí la información institucional, nuestras áreas de trabajo y los proyectos que desarrollamos en Bolivia.',
    cta: 'Contáctanos',
    imageAlt: 'Paisaje de campos verdes entre montañas',
  },
  sections: {
    about: {
      title: 'Acerca de nosotros',
      placeholder: 'Sección en desarrollo.',
    },
    portfolio: {
      title: 'Portafolio',
      placeholder: 'Sección en desarrollo.',
    },
  },
  footer: {
    contactHeading: 'Datos de contacto',
    organization: 'Centro de Promoción Comunitaria',
    contactTitle: 'Contáctanos',
    paragraphs: [
      'Al completar el formulario a continuación, estarás dando un paso importante hacia la construcción de un mundo mejor, nuestro equipo está comprometido con la transparencia y la responsabilidad.',
      'Nos esforzamos por garantizar que cada donación y acción tenga un impacto real y duradero. Valoramos y apreciamos tu compromiso, ya que nos ayuda a seguir adelante y ampliar nuestro alcance.',
      '¡Gracias por unirte a nuestro movimiento y por ser parte del cambio positivo que queremos lograr en el mundo!',
    ],
    form: {
      nameLabel: 'Nombres y apellidos',
      emailLabel: 'Correo electrónico',
      messageLabel: 'Mensaje',
      submit: 'Enviar',
      notice: 'El envío del formulario estará disponible próximamente. Mientras tanto, puedes contactarnos por WhatsApp.',
    },
    social: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100088450128142',
        icon: 'fa-facebook-f',
      },
      {
        label: 'WhatsApp',
        href: 'https://wa.me/59173082865?text=Hola,%20me%20gustar%C3%ADa%20comunicarme%20con%20CEPROC.',
        icon: 'fa-whatsapp',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/ceproc_ong/',
        icon: 'fa-instagram',
      },
    ],
    copyright: '© 2025 Asociación CEPROC. Todos los derechos reservados.',
  },
  widgets: {
    loadingLabel: 'Cargando sitio',
    whatsapp: {
      buttonLabel: 'Abrir chat de WhatsApp',
      title: 'Asociación CEPROC',
      subtitle: 'Equipo de atención',
      closeLabel: 'Cerrar chat',
      message:
        "Hola 👋, gracias por contactar con CEPROC. ¿En qué podemos ayudarte? Haz clic en 'Abrir chat' para comenzar a hablar con nosotros.",
      action: 'Abrir chat',
      href: 'https://wa.me/59173082865?text=Hola,%20necesito%20ayuda',
    },
    scrollTopLabel: 'Volver arriba',
    scrollDownLabel: 'Ir a Acerca de nosotros',
  },
} as const;

export type SiteContent = typeof es;
