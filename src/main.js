import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(1) > path")
const ccBgColor02 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(2) > path")
const ccLogo = document.querySelector("#app > section > div.cc-logo > span:nth-child(2) > img")

function setCardType(type) {
    const colors = {
        "visa": ["#436D99", "#2D57F2"],
        "mastercard": ["#DF6F29", "#C69347"],
        "default": ["black", "gray"]
    }
    ccBgColor01.setAttribute('fill', colors[type][0])
    ccBgColor02.setAttribute('fill', colors[type][1])
    ccLogo.setAttribute('src', `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
    mask: "0000",
}
const secutityCodeMasked = IMask(securityCode, securityCodePattern)


const dateCardDefault = document.querySelector("#app > section > div.cc-info > div.cc-extra > div.cc-expiration > div.value")
function setMonthCardDefault () {
    const month = new Date().getMonth()
    const year = String(new Date().getFullYear()).slice(2)

    if (String(month).length<2){
        return `0${String(month)}/${year}`
    } else {
        return `${month}/${year}`
    }
}
dateCardDefault.textContent = setMonthCardDefault()


const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear()+10).slice(2)
        }
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "")

        const foundMask = dynamicMasked.compiledMasks.find(function (item) {
            return number.match(item.regex)
        })
        return foundMask
    },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)