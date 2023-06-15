<script>
  const { ipcRenderer } = require("electron");

  import { installConfigData } from "../../stores.mjs";
</script>

<div class="row">
  <div class="col-6">
    <img
      src={`./img/formfactor/${$installConfigData.formfactor}.svg`}
      alt={`${$installConfigData.formfactor}.svg`}
      style="height: 350px; margin: auto; display: block;"
    />
  </div>
  <div class="col-6">
    <h4 style="font-weight: bold;">Success!</h4>
    <p>
      The installation process from the computer is done. The device will now reboot and you can begin to
      explore Droidian.
    </p>
    <p>
      Found something you don't like?<br /><a
        href="https://t.me/DroidianLinux">Tell us</a
      >, or help us change it!
    </p>
    <p>
      Got more devices you want to flash?
      <button
        class="btn btn-info"
        style="width: 100%;"
        on:click={() => ipcRenderer.send("restart")}
        >Flash another device!</button
      >
    </p>
  </div>
</div>
