<template>
  <div>
    <div class="container">
      <div
        class="d-grid gap-3"
        style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"
        v-if="store.sponsoredAddressList"
      >
        <div
          v-for="apartment in store.sponsoredAddressList"
          class="position-relative"
        >
          <ApartmentCard :apartment="apartment">
            <Carousel :apartment="apartment" class="carousel-frame" />
            <div class="icon-sponsor">
              <font-awesome-icon icon="award" />
            </div>
          </ApartmentCard>
        </div>
      </div>
      <div v-else>No addresses loaded</div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import ApartmentCard from "./ApartmentCard.vue";
import Carousel from "./Carousel.vue";
export default {
  components: {
    ApartmentCard,
    Carousel,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel-frame {
  position: relative;
  border: 3px solid #ffbf00;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.25);
  transition: 200ms all;
  &:hover {
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.5);
  }
}

.icon-sponsor {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #ffbf00;
  display: block !important;
}
</style>
