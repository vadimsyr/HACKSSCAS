const _0x4f66a4 = _0x1bef

const canvasWidth = 300;
const canvasHeight = 350;


function _0x1bef(_0x4360c4, _0x430649) {
  const _0xef2ec6 = _0xef2e()
  return (
    (_0x1bef = function (_0x1befba, _0x58597a) {
      _0x1befba = _0x1befba - 0x123
      let _0x4943d6 = _0xef2ec6[_0x1befba]
      return _0x4943d6
    }),
    _0x1bef(_0x4360c4, _0x430649)
  )
}

import * as _0x4f73f5 from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js"
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"

!window["location"]["href"].startsWith("https://wa4ler.github.io") &&
  document["body"]["classList"].remove()

  const scene = new _0x4f73f5["Scene"](),
  camera = new _0x4f73f5["PerspectiveCamera"](
    50,
    canvasWidth / canvasHeight, // Обновляем соотношение сторон камеры
    0.1,
    1000
  ),
  renderer = new _0x4f73f5["WebGLRenderer"]({
    alpha: true,
    antialias: true,
  })

renderer.setSize(canvasWidth, canvasHeight); // Устанавливаем размер канваса
renderer["setPixelRatio"](window["devicePixelRatio"]),
document["getElementById"]("container3D")["appendChild"](
  renderer["domElement"]
),
scene.add(new _0x4f73f5["AmbientLight"](0xffffff, 1))

const addDirectionalLight = (x, y, z, intensity) => {
    const light = new _0x4f73f5["DirectionalLight"](0xffffff, intensity)
    light.position.set(x, y, z)
    scene.add(light)
  },
  addPointLight = (x, y, z, intensity) => {
    const light = new _0x4f73f5["PointLight"](0xffffff, intensity, 1200)
    light.position.set(x, y, z)
    scene.add(light)
  }

addDirectionalLight(75, 75, 75, 5),
  addDirectionalLight(-75, 75, 75, 10),
  addPointLight(0, 75, 25, 8),
  addPointLight(0, -75, 25, 8)

const controls = new OrbitControls(camera, renderer["domElement"])
controls["enableZoom"] = false
controls["enableRotate"] = false
camera.position.set(0, 0, 100)
controls.update()

let coin = null
const loader = new GLTFLoader()
loader.load(
  "scene.gltf",
  function (gltf) {
    coin = gltf.scene
    coin.scale.set(30, 30, 30)
    coin.position.y = -3
    scene.add(coin)
    document.body.classList.remove("hidden")
    animate()
  },
  undefined,
  function (error) {
    console.error("An error occurred while loading the model", error)
  }
)

function animate() {
  requestAnimationFrame(animate)
  !flipping && coin && (coin.rotation.y += 0.03)
  renderer.render(scene, camera)
}

let flipping = false,
  flipStartTime = 0,
  clickCount = 0
const flipDuration = 2000

function getLanguageText(key, language) {
  if (!text[language] || !text[language][key]) return text["en"][key]
  return text[language][key]
}

function startFlip() {
  !window["location"]["href"].startsWith("https://wa4ler.github.io") &&
    document.body.classList.remove("hidden")
  if (clickCount > 6) {
    handleReset()
    return
  }
  if (!flipping && coin) {
    document.getElementById("resultText").textContent = ""
    flipping = true
    flipStartTime = performance.now()
    flipCoin()
  }
}

function flipCoin() {
  requestAnimationFrame(function (time) {
    if (flipping) {
      let elapsedTime = time - flipStartTime,
        progress = elapsedTime / flipDuration
      if (progress < 1) {
        let height = -3 + 15 * Math.sin(Math.PI * progress),
          rotation = Math.PI * 10 * progress
        coin.position.y = height
        coin.rotation.y = rotation
        flipCoin()
      } else {
        flipping = false
        coin.position.y = -3
        coin.rotation.y = Math.PI * 10
        const urlParams = new URLSearchParams(window.location.search),
          language = urlParams.get("language") || "en",
          result = Math.random() < 0.5 ? "head" : "tail",
          displayText =
            Math.random() < 0.5
              ? getLanguageText(result, language)
              : getLanguageText(result, language)
        document.getElementById("resultText").textContent = displayText
        document.getElementById("resultText").style.display = "block"
        updateImages(result)
        clickCount++
      }
    }
  })
}

function updateImages(result) {
  const images = document.querySelectorAll(".coin__item-coins img")
  images[clickCount].classList.add("rotate")
  if (clickCount < images.length) {
    setTimeout(() => {
      images[clickCount - 1].src = "img/coins/" + result + ".svg"
      setTimeout(() => {
        images[clickCount].classList.remove("rotate")
      }, 500)
    }, 250)
    if (clickCount + 1 < images.length) {
      images[clickCount + 1].src = "img/coins/mistic.svg"
    }
  }
}

function handleReset() {
  const resetPopup = document.getElementById("resetPopup")
  resetPopup.classList.remove("hidden")
  document.getElementById("confirmReset").onclick = function () {
    resetImages()
    clickCount = 0
    resetPopup.classList.add("hidden")
  }
  document.getElementById("cancelReset").onclick = function () {
    resetPopup.classList.add("hidden")
  }
}

function resetImages() {
  const images = document.querySelectorAll(".coin__item-coins img")
  images.forEach((img, index) => {
    img.src = index === 0 ? "img/coins/mistic.svg" : "img/coins/mistic0.svg"
  })
}

renderer.domElement.addEventListener("click", startFlip)
renderer.domElement.addEventListener("touchstart", startFlip)

const text = {
  ru: {
    head: "ОРЕЛ | HEAD",
    tail: "РЕШКА",
    confirmReset: "да",
    cancelReset: "нет",
    popupContent:
      "Вы действительно хотите начать новый раунд? Текущий прогресс будет сброшен.",
  },
  kz: {
    head: "ОРЕЛ",
    tail: "РЕШКА",
    confirmReset: "да",
    cancelReset: "нет",
    popupContent:
      "Вы действительно хотите начать новый раунд? Текущий прогресс будет сброшен.",
  },
  uk: {
    head: "ОРЕЛ",
    tail: "РЕШКА",
    confirmReset: "да",
    cancelReset: "нет",
    popupContent:
      "Вы действительно хотите начать новый раунд? Текущий прогресс будет сброшен.",
  },
  en: {
    head: "ОРЕЛ | HEADS | गरुड़",
    tail: "РЕШКА | TAILS | पूंछ",
    confirmReset: "yes",
    cancelReset: "no",
    popupContent:
      "Are you sure you want to start a new round? Your current progress will be reset.",
  },
}

window.addEventListener("resize", function () {
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

document.addEventListener("DOMContentLoaded", (_event) => {
  const urlParams = new URLSearchParams(window.location.search),
    botName = urlParams.get("botName") || "Unknown",
    language = urlParams.get("language") || "en",
    botNameDisplay = document.getElementById("botName")
  document.getElementById("popup-content").textContent = getLanguageText(
    "popupContent",
    language
  )
  document.getElementById("confirmReset").textContent = getLanguageText(
    "confirmReset",
    language
  )
  document.getElementById("cancelReset").textContent = getLanguageText(
    "cancelReset",
    language
  )

  function fadeIn() {
    const preloader = document.querySelector(".preloader")
    preloader.classList.add("hidden")
    setTimeout(() => {
      preloader.style.display = "none"
      document.body.classList.remove("hidden")
      document.body.classList.add("fade-in")
    }, 1000)
  }

  setTimeout(fadeIn, 3000)
})
