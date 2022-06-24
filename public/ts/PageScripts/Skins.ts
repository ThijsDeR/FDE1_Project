import UserData from "../UserData.js"

const skins = document.querySelectorAll('.skin')

const userdata = new UserData();
const vp = document.querySelector('span#vp')!;

skins.forEach(async (skin) => {
    const type = skin.getAttribute('type')!;
    const buyBtn = skin.querySelector('button.buy')!
    skin.querySelector('button')!.addEventListener('click', async () => {
        const skin_data = await userdata.buySkin(type, skin.id)
        if (skin_data.status === 200) {
            const playerData = await userdata.getPlayerData()
            vp.innerHTML = playerData.vp
            // worked
            skin.remove()
        }
        else if (skin_data.status === 400) {
            buyBtn.classList.add('error')
            setTimeout(() => {
                buyBtn.classList.remove('error')
            }, 1000)
        }
    })
})