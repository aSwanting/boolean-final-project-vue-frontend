<template>
  <router-link
    :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
  >
    <div class="apartment-card">
      <figure>
        <img
          class="apartment-image"
          :src="`${BASE_URL_COVER_IMG}${apartment.cover_image}`"
          alt=""
        />
      </figure>
      <div class="card-body">
        <p class="address">{{ apartment.region }}, {{ apartment.country }}</p>
        <p class="name">{{ apartment.name }}</p>
        <p v-show="apartment.distance" class="apartment-info">
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
  //   max-width: 260px;
  background-color: white;
  transition: all 2s;
  //   border: 2px solid;

  &:hover {
    animation-name: card-scale;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    animation-delay: -0.1s;
    animation-fill-mode: forwards;
  }
}

.apartment-image {
  object-fit: cover;
  display: block;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 3/2;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.322);
}

.card-body {
  font-size: 12px;
  padding: 6px;

  .name {
    font-weight: 300;
    color: rgb(122, 122, 122);
  }
}

.address {
  font-weight: bold;
}

// Keyframes

@keyframes card-scale {
  100% {
    transform: scale(102%);
  }
}
</style>
