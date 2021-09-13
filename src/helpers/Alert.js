const Swal = require("sweetalert2");

export default {
  mixin(status, msg) {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    let backgroundColor = "#fff";
    if (status === "success") {
      backgroundColor = "#D1FAE5";
    } else if (status === "error") {
      backgroundColor = "#FEE2E2";
    } else if (status === "info") {
      backgroundColor = "#EFF6FF";
    }
    Toast.fire({
      icon: status,
      title: msg,
      background: backgroundColor,
    });
  },

  async window(status, title, text) {
    let res = Swal.fire({
      icon: status,
      title: title,
      text: text,
    }).then((result) => {
      return result.isConfirmed;
    });
    return res;
  },

  async yesNo(text) {
    let res = await Swal.fire({
      title: "Are you sure?",
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      return result.isConfirmed;
    });
    return res;
  },
};
