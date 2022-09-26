<template>
  <footer class="text-center text-white w-full">
   <div class="mt-6">
    <div class="flex justify-center mb-9">
        <a href="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426351/todoApp/footer/github_idekny_lui9nc.png" alt=""> </a>
        <a href="www.linkedin.com/in/adrilopmar" class="mr-9 text-gray-800"><img src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426350/todoApp/footer/linkedin-logo_hpnusw_ijkzyi.png"  alt=""> </a>
        <a href="#!" class="mr-9 text-gray-800"> <img src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426350/todoApp/footer/twitter_ce2nio_kogd7e.png"  alt=""></a>
      </div>
   </div>
    <div
      class="text-center text-gray-700 p-4 footer-copy"
    >
      © 2021 Copyright:
      <a class="text-gray-800" href="https://tailwind-elements.com/"
        >Adri</a
      >
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
footer{
background-color: var(--main-bg-color);
}
.footer-copy{
/* background-color: rgba(0, 0, 0, 0.2); */
color: var(--main-txt-color);
background-color: rgba(255, 255, 255, 0.3);
}

img{
  width: 100%;
}
a{
  width: 30px;
}
</style>
