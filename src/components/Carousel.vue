<template>
  <div class="container">
    <div class="carousel-wrapper">
      <div
        class="img-frame"
        :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
      >
        <img :src="imagePaths[prevImage]" alt="" />
      </div>
      <div
        class="img-frame"
        :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
      >
        <img :src="imagePaths[currentImage]" alt="" />
      </div>
      <div
        class="img-frame"
        :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
      >
        <img :src="imagePaths[nextImage]" alt="" />
      </div>
    </div>
    <div class="carousel-controls">
      <button @click="carouselPrev = true">prev</button>
      <button @click="carouselNext = true">next</button>
    </div>
    <div class="carousel-controls">
      <p>[prev {{ prevImage }}]</p>
      <p>[current {{ currentImage }}]</p>
      <p>[next {{ nextImage }}]</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImage: 0,
      carouselNext: false,
      carouselPrev: false,
      imagePaths: [
        "/search-hero-bg-1.jpg",
        "/search-hero-bg-2.jpg",
        "/search-hero-bg-3.jpg",
        "/search-hero-bg-4.jpg",
      ],
    };
  },
  watch: {
    carouselPrev(newValue, oldValue) {
      if (newValue)
        this.delay = setTimeout(() => {
          this.carouselPrev = oldValue;
          this.currentImage = this.prevImage;
        }, 500);
    },
    carouselNext(newValue, oldValue) {
      if (newValue)
        this.delay = setTimeout(() => {
          this.carouselNext = oldValue;
          this.currentImage = this.nextImage;
        }, 500);
    },
  },
  methods: {
    carouselAnimation() {
      console.log(this);
    },
  },
  computed: {
    prevImage() {
      return this.currentImage
        ? this.currentImage - 1
        : this.imagePaths.length - 1;
    },
    nextImage() {
      return this.currentImage < this.imagePaths.length - 1
        ? this.currentImage + 1
        : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 30px;
  text-align: center;
}
.carousel-wrapper {
  //   border: 8px solid purple;
  border-radius: 20px;
  overflow: hidden;
  width: 420px;
  aspect-ratio: 5/4;
  margin: 0 auto;
  position: relative;
  box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.377);

  .img-frame {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;

    &.moving-left {
      left: -100%;
      transition: all 500ms;
    }
    &.moving-right {
      left: 100%;
      transition: all 500ms;
    }
  }
  & > :first-child {
    left: -100%;
    &.moving-left {
      left: -200%;
      transition: all 500ms;
    }
    &.moving-right {
      left: 0%;
      transition: all 500ms;
    }
  }
  & > :last-child {
    left: 100%;
    &.moving-left {
      left: 0%;
      transition: all 500ms;
    }
    &.moving-right {
      left: 200%;
      transition: all 500ms;
    }
  }
}
</style>
