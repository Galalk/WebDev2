const dialog = document.querySelector("dialog")
const btnClose = document.querySelector('#close');
const para = dialog.querySelector("p")
const form = document.querySelector("form")


btnClose.addEventListener("click", (evt) => dialog.close())


form.addEventListener("submit", (evt) => {
  evt.preventDefault()
  para.textContent = ""
  dialog.showModal()
  para.insertAdjacentHTML(
    "beforeend",
    `Thank you <b>${form.elements.contactname.value}</b> for the information`
  )
  para.insertAdjacentHTML(
    "beforeend",
    `<br>We will contact you by email at <b>${form.elements.email.value}</b>`
  )
  para.insertAdjacentHTML(
    "beforeend",
    `<br>The event is being held in <b>${form.elements.region.value}</b>`
  )

  if (form.elements.timetocall.value !== "never") {
    para.insertAdjacentHTML(
      "beforeend",
      `<br>We will contact you in the <b>${form.elements.timetocall.value}</b>`
    )
  } else para.insertAdjacentHTML("beforeend", `<br>We will NEVER contact you`)
  if (form.elements.publicize.checked) {
    para.insertAdjacentHTML(
      "beforeend",
      `<br>You are happy to publicize the event outside BubbleUnder.com`
    )
  } else
    para.insertAdjacentHTML(
      "beforeend",
      `<br>We will publicize within BubbleUnder.com only`
    )
})
