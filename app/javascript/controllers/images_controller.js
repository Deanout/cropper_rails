import { Controller } from "@hotwired/stimulus";
import Cropper from "cropperjs";

// Connects to data-controller="images"
export default class extends Controller {
  static targets = ["source", "output", "cropButton"];
  connect() {
    this.sourceTarget.addEventListener("load", () => {
      console.log("Image loaded");
      this.createCropper();
    });
  }

  createCropper() {
    this.cropper = new Cropper(this.sourceTarget, {
      autoCropArea: 1,
      aspectRatio: 1,
      viewMode: 0,
      dragMode: "move",
      responsive: true,
    });
  }

  click = (e) => {
    e.preventDefault();

    this.outputTarget.src = this.cropper
      .getCropperSelection()
      .$toCanvas()
      .then((canvas) => {
        this.outputTarget.src = canvas.toDataURL();
        this.postToAPI(canvas.toDataURL());
      });
  };

  postToAPI(croppedData) {
    const photo_id = this.data.get("id");
    const dataURL = croppedData;

    fetch(`/croppable/${photo_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
      body: JSON.stringify({
        photo: {
          cropped_image: dataURL,
        },
      }),
    });
  }
}
