<template>
  <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }">
    <div class="apartment-card">
      <div class="apartment-image">
        <slot></slot>
      </div>
      <div class="card-body">
        <p class="city">{{ apartment.city }},
          <span class="additional-info">
            {{ apartment.region }}, {{ apartment.country }}
          </span>
        </p>
        <p class="name">{{ apartment.name }}</p>
        <p class="distance" v-show="apartment.distance">
          {{ apartment.distance }} kilometers away
        </p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    apartment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      BASE_URL_COVER_IMG: "http://127.0.0.1:8000/storage/cover_images/",
    };
  },
};
</script>
<style lang="scss" scoped>
.apartment-card {
  background-color: white;
  transition: all 2s;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  // &:hover {
  //   animation-name: card-scale;
  //   animation-duration: 0.3s;
  //   animation-timing-function: linear;
  //   animation-delay: -0.1s;
  //   animation-fill-mode: forwards;
  // }
}

.apartment-image {
  object-fit: cover;
  display: block;
  width: 100%;
  aspect-ratio: 3/2;
}

.card-body {
  font-size: 12px;
  padding: 6px;

  p {
    margin: 0;
    padding: 0;
  }

  .city {
    font-size: 14px;
    font-weight: 800;
  }

  .additional-info {
    font-size: 14px;
    font-weight: 600;
  }

  .name {
    font-size: 13px;
    font-weight: 400;
    color: rgb(122, 122, 122);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .distance {
    font-size: 13px;
    font-weight: 500;
    color: rgb(26, 26, 26);
  }
}

// Keyframes

@keyframes card-scale {
  100% {
    transform: scale(102%);
  }
}
</style>
