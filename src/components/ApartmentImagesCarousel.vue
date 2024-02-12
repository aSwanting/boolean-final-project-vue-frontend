<template>
  <div class="carousel-wrapper" ref="carouselWrapper">
    <div class="images-wrapper" ref="imageWrapper">
      <figure v-for="(image, id) in items.images" :key="image.id">
        <img :src="`${BASE_URL_IMAGES}${image.link}`" alt="" />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      BASE_URL_IMAGES: "http://127.0.0.1:8000/storage/images/",
      perView: 3,
      delay: 2000,
      totalScroll: 0,
      autoScroll: null,
    };
  },
  mounted() {
    this.startAutoScroll();

    this.$refs.carouselWrapper.addEventListener("mouseenter", () => {
      console.log("enter");
      this.stopAutoScroll();
    });
    this.$refs.carouselWrapper.addEventListener("mouseleave", () => {
      this.startAutoScroll();
    });
  },
  unmounted() {
    this.stopAutoScroll();
  },

  methods: {
    startAutoScroll() {
      const imageWrapper = this.$refs.imageWrapper;
      const imageItems = this.$refs.imageWrapper.children;

      // Inserisci inizialmente le prime 3 immagini nel carosello
      for (let i = 0; i < 3; i++) {
        imageWrapper.insertAdjacentHTML("beforeend", imageItems[i].outerHTML);
      }

      // Avvia lo scorrimento automatico
      this.autoScroll = setInterval(this.scrolling, this.delay);
    },

    scrolling() {
      const imageWrapper = this.$refs.imageWrapper;
      const imageItems = this.$refs.imageWrapper.children;
      const imageLength = imageItems.length;

      this.totalScroll++;
      if (this.totalScroll === imageLength - 2) {
        this.totalScroll = 0;
        imageWrapper.style.transition = "0s";
        imageWrapper.style.left = "0";
      } else {
        const widthEl = imageWrapper.firstElementChild.offsetWidth + 24;
        imageWrapper.style.left = `-${this.totalScroll * widthEl}px`;
        imageWrapper.style.transition = ".3s";
      }
    },

    stopAutoScroll() {
      clearInterval(this.autoScroll);
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  position: relative;
}
.images-wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - (1.5rem * 2)) / 3);
  gap: 1.5rem;
  position: relative;
  left: 0;
  transition: 0.3s;

  figure {
    aspect-ratio: 4 / 3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 20px;
    }
  }
}
</style>
