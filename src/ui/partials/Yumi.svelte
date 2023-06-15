<script>
  let droidianFoot = true;
  let droidianSide = false;

  export function setPosition(position) {
    switch (position) {
      case "foot":
        droidianFoot = true;
        droidianSide = false;
        break;

      case "side":
        droidianFoot = false;
        droidianSide = true;
        break;

      case "center":
        droidianFoot = false;
        droidianSide = false;
        break;

      default:
        break;
    }
  }
</script>

<img
  src="./img/droidian.svg"
  alt="droidian"
  class="droidian"
  class:droidian-foot={droidianFoot}
  class:droidian-side={droidianSide}
  width="100"
/>

<style>
  .droidian {
    bottom: 50%;
    right: 50%;
    margin-bottom: -50px;
    margin-right: -50px;
    text-align: center;
    position: absolute;
    z-index: 1;
    -webkit-transition: all 0.7s ease;
    -moz-transition: all 0.7s ease;
    -o-transition: all 0.7s ease;
    transition: all 0.7s ease;
    image-rendering: crisp-edges;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0) scale(1, 1);
    transform: translateZ(0) scale(1, 1);
  }

  .droidian-foot {
    bottom: 20px !important;
    position: absolute;
    right: 1.5rem !important;
    width: 3.2rem !important;
    margin: 0;
  }

  .droidian-side {
    position: absolute;
    right: 62% !important;
    bottom: 35% !important;
    width: 118px !important;
  }
</style>
