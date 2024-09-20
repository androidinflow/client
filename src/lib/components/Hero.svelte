<script>
  import BoxReveal from "./BoxReveal.svelte";
</script>

<div class="h-full w-full max-w-[32rem] md:max-w-[40rem] flex flex-col items-center justify-center overflow-hidden pt-8 text-center">
  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
    <p class="text-[3.5rem] md:text-[5rem] font-semibold">
      CS2<span class="text-[#5046e6]">.</span>
    </p>
  </BoxReveal>

  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
    <h2 class="mt-[.5rem] text-[1.5rem] md:text-[2rem]">
      Your ultimate <span class="text-[#5046e6]">intel source</span>
    </h2>
  </BoxReveal>

  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
    <div class="mt-[1.5rem]">
      <p class="text-lg md:text-2xl">
        Latest news & updates<br />
        Pro tips & strategies<br />
        Exclusive events
      </p>
    </div>
  </BoxReveal>

  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
    <!-- <Button class="mt-[1.6rem] bg-[#5046e6]">Explore</Button> -->
  </BoxReveal>
</div>
