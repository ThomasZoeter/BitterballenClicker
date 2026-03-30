export const ParticlesConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#af9d1b" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 50, height: 50 }
    },
    opacity: {
      value: 0.809723090737089,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 39.45738208161363,
      random: false,
      anim: { enable: false, speed: 80, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6.413648243462092,
      direction: "bottom",
      random: false,
      straight: true,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 561.194221302933,
        rotateY: 561.194221302933
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "bubble" },
      resize: true
    },
    modes: {
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 97.44926547616141, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
};
