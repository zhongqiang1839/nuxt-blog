<template>
  <div class="particles-background" id="particles-background"></div>
</template>
<script>
export default {
  name: 'fn-background',
  data () {
    return {
    }
  },
  methods: {
    genBackground() {
      window.particlesJS('particles-background', {
        particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: '#bfbfbf',
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#ffffff',
            },
            polygon: {
              nb_sides: 10,
            },
            image: {
              src: 'img/github.svg',
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 15,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 300,
            color: '#c5c5c5',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
              mode: 'repulse',
            },
            onclick: {
              enable: false,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 0.8471528471528471,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    },
  },

  mounted () {
    this.genBackground();
  }
}
</script>

<style lang="less" scoped>

  .particles-background {
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }

</style>
