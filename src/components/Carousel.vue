<template>
  <div class="carousel-wrapper">
    <div
      class="img-frame left"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="imagePaths[prevImage]" alt="" />
    </div>
    <div
      class="img-frame center"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="imagePaths[currentImage]" alt="" />
    </div>
    <div
      class="img-frame right"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="imagePaths[nextImage]" alt="" />
    </div>
    <div class="carousel-controls">
      <div class="nav">
        <button @click="carouselPrev = true">prev</button>
        <button @click="carouselNext = true">next</button>
      </div>
      <div class="carousel-icons">
        <div v-for="(item, index) in imagePaths" :key="item.id">
          <div
            class="carousel-icon"
            :class="{ active: index === currentImage }"
            @click="currentImage = index"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImage: 1,
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
  text-align: center;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    padding: 30px;
    flex: 1;
    button {
      border-radius: 9999px;
      aspect-ratio: 1;
      opacity: 0.8;
      font-size: 12px;
    }
  }
  .carousel-icons {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    .carousel-icon {
      width: 12px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: white;
      opacity: 50%;
      transition: all 500ms;
    }
    & .active {
      opacity: 100%;
    }
  }
}
.carousel-wrapper {
  overflow: hidden;
  border-radius: 20px;
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
  & .left {
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
  & .right {
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
