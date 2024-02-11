<template>
  <div class="carousel-wrapper">
    <div
      class="img-frame left"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="images[prevImage]" alt="" />
    </div>
    <div
      class="img-frame center"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="images[currentImage]" alt="" />
    </div>
    <div
      class="img-frame right"
      :class="{ 'moving-left': carouselNext, 'moving-right': carouselPrev }"
    >
      <img :src="images[nextImage]" alt="" />
    </div>
    <div v-if="apartment.images.length" class="carousel-controls">
      <div class="nav">
        <div class="nav-arrow" @click.prevent="carouselPrev = true">
          <font-awesome-icon icon="circle-chevron-left" />
        </div>
        <div class="nav-arrow" @click.prevent="carouselNext = true">
          <font-awesome-icon icon="circle-chevron-right" />
        </div>
      </div>
      <div class="carousel-icons">
        <div v-for="(item, index) in images" :key="item.id">
          <div
            class="carousel-icon"
            :class="{ active: index === currentImage }"
            @click.prevent="currentImage = index"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apartment: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      currentImage: 0,
      carouselNext: false,
      carouselPrev: false,
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
  computed: {
    images() {
      const paths = [];
      paths.push(
        "http://127.0.0.1:8000/storage/cover_images/" +
          this.apartment.cover_image
      );
      const images = this.apartment.images;
      images.forEach((image) => {
        console.log("http://127.0.0.1:8000/storage/images/" + image.link);
        paths.push("http://127.0.0.1:8000/storage/images/" + image.link);
      });
      return paths;
    },
    prevImage() {
      return this.currentImage ? this.currentImage - 1 : this.images.length - 1;
    },
    nextImage() {
      return this.currentImage < this.images.length - 1
        ? this.currentImage + 1
        : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-wrapper {
  overflow: hidden;
  border-radius: 10px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.377);
  &:hover .carousel-controls .nav {
    opacity: 1;
  }

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
      padding: 20px;
      flex: 1;
      opacity: 0%;
      transition: 400ms all;

      .nav-arrow {
        cursor: pointer;
        font-size: 23px;
        color: white;
        filter: drop-shadow(2px 5px 6px rgba(0, 0, 0, 0.4));
        opacity: 80%;
        transition: 200ms all;
        &:hover {
          opacity: 100%;
        }
      }
    }
    .carousel-icons {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(5px);
      position: absolute;
      width: 100%;
      bottom: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      .carousel-icon {
        width: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: white;
        opacity: 60%;
        transition: all 200ms;
      }
      & .active {
        opacity: 100%;
      }
    }
  }
}
</style>
